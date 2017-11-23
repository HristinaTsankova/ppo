import React from 'react';
import Users from './user';
import Process from './process';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showUsers: false,
      showMashine: false,
      showProcess: false,
      selectedAll: null
    }
    this.showUserTable = this.showUserTable.bind(this);
    this.showMahineTable = this.showMashineTable.bind(this);
    this.showProcessTable = this.showProcessTable.bind(this);
    this.onSelectionAll = this.onSelectionAll.bind(this)
  }

  onSelectionAll(selection) {
    this.setState({
      ...this.state,
      selectedAll: selection.length ? selection[0].id : null
    })
  }
  showUserTable = () => {
    this.setState({
      showUsers: true,
      showMashine: false,
      showProcess: false
    })
  }
  showMashineTable = () => {
    this.setState({
      showMashine: true,
      showProcess: false,
      showUsers: false
    })
  }
  showProcessTable = () => {
    this.setState({
      showProcess: true,
      showMashine: false,
      showUsers: false
    })
  }

  render() {
    const sidebarClass = this.props.isOpen ? 'sidebar more' : 'sidebar';
    return (
      <div className={sidebarClass}>
        <div className="row buttons">
          <div className="col-md-4">
            <button type="button" className="btn mashineBtn" onClick={this.showMashineTable}>Работници</button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-warning process" onClick={this.showProcessTable}>Процеси</button>
          </div>
          <div className="col-md-5">
            <button type="button" className="btn userBtn" onClick={this.showUserTable}>Всички работници</button>
          </div>
        </div>
        <div>
          {this.state.showUsers && <Users filter="BY_NAME" />}
          {this.state.showMashine && <Users filter="BY_DEPARTMENT" />}
          {this.state.showProcess && <Process />}
        </div>
      </div>

    )
  }
}