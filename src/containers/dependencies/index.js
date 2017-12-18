import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortBy } from 'lodash';
import moment from 'moment';
import Parent from './parent';
import AddParent from './addParent';
import { loadOrderById, saveParentsData } from '../../actions/orders';

class Dependencies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      processes: [],
      dependencies: {},
      totalTime: 0
    }
  }

  calculateTotalTime = (order) => {
    let total = 0;
    if (order.order_processes.length > 0) {
      total = Math.round(order.order_processes.map((item) => 60*item.aligned_time ).reduce((a, b) => a + b));
    }
    return total;
  }

  componentWillReceiveProps(props) {
    if (props.order !== undefined) {
      this.setState({
        ...this.state,
        processes: props.order.order_processes,
        dependencies: (props.order.payload !== undefined && props.order.payload.dependencies !== undefined) ? props.order.payload.dependencies : {},
        totalTime: (props.order.payload !== undefined && props.order.payload.time !== undefined) ? props.order.payload.time : 0,
      });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadOrderData(id);
  }

  getProcessById(id) {
    if (!this.props.order) {
      return null;
    }
    return this.props.order.order_processes.filter(process => process.id === id)[0]
  }

  onItemClick = (selected) => {
    const currentlySelected = this.state.selected
    if (currentlySelected && currentlySelected.id === selected.id)
      return
    this.setState({
      ...this.state,
      selected
    })
  }

  makeOnAddParent = (processId) => {
    return selection => {
      const parent = selection[0]

      if (!parent) {
        return;
      }

      const newParents = this.state.dependencies;
      if (newParents[processId] !== undefined) {
        const parentExists = newParents[processId].filter(pr => pr === parent.serial_number).length > 0
        if (parentExists) {
          return;
        }
      }

      if (newParents[processId] === undefined) {
        newParents[processId] = [];
      }

      const newOrder = this.props.order;

      newParents[processId].push(parent.serial_number);
      newOrder.payload.dependencies = newParents;
      newOrder.payload.time = this.calculateTotalTime(newOrder);
      this.props.saveParentsData(newOrder);
    }
  }

  onParentDelete = (id, parentId) => {
    const newParents = this.state.dependencies;
    const newOrder = this.props.order;

    newParents[id] = newParents[id].filter(parent => parent !== parentId);
    newOrder.payload.dependencies = newParents;
    newOrder.payload.time = this.calculateTotalTime(newOrder);
    this.props.saveParentsData(newOrder);
  }

  renderParents(rowData) {
    const parents = this.state.dependencies[rowData.id] || [];
    return parents.map((parent, i) => (
      <Parent key={rowData.id + '.' + i} parent={parent} onDelete={() => this.onParentDelete(rowData.id, parent)} />
    ));
  }

  renderStart(rowData) {
    const flag = rowData.flagged;

    if (flag === "start") {
      return <span className="glyphicon glyphicon-log-in text-success"></span>
    } else if (flag === "end") {
      return <span className="glyphicon glyphicon-log-out text-danger"></span>
    }

    return null;
  }

  renderConnectingIcon(rowData, i) {
    const { selected, dependencies } = this.state;

    if (selected != null) {
      if (selected.id === rowData.id) {
        return <span className="glyphicon glyphicon-record text-primary"></span>
      }

      if (dependencies[selected.id] !== undefined) {
        const iAmParent = dependencies[selected.id].find((row) => { return row === rowData.serial_number });
        if (iAmParent !== undefined) {
          return <span className="glyphicon glyphicon-open text-warning"></span>
        }
      }
      if (dependencies[rowData.id] !== undefined) {
        const iAmChild = dependencies[rowData.id].find((row) => { return row === selected.serial_number })
        if (iAmChild !== undefined) {
          return <span className="glyphicon glyphicon-save text-primary"></span>
        }
      }
    }

    return null;
  }

  renderRow = (rowData, i) => {
    const process = sortBy(this.props.order.order_processes, 'serial_number')
    const active = this.state.selected && this.state.selected.id === rowData.id
    const className = active ? 'active' : '';
    return (
      <tr className={className} key={i} onClick={() => this.onItemClick(rowData)}>
        <td className="no-border">{this.renderStart(rowData)}</td>
        <td className="no-border">{this.renderConnectingIcon(rowData, i)}</td>
        <td className="tech">{rowData.serial_number}</td>
        <td className="tech">{rowData.name}</td>
        <td className="tech time">{rowData.aligned_time}</td>
        <td className="view_dep">
          {
            active
            &&
            <AddParent
              options={process}
              onAdd={this.makeOnAddParent(rowData.id)}
              labelKey={option => `${option.serial_number} ${option.name}`}/>
          }

        </td>
        <td className="parentTD">
          {this.renderParents(rowData)}
        </td>
        <td className="tech2"></td>
        <td className="tech3"></td>
        <td className="size-180 no-border">{active && this.renderDepartmenLinks(rowData.id)}</td>
      </tr>
    )
  }

  renderDepartmenLinks(process, showName = false) {
    const { id } = this.props.match.params;
    let query = "?order=" + id;
    query += (process !== null) ? "&process=" + process : '';
    let links = this.props.order.departments.map((depatment, i) => {
      return (<span key={process + '.' + depatment.id}><Link to={"/departments/" + depatment.id + "/plan" + query} title={depatment.name} className={"btn btn-link showPlan color-" + i.toString()}><span className="glyphicon glyphicon-th"></span>{showName && ' ' + depatment.name}</Link>{showName && <br />}</span>)
    });
    return links;
  }

  render() {
    if (!this.props.order) {
      return (<div className="panel-body"><div className="loader"></div></div>)
    }

    const processes = sortBy(this.state.processes, 'serial_number');
    const rows = processes.map(this.renderRow)

    return (
      <div className="panel-body">
        <div className="row"><h2 className="title">Последователност на процеси</h2></div>
        <div className="row">
          <div className="col-md-2 margin-top-40">
            <div className="well">
              <b>Модел</b><br />
              {this.props.order.name} / {this.props.order.workflow_state}
              <br /><br />
              <b>Поръчка №</b><br />
              {this.props.order.identification_number}
              <br /><br />
              <b>Бройки</b><br />
              000000
              <br /><br />
              <b>Бригади</b><br />
              {this.renderDepartmenLinks(null, true)}
              <br /><br />
            </div>
          </div>
          <div className="col-md-10">
            <table className="table">
              <thead>
                <tr>
                  <th className="size-30"></th>
                  <th className="size-30"></th>
                  <th>№</th>
                  <th>Процес</th>
                  <th >Н.вр.</th>
                  <th colSpan="2">Зависи от:</th>
                  <th>Натрупване</th>
                  <th>Буфер</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="4" className="text-right">Общо Н.вр.</th>
                  <th colSpan="5" className="text-left">{moment.utc(this.state.totalTime*1000).format('HH:mm:ss')} / {Math.round(this.state.totalTime/60*100)/100} мин.</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  if (state.orders.order === undefined || state.orders.order.order_processes === undefined) {
    return {};
  }
  return {
    order: state.orders.order
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadOrderData: (id) => dispatch(loadOrderById(id)),
    saveParentsData: (data) => dispatch(saveParentsData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dependencies);