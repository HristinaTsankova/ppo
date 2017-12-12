import React from 'react';
import { connect } from 'react-redux';
import { showDialog } from '../../../actions/dialog';
import { saveFloorData } from '../../../actions/floor';
import { setQueryValue, QUERY_PROCESS } from '../../../actions/query';

class Process extends React.Component {
  askToRemoveProcess = () => {
    this.props.showDialog('Изтриване на процеса', `Желаете ли да изтриете избрания процес?`, this.removeProcess)
  }

  removeProcess = () => {
    const floor = this.props.floor.payload.data;
    const newList = floor[this.props.row][this.props.col][this.props.index].processes.filter((el, i) => i !== this.props.idx);
    floor[this.props.row][this.props.col][this.props.index].processes = newList;
    this.props.saveFloorData(floor);
  }
  
  onMouseUp = (id) => {
    this.props.selectProcess(id)
  }

  renderConnectingIcon = (rowData) => {
    const { selectedProcess, order } = this.props;
    if (order === undefined || order.payload === undefined || order.payload.dependencies === undefined) {
      return null;
    }
    if (selectedProcess != null) {
      const dependencies = order.payload.dependencies;
      const selected = order.order_processes.find((row) => row.id === selectedProcess);
      if (selected === undefined) {
        return null;
      }

      if (selected.id === rowData.id) {
        return <div className="selected-process"><span className="glyphicon glyphicon-asterisk text-primary"></span></div>
      }

      if (dependencies[selected.id] !== undefined) {
        const iAmParent = dependencies[selected.id].find((row) => { return row === rowData.serial_number });
        if (iAmParent !== undefined) {
          return <div className="selected-process"><span className="glyphicon glyphicon-circle-arrow-left text-warning"></span></div>
        }
      }
      if (dependencies[rowData.id] !== undefined) {
        const iAmChild = dependencies[rowData.id].find((row) => { return row === selected.serial_number })
        if (iAmChild !== undefined) {
          return <div className="selected-process"><span className="glyphicon glyphicon-circle-arrow-right text-primary"></span></div>
        }
      }
    }

    return null;
  }

  render() {
    if (this.props.process === undefined) {
      return null;
    }
    
    return (
      <tr onMouseUp={() => this.onMouseUp(this.props.process.id)}>
        <td className="floor_plan">
          { this.renderConnectingIcon(this.props.process) }
          <div className="cell-user-name" title={this.props.process.name}>{this.props.process.name}</div>
        </td>
        <td className="floor_plan num">{this.props.process.machine_type.name}</td>
        <td className="floor_plan num">{this.props.floor.payload.calculatedLoadPerDay}</td>
        <td className="floor_plan num"></td>
        <td className="floor_plan num">
          {this.props.editable ? <div className="floor-process-actions"><a className="text-danger" title="Изтриване на процеса" onClick={this.askToRemoveProcess}><span className="glyphicon glyphicon-remove" /></a></div> : ""}
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  floor: state.floor.floor,
  selectedProcess: state.query.process,
  editable: state.query.editable,
  order:  (state.orders.order !== undefined) ? state.orders.order : null
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    showDialog: (title, question, callback) => dispatch(showDialog(title, question, callback)),
    saveFloorData: (data) => dispatch(saveFloorData(data)),
    selectProcess: (id) => dispatch(setQueryValue(id, QUERY_PROCESS))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Process);
