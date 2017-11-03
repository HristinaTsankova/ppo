import React from 'react';
import Constants from '../../utils/constants';
import {sortBy} from 'lodash';

export default class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: []
        }
    }
    fetchUsers() {
        const request = {
          method: 'GET',
          headers: Constants.headers
        };
        fetch(`${Constants.remoteServer}/api/fp/departments/${12}`, request).then((response) => {
          return response.json()
        }).then((json) => {
          this.setState({departments: json})
                    
        });
      }
    
      componentDidMount() {
        this.fetchUsers();
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

        const processes = sortBy(this.state.departments.users, 'serial_number')
        
        const rows = processes.map(this.renderRow)
        
          return(
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

