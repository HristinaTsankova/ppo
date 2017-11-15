import React from 'react';
import { sortBy } from 'lodash';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: ''
    }
  }
  fetchOrders() {
    const request = {
      method: 'GET',
      headers: ({ 'Accept': 'application/vnd.elitex-v1+json', 'Content-Type': 'application/json', 'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ" })
    };
    fetch(`http://178.62.112.203/api/fp/orders`, request).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({ orders: json })

    });
  }
  componentDidMount() {
    this.fetchOrders();
  }

  renderRow(rowData, i) {
    return (
      <option key={i} value={rowData.id}>{rowData.name}</option>
    )
  }
  render() {
    const orders = sortBy(this.state.orders, 'id')
    const rows = orders.map(this.renderRow)
    return (
      <select className="selectpicker">
        <option>Избери модел</option>
        {rows}
      </select>
    )
  }
}