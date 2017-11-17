import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class Cutting extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
        departments:'',
    }
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
            <td className="attention">За кроене</td>
          </tr>
          <tr>
            <td className="modelName"></td>
            <td className="orders"></td>
            <td className="cut"></td>
            <td ><input type="checkbox" name="vehicle" value="true" className="form-control prosh"/></td>
            <td className="grafic"></td>
            <td className="min"></td>
            <td className="stock"></td>
            <td className="attention"></td>
          </tr>
        </tbody>
      </table>
    )
  }
  render() {

    if (this.props.departments === undefined || this.props.departments.length === undefined) {
      return null;
    }
    const rows = this.props.departments.map(this.renderRow)
    return(
      <div>
        <div className="container-fluid">
          <h2 className="title2">План Кроялно</h2>
          <div className="row">
            {rows}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    departments: state.departments.list
    

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cutting));
