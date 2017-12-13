import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Droppable } from 'react-drag-and-drop';
import { showDialog } from '../../../actions/dialog';
import { saveFloorData } from '../../../actions/floor';
import { setQueryValue, QUERY_USER } from '../../../actions/query';
import Process from './process';

class MachineTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earnings: []
    }
  }

  onDrop = (data) => {
    const floor = this.props.floor.payload.data;
    const seachFor = parseInt(data.process, 10);
    const processes = this.props.orders.order.order_processes.find(u => u.id === seachFor);
    if (floor[this.props.row][this.props.col][this.props.index].processes.length > 0) {
      if (floor[this.props.row][this.props.col][this.props.index].processes[0].machine_type.id !== processes.machine_type.id) {
        return;
      }
      const found = floor[this.props.row][this.props.col][this.props.index].processes.find(u => u.id === seachFor);
      if (found !== undefined) {
        return;
      }
    }

    processes.order = this.props.editOrder;
    floor[this.props.row][this.props.col][this.props.index].processes.push(processes);
    this.props.saveFloorData(floor);
  }

  askToRemoveUser = () => {
    const seachFor = parseInt(this.props.spot.user, 10);
    const user = this.props.users.find(u => u.id === seachFor);
    this.props.showDialog('Изтриване на работника', `Желаете ли да изтриете избрания работник (${user.name}) от това работно място?`, this.removeUser)
  }

  removeUser = () => {
    const floor = this.props.floor.payload.data;
    const newUsersList = floor[this.props.row][this.props.col].filter((el, i) => i !== this.props.index);
    floor[this.props.row][this.props.col] = newUsersList;
    this.props.saveFloorData(floor);
  }

  onMouseUp = (user) => {
    this.props.selectUser(user)
  }

  findMyEarningForDate = (start, end, user) => {
    const _start = start.format("X");
    const _end = end.format("X");
    const earnings = this.state.earnings.filter((o) =>
      o.user_id === user &&
      o.earning_started_at >= _start && o.earning_started_at <= _end);
    return earnings.length;
  }

  componentWillReceiveProps(props) {
    if (this.props.spot.processes[0] !== undefined) {
      let earnings = [];

      if (props.earnings !== undefined) {
        const order = props.earnings.find((o) => o.order_id === this.props.spot.processes[0].order);
        for (const key in order.users_earnings) {
          const element = order.users_earnings[key];
          earnings = earnings.concat(element.earnings);
        }
      }
      this.setState({ earnings: earnings });

    }
  }

  render() {
    if (this.props.users === undefined && this.props.users.length !== undefined) {
      return null;
    }

    const seachFor = parseInt(this.props.spot.user, 10);
    const user = this.props.users.find(u => u.id === seachFor);
    const jesterday = this.findMyEarningForDate(moment().add(-1, 'day').startOf('day'), moment().add(-1, 'day').endOf('day'), seachFor);
    const style = (this.props.user === user.id) ? 'selected-user' : '';

    return (
      <Droppable types={['process']} onDrop={this.onDrop}>
        <div className={"margin-top-10 " + style} onMouseUp={() => this.onMouseUp(user.id)}>
          <table className="table">
            <tbody>
              <tr>
                <td className="floor_plan2">
                  <div className="cell-user-name" title={user.name}>
                    {this.props.editable ? <div className="floor-person-actions"><a className="text-danger" title="Изтриване на работника" onClick={this.askToRemoveUser}><span className="glyphicon glyphicon-remove" /></a></div> : ""}
                    {user.name}
                  </div>
                </td>

                <td className="floor_plan2">{Math.round(jesterday/this.props.floor.payload.loadPerDay*100)}%</td>
                <td className="floor_icon"><span className="glyphicon glyphicon-signal" /></td>
                <td className="floor_icon2"><span className="glyphicon glyphicon-ok" /></td>
                <td className="floor_icon"><span className="glyphicon glyphicon-menu-hamburger" /></td>
                <td className="floor_icon"></td>
              </tr>

              {this.props.spot.processes.map((process, idx) => {
                return (<Process key={idx + process.id.toString()} user={this.props.spot.user} row={this.props.row} col={this.props.col} index={this.props.index} process={process} idx={idx} />)
              })}

            </tbody>
          </table>
        </div>
      </Droppable>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users.data,
  orders: state.orders,
  editOrder: state.query.order,
  floor: state.floor.floor,
  user: state.query.user,
  editable: state.query.editable,
  earnings: state.earnings.data
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    showDialog: (title, question, callback) => dispatch(showDialog(title, question, callback)),
    saveFloorData: (data) => dispatch(saveFloorData(data)),
    selectUser: (id) => dispatch(setQueryValue(id, QUERY_USER))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineTable);
