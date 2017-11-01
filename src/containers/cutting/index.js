import React from 'react';
import Header from '../header';
import {sortBy} from 'lodash';

export default class Cutting extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
        users: [],
    }
}
fetchUsers() {
    const request = {
      method: 'GET',
      headers: ({'Accept': 'application/vnd.elitex-v1+json', 'Content-Type': 'application/json', 'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ"})
    };
    fetch(`http://178.62.112.203/api/fp/departments`, request).then((response) => {
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
      <table className="table cutting_table" key={i}>
        <thead>
          <tr>
            <th className="name">{rowData.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="modelName">Модел</td>
            <td className="orders">Поръчка бройки</td>
            <td className="cut">Скроени бройки</td>
            <td className="ok">Ок, кроене след прошиване</td>
            <td className="grafic">Дневен график</td>
            <td className="min">Минимален буфер</td>
            <td className="stock">Наличен буфер</td>
            <td className="danger">За кроене</td>
          </tr>
        </tbody>
      </table>
    )
  }
  render() {

    const processes = sortBy(this.state.users, 'department_name')
    const rows = processes.map(this.renderRow)

    return(
      <div>
        <Header/>
        <div className="container-fluid">
          <h2 className="title">План Кроялно</h2>
          <div className="row">
            {rows}
          </div>
        </div>
      </div>
    )
  }
}