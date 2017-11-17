import React from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-drag-and-drop';
import { saveFloorData } from '../../../actions/floor';
import MachineTable from '../machine_table';

class Cell extends React.Component {
  onDrop(data) {
    const floor = this.props.floor.payload.data;
    const user = {
      "user": parseInt(data.user, 10),
      "processes": []
    }

    if (floor[this.props.row][this.props.index].length === undefined) {
      floor[this.props.row][this.props.index] = [];
    }

    // only one time a person can be assigned to the machine
    for (const key in floor[this.props.row][this.props.index]) {
      if (floor[this.props.row][this.props.index][key].user === data.user) {
        return;
      }
    }

    floor[this.props.row][this.props.index].push(user);
    this.props.saveFloorData(floor);
  }

  render() {
    let item = this.props.data;
    let machines = <div className="margin-top-10"><span className="glyphicon glyphicon-record" /></div>;
    if (item.length > 0) {
      machines = item.map((machine, idx) => {
        return <MachineTable key={this.props.row + this.props.index.toString() + idx.toString()} spot={machine} editable={this.props.editable} />
      })
    }

    return (
      <Droppable types={['user']} onDrop={this.onDrop.bind(this)}>
        {this.props.row === 0 && this.props.editable ? <div className="floor-delete-column"><a className="text-danger" title="Премахване на колона"><span className="glyphicon glyphicon-remove"/></a></div>:""}
        {this.props.index === 0 && this.props.editable ? <div className="floor-delete-row"><a className="text-danger" title="Премахване на ред"><span className="glyphicon glyphicon-remove"/></a></div>:""}
        <div className="text-muted floor-cell-number">{(this.props.row + 1) + '.' + (this.props.index + 1)}</div>
        {machines}
      </Droppable>
    )
  }
}

const mapStateToProps = (state) => ({
  floor: state.floor.floor,
  editable: state.query.editable
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    saveFloorData: (data) => dispatch(saveFloorData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
