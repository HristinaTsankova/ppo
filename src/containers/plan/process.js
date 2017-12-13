import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { Draggable } from 'react-drag-and-drop';
import { sortBy } from 'lodash';
import { setQueryValue, QUERY_PROCESS } from '../../actions/query';

class Process extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      processes: []
    }
  }

  mapFloorProcesses = () => {
    const floor = this.props.floor.payload.data;
    let processes = [];
    for (const row in floor) {
      for (const col in floor[row]) {
        for (const usr in floor[row][col]) {
          for (const prc in floor[row][col][usr].processes) {
            processes.push(floor[row][col][usr].processes[prc].id);
          }
        }
      }
    }

    this.setState({
      processes: processes
    })
  }

  onMouseUp = (id) => {
    this.props.selectProcess(id)
  }

    

  renderRow = (rowData, i) => {

    let peopleTime = 0;
    if (this.props.floor.loadPerDay !== 0 && rowData.aligned_time !== undefined) {
      peopleTime = parseFloat(((this.props.floor.payload.loadPerDay * rowData.aligned_time ) / 480).toFixed(2));

      console.log(parseFloat(peopleTime.toFixed(2)) );
    }
    
    return (
      <tr key={i} onMouseUp={() => this.onMouseUp(rowData.id)}>
        <td>{this.props.selected !== rowData.id && this.state.processes.includes(rowData.id) ? <span className="glyphicon glyphicon-ok-circle checked" /> : null}</td>
        <td>{this.props.selected === rowData.id ? <span className="glyphicon glyphicon-play recording" /> : rowData.serial_number}</td>
        <td><div className="sidebar-nowrap-process" data-tip={rowData.name}><Draggable type="process" data={rowData.id}>{rowData.name}</Draggable></div></td>
        <td>{rowData.aligned_time}</td>
        <td>{peopleTime}</td>
        <td>{rowData.machine_type.name}</td>
      </tr>
    )
  }

  componentDidMount() {
    this.mapFloorProcesses();
  }

  render() {
    if (this.props.orders.order.order_processes === undefined) {
      return (<div>....</div>);
    }

    const processes = sortBy(this.props.orders.order.order_processes, 'serial_number');
    const rows = processes.map(this.renderRow);

    return (
      <div>
        <table className="table table-striped" >
          <thead>
            <tr>
              <th></th>
              <th>№</th>
              <th>Процес</th>
              <th>Н.вр.</th>
              <th>Бр.раб.</th>
              <th>Машина</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <ReactTooltip type="dark" effect="solid" />
      </div>
    )
  }

}
const mapStateToProps = (state) => ({
  department: state.query.order,
  floor: state.floor.floor,
  selected: state.query.process,
  orders: state.orders
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    selectProcess: (id) => dispatch(setQueryValue(id, QUERY_PROCESS))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Process);