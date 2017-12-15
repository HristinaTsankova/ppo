import React from 'react';
import ReactDOM from 'react-dom';
import Users from './user';
import Process from './process';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showUsers: false,
      showMashine: true,
      showProcess: false,
      selectedAll: null,
      top: 200,
      style: { width: '300px' }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({ top: rect.top });
    this.setState({ style: { width: rect.width + 'px' } });
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = (event) => {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({ top: rect.top });
    this.setState({ style: { width: rect.width + 'px' } });
  };

  onSelectionAll = (selection) => {
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
    return (
      <div>
        <div className={"sidebar-container" + ((this.state.top <= 60) && " sidebar-fixed")} style={this.state.style}>
          <div className="row center">
            <button type="button" className={this.state.showMashine ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showMashineTable}><span className="glyphicon glyphicon-user"></span></button>
            <button type="button" className={this.state.showUsers ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showUserTable}><span className="glyphicon glyphicon-search"></span></button>
            <button type="button" className={this.state.showProcess ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showProcessTable}><span className="glyphicon glyphicon-scissors"></span></button>
          </div>
          <div className="well sidebar-wrapper">
            {this.state.showMashine && <Users filter="BY_DEPARTMENT" />}
            {this.state.showUsers && <Users filter="BY_NAME" />}
            {this.state.showProcess && <Process />}
          </div>
        </div>
      </div>
    )
  }
}