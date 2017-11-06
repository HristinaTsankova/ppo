import React from 'react';
import User from './user';
import Process from './process';
import Constants from '../../utils/constants';

export default class Sidebar extends React.Component{
   
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
    fetchUsers() {
        const request = {
          method: 'GET',
          headers: Constants.headers
        };
        fetch(`${Constants.remoteServer}/api/fp/users`, request).then((response) => {
          return response.json()
        }).then((json) => {
          this.setState({users: json})
        });
    }
    
    componentDidMount() {
        this.fetchUsers();
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
        return(
            <div className="sidebar">
                <div className="row buttons">
                    <div className="col-md-4">
                        <button type="button" className="btn mashineBtn" onClick={this.showMashineTable}>Работници</button>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className="btn btn-warning process" onClick={this.showProcessTable}>Процеси</button>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className="btn userBtn" onClick={this.showUserTable}>Всички работници</button>
                    </div>
                </div>
                <div>
                    { this.state.showUsers && <User filter="BY_NAME" />}
                    { this.state.showMashine && <User filter="BY_DEPARTMENT" /> }
                    { this.state.showProcess && <Process/> }
                </div>
            </div>
            
        )
    }
}