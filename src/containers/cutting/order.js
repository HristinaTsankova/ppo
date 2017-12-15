import React from 'react';
import { connect } from 'react-redux';
import { callEarningsLiveApi } from '../../actions/earnings';
import { loadOrderById } from "../../actions/orders";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null
    }
  }

  loadData = (data) => {
    this.setState({
      order: data[0]
    });
  }

  componentDidMount() {
    callEarningsLiveApi([this.props.data.id], this.loadData);
    this.props.loadOrder(this.props.data.id);
  }

  calcStockLoad = () => {
    let conf = this.props.orders[this.props.data.id];
    let start = conf.order_processes.find(p => p.flagged === 'start');
    let total = 0;
    for (const e in this.state.order.users_earnings) {
      const data = this.state.order.users_earnings[e];
      const sub = data.earnings.map((item) => (item.order_process_id === start.id) ? item.totla_pieces : 0).reduce((a, b) => a + b);
      total += sub;
    }
    return this.state.order.order_info.articles_number_from_batches - total;
  }

  calcInTheWild = () => {
    let final = 0;
    const start = this.props.orders[this.props.data.id].order_processes.find((o) => o.flagged === 'start');
    if (this.state.order.users_earnings.length > 0) {
      for (const user of this.state.order.users_earnings) {
        final += user.earnings.filter((o) => o.order_process_id === start.id).length;
      }
    }
    return final;
  }

  render() {
    if (this.state.order === null || this.props.orders[this.props.data.id] === undefined) {
      return null;
    }

    const loadPerDay = (this.props.floor.payload.loadPerDay !== undefined) ? parseInt(this.props.floor.payload.loadPerDay, 10) : undefined;
    const stockLoad = this.calcStockLoad();
    const inTheWild = this.calcInTheWild();

    return (
      <tr>
        <td className="modelName"><div>{this.props.data.name}</div></td>
        <td className="orders">{this.state.order.order_info.articles_number}</td>
        <td className="cut">{this.state.order.order_info.articles_number_from_batches}</td>
        <td className="orders">{inTheWild}</td>
        <td ><input type="checkbox" name="vehicle" value="true" className="form-control prosh" /></td>
        <td className="grafic">{(loadPerDay === undefined) ? 'n/a' : loadPerDay}</td>
        <td className="min">{(loadPerDay === undefined) ? 'n/a' : loadPerDay * 2}</td>
        <td className="stock">{stockLoad}</td>
        <td className="attention">{(loadPerDay === undefined) ? 'n/a' : stockLoad - loadPerDay * 2}</td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.cache,
    order: state.orders.order
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadOrder: (id) => dispatch(loadOrderById(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);