import React from 'react';
import Cell from './cell';

export default class Row extends React.Component {
  render() {
    if (this.props.data === null) {
      return (<div className="panel-body"><div className="loader"></div></div>)
    }
    return (
      <tr>
        {this.props.data.map((item, index) => {
          return (
            <td key={this.props.index + index.toString()} className="floor-cell">
              <Cell row={this.props.index} index={index} data={item} editable={this.props.editable} />
            </td>
          )
        })}

      </tr>
    )
  }
}
