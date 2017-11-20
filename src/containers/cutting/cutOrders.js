import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class CutOrders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: ''
        }
    }


    renderRow(rowData, i) {
        return(

            
              <div  key={i}>{rowData.name}</div>
              
            
        )
    }

    render() {
        if (this.props.orders === undefined || this.props.orders.length === undefined) {
            return null;
        }
        const rows = this.props.orders.map(this.renderRow)
        return(
            <tr>
                <td className="modelName">{rows}</td>
                <td className="orders"></td>
                <td className="cut"></td>
                <td ><input type="checkbox" name="vehicle" value="true" className="form-control prosh"/></td>
                <td className="grafic"></td>
                <td className="min"></td>
                <td className="stock"></td>
                <td className="attention"></td>
            </tr>
            
        )
    }
}
const mapStateToProps = (state) => ({
    orders: state.orders.list,
    order: state.query.order
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch
    };
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CutOrders));