import React from 'react';
import { connect } from 'react-redux';


class Process extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            processes: ''
        }
    }


    renderRow(rowData, i) {
        return (
          <tr key={i}>
              <td>{rowData.serial_number}</td>
              <td>{rowData.name}</td>
              <td>{rowData.aligned_time}</td>
          </tr>
        )
    }

    render(){
        if (this.props.orders.order.order_processes === undefined) {
            return (<div>....</div>);
        }

        const rows = this.props.orders.order.order_processes.map(this.renderRow)
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
const mapStateToProps = (state) => ({
    department: state.query.order,
    orders: state.orders
    
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Process);