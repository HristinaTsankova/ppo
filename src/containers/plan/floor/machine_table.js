import React from 'react';
import { connect } from 'react-redux';
import { showDialog } from '../../../actions/dialog';
import { saveFloorData } from '../../../actions/floor';

class MachineTable extends React.Component {
  renderProcess(process, idx) {
    return (
      <tr key={idx + process.toString()}>
        <td className="floor_plan">{process}</td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
      </tr>
    )
  }

  askToRemoveUser = () => {
    const seachFor = parseInt(this.props.spot.user, 10);
    const user = this.props.users.find(u => u.id === seachFor);
    this.props.showDialog('Изтриване на работника', `Желаете ли да изтриете избрания работник (${user.name}) от това работно място?`, this.removeUser)
  }

  removeUser = () => {
    const floor = this.props.floor.payload.data;
    floor[this.props.row][this.props.col].splice(this.props.index, 1);
    this.props.saveFloorData(floor);
  }

  render() {
    const seachFor = parseInt(this.props.spot.user, 10);
    const user = this.props.users.find(u => u.id === seachFor);
    return (
      <div>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users.data,
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
