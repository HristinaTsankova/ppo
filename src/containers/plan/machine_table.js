import React from 'react';
import { connect } from 'react-redux';

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

  render() {
    const seachFor = parseInt(this.props.spot.user, 10);
    const user = this.props.users.find(u => u.id === seachFor);
    return (
      <div className="margin-top-10">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="floor_plan2"><div className="cell-user-name" title={user.name}>{user.name}</div></td>
              <td className="floor_plan2"></td>
            </tr>
            {this.props.spot.processes.map((process, idx) => {
              return this.renderProcess(process, idx)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users.data
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineTable);
