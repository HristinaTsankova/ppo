import React from 'react';
import Mashine from './mashine';
import Process from './process';
import Constants from '../app/constants';
import { Draggable } from 'react-drag-and-drop';
import {Typeahead} from 'react-bootstrap-typeahead';

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
      renderRow(rowData, i) {
        return (
          <tr key={i}>
            <td className="colm"><Draggable type="user" data="users">{rowData.name}</Draggable></td>
            <td>{rowData.department_id}</td>
          </tr>
        )
      }
      onSelectionAll(selection) {
        this.setState({
          ...this.state,
          selectedAll: selection.length ? selection.id : null
        })
    }
      showUserTable = () => {
        const {showUsers} =this.state
        this.setState({
            showUsers: !showUsers
        })
    }
    showMashineTable = () => {
        const {showMashine} =this.state
        this.setState({
            showMashine: !showMashine
        })
    }
    showProcessTable = () => {
        const {showProcess} =this.state
        this.setState({
            showProcess: !showProcess
        })
    }

    render() {


        return(
            <div className="sidebar">
                <div className="row buttons">
                    <div className="col-md-4">
                        <button type="button" className="btn mashineBtn" onClick={this.showMashineTable}>Машини</button>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className="btn btn-warning process" onClick={this.showProcessTable}>Процеси</button>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className="btn userBtn" onClick={this.showUserTable}>Всички работници</button>
                    </div>
                </div>
                {this.state.showUsers &&
                <div>
                    <div className="row searching">
                        <Typeahead
                            options={this.state.users}
                            onChange={this.onSelectionAll}
                            labelKey="name" />
                    </div>
                </div>}
                <div>
                    {this.state.showMashine &&
                    <div>
                        <Mashine/>
                    </div>}
                </div>
                <div>
                    {this.state.showProcess &&
                    <div>
                        <Process/>
                    </div>}
                </div>
            </div>
            
        )
    }
}