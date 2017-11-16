import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import {Draggable} from 'react-drag-and-drop';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: ''
    }
  }

  getVisibleUsers = () => {
    if (this.props.filter === "BY_NAME") {
      if (this.state.searchUser.trim() === '') {
        return [];
      } else {
        return this.props.users.filter(t => t.name.toLowerCase().includes(this.state.searchUser.toLowerCase()));
      }
    } else {
      return this.props.users.filter(t => t.department_id === parseInt(this.props.department, 10));
    }
  }

  renderRow(rowData, i) {
    return (
      <tr key={i}>
        <td className="colm"><Draggable type="plan" data={rowData.id}>{rowData.name}</Draggable></td>
        <td>{rowData.department_id}</td>
      </tr>
    )
  }

  render() {
    const users = sortBy(this.getVisibleUsers(), 'name')
    const rows = users.map(this.renderRow)

    return (
      <div>
        {(this.props.filter === "BY_NAME") && <input onChange={e => this.setState({searchUser: e.target.value})} value={this.state.searchUser} name="searchUser" className="form-control searching" placeholder="Име на работника" />}
        <table className="table">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  department: state.query.department,
  users: state.users.data
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);