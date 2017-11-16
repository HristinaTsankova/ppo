import React from 'react';
import { connect } from 'react-redux';
import {Draggable} from 'react-drag-and-drop';

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
              <td><Draggable type="plan" data={rowData.serial_number}>{rowData.name}</Draggable></td>
              <td>{rowData.aligned_time}</td>
              <td></td>
              <td>{rowData.machine_type.name}</td>
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
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Процес</th>
                        <th>Н.вр.</th>
                        <th>Брой работници</th>
                        <th>Машина</th>
                    </tr>
                </thead>
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