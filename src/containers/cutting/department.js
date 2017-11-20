import React from 'react';
import { callDepartmentsApi } from '../../actions/departments';
import Order from './order';

export default class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: null
    }
  }

  renderRow(rowData, i) {
    if (rowData.workflow_state !== "in_progress") {
      return null;
    }
    return (
        <Order data={rowData} key={i} />
    )
  }

  loadDepartmentData = (data) => {
    this.setState({
      department: data
    });
  }

  componentDidMount() {
    callDepartmentsApi(this.props.data.id, this.loadDepartmentData);
  }

  render() {
    let orders = null;
    if (this.state.department !== null && this.state.department.orders.length !== undefined) {
      orders = this.state.department.orders.map(this.renderRow);
    }

    return (
      <table className="table cutting_table">
        <thead>
          <tr>
            <th className="name">{this.props.data.name}</th>
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
            <td className="attention">За кроене</td>
          </tr>
          {orders}
        </tbody>
      </table>
    )
  }
}
