import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import { Draggable } from 'react-drag-and-drop';
import { setQueryValue, QUERY_USER } from '../../actions/query';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: '',
      users: []
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
      return this.props.users.filter(t => {
        return t.department_id === parseInt(this.props.department, 10) || this.state.users.includes(t.id)
      });
    }
  }

  mapFloorUsers = () => {
    const floor = this.props.floor.payload.data;
    let users = [];
    for (const row in floor) {
      for (const col in floor[row]) {
        for (const usr in floor[row][col]) {
          users.push(floor[row][col][usr].user);
        }
      }
    }
    this.setState({
      users: users
    })
  }

  onMouseUp = (user) => {
    this.props.selectUser(user)
  }

  renderRow = (rowData, i) => {
    let dept = parseInt(this.props.department, 10);
    return (
      <tr key={i} onMouseUp={() => this.onMouseUp(rowData.id)} className={dept !== rowData.department_id ? "text-info" : ""}>
        <td className="size-30">
          {this.props.user === rowData.id ? <span className="glyphicon glyphicon-play" /> : null}
          {this.props.user !== rowData.id && this.state.users.includes(rowData.id) ? <span className="glyphicon glyphicon-ok-circle" /> : null}
        </td>
        <td><Draggable type="user" data={rowData.id}>{rowData.id} {rowData.name}</Draggable></td>
        <td className="colm">{rowData.department_id}</td>
      </tr>
    )
  }

  componentDidMount() {
    this.mapFloorUsers();
  }

  render() {
    const users = sortBy(this.getVisibleUsers(), 'name')
    const rows = users.map(this.renderRow)
    return (
      <div>
        {(this.props.filter === "BY_NAME") && <input onChange={e => this.setState({ searchUser: e.target.value })} value={this.state.searchUser} name="searchUser" className="form-control searching" placeholder="Име на работника" />}
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="head">Работник</th>
              <th>Цех</th>
            </tr>
          </thead>
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
  floor: state.floor.floor,
  user: state.query.user,
  users: state.users.data
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    selectUser: (id) => dispatch(setQueryValue(id, QUERY_USER))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);