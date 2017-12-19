import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { showDialog } from '../../../actions/dialog';
import { saveFloorData } from '../../../actions/floor';
import { setQueryValue, QUERY_PROCESS } from '../../../actions/query';

class Process extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earnings: [],
      orderInfo: {
        articles_number: 0,
        articles_number_from_batches: 0
      }
    }
  }

  askToRemoveProcess = () => {
    this.props.showDialog('Изтриване на процеса', `Желаете ли да изтриете избрания процес?`, this.removeProcess)
  }

  removeProcess = () => {
    const floor = this.props.floor.payload.data;
    const newList = floor[this.props.row][this.props.col][this.props.index].processes.filter((el, i) => i !== this.props.idx);
    floor[this.props.row][this.props.col][this.props.index].processes = newList;
    this.props.saveFloorData(floor);
  }

  onMouseUp = (id) => {
    this.props.selectProcess(id)
  }

  renderConnectingIcon = (rowData) => {
    const { selectedProcess, order } = this.props;
    if (order === undefined || order.payload === undefined || order.payload.dependencies === undefined) {
      return null;
    }
    if (selectedProcess != null) {
      const dependencies = order.payload.dependencies;
      const selected = order.order_processes.find((row) => row.id === selectedProcess);
      if (selected === undefined) {
        return null;
      }

      if (selected.id === rowData.id) {
        return <div className="selected-process"><span className="glyphicon glyphicon-asterisk text-primary"></span></div>
      }

      if (dependencies[selected.id] !== undefined) {
        const iAmParent = dependencies[selected.id].find((row) => { return row === rowData.serial_number });
        if (iAmParent !== undefined) {
          return <div className="selected-process"><span className="glyphicon glyphicon-circle-arrow-left text-warning"></span></div>
        }
      }
      if (dependencies[rowData.id] !== undefined) {
        const iAmChild = dependencies[rowData.id].find((row) => { return row === selected.serial_number })
        if (iAmChild !== undefined) {
          return <div className="selected-process"><span className="glyphicon glyphicon-circle-arrow-right text-primary"></span></div>
        }
      }
    }

    return null;
  }

  findMyEarningForDate = (start, end) => {
    const _start = start.format("X");
    const _end = end.format("X");
    const earnings = this.state.earnings.filter((o) =>
      o.order_process_id === this.props.process.id && o.user_id === this.props.user &&
      o.earning_started_at >= _start && o.earning_started_at <= _end).reduce((total, o) => total + parseInt(o.totla_pieces, 10), 0);
    return earnings;
  }

  findMyEarnings = () => {
    const earnings = this.state.earnings.filter((o) => o.order_process_id === this.props.process.id && o.user_id === this.props.user).reduce((total, o) => total + parseInt(o.totla_pieces, 10), 0);
    return earnings;
  }

  findInComing = () => {
    let incoming = 0;

    if (this.props.process.flagged === "start") {
      incoming = this.state.orderInfo.articles_number_from_batches;
    } else {
      let order = this.props.orders[this.props.process.order];
      if (order !== undefined) {
        const dependencies = order.payload.dependencies[this.props.process.id];
        for (const serialNumber of dependencies) {
          const process = order.order_processes.find((o) => o.serial_number === serialNumber);
          const earnings = this.state.earnings.filter((o) => o.order_process_id === process.id).reduce((total, o) => total + parseInt(o.totla_pieces, 10), 0);
          incoming += earnings;
        }
      }
    }

    return incoming;
  }

  componentWillReceiveProps(props) {
    let earnings = [];
    let orderInfo = this.state.orderInfo;

    if (props.earnings !== undefined) {
      const order = props.earnings.find((o) => o.order_id === this.props.process.order);
      if (order !== undefined) {
        if (order.order_info !== undefined) {
          orderInfo = order.order_info;
        }
        for (const key in order.users_earnings) {
          const element = order.users_earnings[key];
          earnings = earnings.concat(element.earnings);
        }
      }
    }

    this.setState({ earnings: earnings });
    this.setState({ orderInfo: orderInfo });
  }

  render() {
    if (this.props.process === undefined) {
      return null;
    }

    const today = this.findMyEarningForDate(moment().startOf('day'), moment().endOf('day'));
    const earnings = this.findMyEarnings();
    const incoming = this.findInComing()
    const buffer = incoming - earnings;
    const alarm = ((buffer <= 20) ? " bg-red" : (buffer >= 30) ? " bg-blue" : false);
    const procClass = (this.props.process.order !== this.props.queryOrder) ? 'other-order' : '';

    return (
      <tr className={procClass} onMouseUp={() => this.onMouseUp(this.props.process.id)}>
        <td className="floor_plan num">
          {this.renderConnectingIcon(this.props.process)}
          {this.props.process.serial_number}</td>
        <td className="floor_plan" colSpan="2"><div className="cell-user-name" title={this.props.process.name}>{this.props.process.name}</div></td>
        <td className="floor_plan num">{this.props.floor.payload.loadPerDay}</td>
        <td className="floor_plan num">{today}</td>
        <td className={'floor_plan num' + alarm}>{buffer}</td>
        <td className="no-boder">
          {alarm && <span className="glyphicon glyphicon-bell text-danger"></span>}
          {this.props.editable ? <div className="floor-process-actions"><a className="text-danger" title="Изтриване на процеса" onClick={this.askToRemoveProcess}><span className="glyphicon glyphicon-remove" /></a></div> : ""}
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  // order: (state.orders.order !== undefined) ? state.orders.order : null,
  queryOrder: parseInt(state.query.order, 10),
  floor: state.floor.floor,
  selectedProcess: state.query.process,
  editable: state.query.editable,
  earnings: state.earnings.data,
  orders: state.orders.cache
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    showDialog: (title, question, callback) => dispatch(showDialog(title, question, callback)),
    saveFloorData: (data) => dispatch(saveFloorData(data)),
    selectProcess: (id) => dispatch(setQueryValue(id, QUERY_PROCESS))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Process);
