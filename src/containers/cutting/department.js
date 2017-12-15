import React from 'react';
import { connect } from 'react-redux';
import { callDepartmentsApi } from '../../actions/departments';
import { loadAllFloors } from '../../actions/floor';
import Order from './order';

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: null,
      floorData: null
    }
  }

  renderRow(rowData, i, floor) {
    if (rowData.workflow_state !== "in_progress") {
      return null;
    }
    
    return (
      <Order floor={floor} data={rowData} key={i} />
    )
  }

  loadDepartmentData = (data) => {
    this.setState({
      department: data
    });
  }

  loadFloorData = (data) => {
    this.setState({
      floorData: data
    });
  }

  componentDidMount() {
    callDepartmentsApi(this.props.data.id, this.loadDepartmentData);
    this.props.loadAllFloors(this.props.data.id, this.loadFloorData);
  }

  render() {
    let orders = null;
    if (this.state.department !== null && this.state.department.orders.length !== undefined && this.state.floorData !== null) {
      orders = this.state.department.orders.map((row, i) => this.renderRow(row, i, this.state.floorData));
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
            <td className="orders">Пуснати бройки</td>
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

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadAllFloors: (id, callback) => dispatch(loadAllFloors(id, callback))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Department);