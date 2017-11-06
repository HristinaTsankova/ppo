import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderRow(rowData, i) {
    return (
      <tr key={i}>
        <td className="colm">{rowData.name}</td>
        <td>{rowData.department_id}</td>
      </tr>
    )
  }

  render() {
    const users = sortBy(this.props.users, 'name')
    const rows = users.map(this.renderRow)

    return (
      <div>
        <table className="table">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

const getVisibleUsers = (users, filter) => {
  return users.filter(t => t.department_id === parseInt(filter, 10));
}

const mapStateToProps = (state) => ({
  users: getVisibleUsers(state.users.data, state.departments.selectedDepartment)
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);