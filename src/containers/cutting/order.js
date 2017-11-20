import React from 'react';

export default class Order extends React.Component {
  render() {
    return (
      <tr>
        <td className="modelName"><div>{this.props.data.name}</div></td>
        <td className="orders"></td>
        <td className="cut"></td>
        <td ><input type="checkbox" name="vehicle" value="true" className="form-control prosh" /></td>
        <td className="grafic"></td>
        <td className="min"></td>
        <td className="stock"></td>
        <td className="attention"></td>
      </tr>

    )
  }
}
