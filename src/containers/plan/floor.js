import React from 'react';
import Constants from '../../utils/constants';
import '../style/debug.css';
import MachineTable from './machine_table'

class Row extends React.Component {
  render () {
    if (this.props.data === null) {
      return null;
    }
    return (
      <tr>
        {this.props.data.map((item, index) => {
          return (
            <td key={this.props.index + index.toString()}>{item.name} <MachineTable/></td>
          )
        })}
        
      </tr>
    )
  }
}

export default class Floor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [[{}]]
    }
  }

  fetchFloorData() {
    const request = {
      method: 'GET',
      headers: Constants.headers
    };
    fetch('/mockups/floor.json', request).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        ...this.state,
        table: json
      })
    });
  }

  componentDidMount() {
    this.fetchFloorData();
  }

  onAddColumn() {
    const table = this.state.table;
    const rows = table.length;

    for (let i = 0; i < rows; i++) {
      table[i].push({});
    }

    this.setState({
      ...this.state,
      table: table
    });
  }

  onAddRow() {
    const table = this.state.table;
    const cols = table[0].length;
    const newRow = [];

    for (let i = 0; i < cols; i++) {
      newRow.push({});
    }

    table.push(newRow);

    this.setState({
      ...this.state,
      table: table
    });
  }

  render() {
    const table = this.state.table;
    
    if (table === null) {
      return null;
    }
//    let cols = (table[0].length > 10) ? 11 : (table[0].length + 1);
//    let cls = "col-md-" + cols;

    return(
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