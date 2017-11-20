import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CutOrders from './cutOrders';

class CutDepartments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: ''
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
                <CutOrders/>
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
              <div>{rows}</div>
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
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CutDepartments));