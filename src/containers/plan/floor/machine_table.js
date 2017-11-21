import React from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-drag-and-drop';
import { showDialog } from '../../../actions/dialog';
import { saveFloorData } from '../../../actions/floor';

class MachineTable extends React.Component {
  renderProcess(process, idx) {
    return (
      <tr key={idx + process.id.toString()}>
        <td className="floor_plan"><div className="cell-user-name" title={process.name}>{process.name}</div></td>
        <td className="floor_plan num"></td>
        <td className="floor_plan num"></td>
        <td className="floor_plan num"></td>
        <td className="floor_plan num"></td>
        <td className="floor_plan num">
          {this.props.editable ? <div className="floor-process-actions"><a className="text-danger" title="Изтриване на процеса" onClick={this.askToRemoveProcess}><span className="glyphicon glyphicon-remove" /></a></div> : ""}
        </td>
      </tr>
    )
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
    floor[this.props.row][this.props.col][this.props.index].processes.push(processes);
    this.props.saveFloorData(floor);
  }

  askToRemoveProcess = () => {
    this.props.showDialog('Изтриване на процеса', `Желаете ли да изтриете избрания процес?`, this.removeProcess)
  }

  removeProcess = () => {
    console.log('====================================');
    console.log('Plese release meee! Freedooom!');
    console.log('====================================');
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

  render() {
    if (this.props.users === undefined && this.props.users.length !== undefined) {
      return null;
    }
    const seachFor = parseInt(this.props.spot.user, 10);
    const user = this.props.users.find(u => u.id === seachFor);
    return (
      <Droppable types={['process']} onDrop={this.onDrop.bind(this)}>
        <div className="margin-top-10">
          <table className="table">
            <thead>
              <tr><td></td></tr>
            </thead>
            <tbody>
              <tr>
                <td className="floor_plan2">
                  <div className="cell-user-name" title={user.name}>
                    {this.props.editable ? <div className="floor-person-actions"><a className="text-danger" title="Изтриване на работника" onClick={this.askToRemoveUser}><span className="glyphicon glyphicon-remove" /></a></div> : ""}
                    {user.name}
                  </div>
                </td>
                <td className="floor_plan2"></td>
              </tr>

              {this.props.spot.processes.map((process, idx) => {
                return this.renderProcess(process, idx)
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
  floor: state.floor.floor,
  editable: state.query.editable
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    showDialog: (title, question, callback) => dispatch(showDialog(title, question, callback)),
    saveFloorData: (data) => dispatch(saveFloorData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineTable);
