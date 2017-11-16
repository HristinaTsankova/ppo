import React from 'react';
import { connect } from 'react-redux';
import Row from './row';
import { loadAllFloors, saveFloorData } from '../../../actions/floor';
import '../../style/debug.css';

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
        <div className="row">
          <div className="col-md-11">
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
          <div className="col-md-1"><button type="button" onClick={() => this.onAddColumn()} className="btn btn-link btn-lg"><i className="glyphicon glyphicon-plus-sign" /></button></div>
        </div>
        <div className="row"><div className="col-md-1"><button type="button" onClick={() => this.onAddRow()} className="btn btn-link btn-lg"><i className="glyphicon glyphicon-plus-sign" /></button></div></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  plans: state.floor.list,
  floor: state.floor.floor
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadAllFloorData: () => dispatch(loadAllFloors()),
    saveFloorData: (data) => dispatch(saveFloorData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Floor);