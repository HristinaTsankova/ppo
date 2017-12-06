import React from 'react';
import { connect } from 'react-redux';
import Row from './row';
import { loadAllFloors, saveFloorData } from '../../../actions/floor';

class Floor extends React.Component {
  componentDidMount() {
    this.props.loadAllFloorData();
  }

  onAddColumn() {
    const table = this.props.floor.payload.data;
    const rows = table.length;

    for (let i = 0; i < rows; i++) {
      table[i].push({});
    }

    this.props.saveFloorData(table);
  }

  onAddRow() {
    const table = this.props.floor.payload.data;
    const cols = table[0].length;
    const newRow = [];

    for (let i = 0; i < cols; i++) {
      newRow.push({});
    }

    table.push(newRow);
    this.props.saveFloorData(table);
  }

  render() {

    if (this.props.floor === undefined) {
      return null;
    }

    const table = this.props.floor.payload.data;

    return (
      <div id="floorPlan">
        {this.props.editable ? <div className="row"><div className="pull-right"><button type="button" onClick={() => this.onAddColumn()} className="btn btn-link btn-lg"><i className="glyphicon glyphicon-plus-sign" /></button></div></div> : "" }
        <div className="row">
            <table className="floor">
              <tbody>
                {table.map((item, index) => {
                  return (
                    <Row key={index} data={item} index={index} />
                  )
                })}
              </tbody>
            </table>
        </div>
        {this.props.editable ? <div className="row"><button type="button" onClick={() => this.onAddRow()} className="btn btn-link btn-lg"><i className="glyphicon glyphicon-plus-sign" /></button></div>: "" }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  plans: state.floor.list,
  floor: state.floor.floor,
  editable: state.query.editable
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadAllFloorData: () => dispatch(loadAllFloors()),
    saveFloorData: (data) => dispatch(saveFloorData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Floor);