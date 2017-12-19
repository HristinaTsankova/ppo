import React from 'react';
import { connect } from 'react-redux';
import { setQueryValue } from '../../actions/query';
import { loadOrderById } from '../../actions/orders';

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earnings: [],
      orderInfo: {
        articles_number: 0,
        articles_number_from_batches: 0
      },
      earningsStart: 0,
      earningsEnd: 0
    }
  }

  componentWillReceiveProps(props) {
    let earnings = [];
    let earningsStart = [];
    let earningsEnd = [];
    let anotherUsers = [];
    let orderInfo = this.state.orderInfo;

    if (props.order === undefined) {
      return;
    }

    if (props.earnings !== undefined) {
      const order = props.earnings.find((o) => o.order_id === props.queryOrder);
      if (order !== undefined) {
        if (order.order_info !== undefined) {
          orderInfo = order.order_info;
        }
        for (const key in order.users_earnings) {
          const element = order.users_earnings[key];
          earnings = earnings.concat(element.earnings);
        }
      }
    }

    if (props.order.order_processes !== undefined) {
      const start = props.order.order_processes.find((o) => o.flagged === 'start');
      const end = props.order.order_processes.find((o) => o.flagged === 'end');
      earningsStart = earnings.filter((o) => o.order_process_id === start.id).reduce((total, o) => total + parseInt(o.totla_pieces, 10), 0);
      earningsEnd = earnings.filter((o) => o.order_process_id === end.id).reduce((total, o) => total + parseInt(o.totla_pieces, 10), 0);
    }

    if (props.floor !== undefined && props.floor.payload !== undefined && props.floor.payload.data !== undefined) {
      let users = []
      for (const row of props.floor.payload.data) {
        for (const cell of row) {
          if (cell.length > 0) {
            for (const worker of cell) {
              users.push(worker.user)
            }
          }
        }
      }
      anotherUsers = props.users.filter((o) => o.department_id !== props.department && users.indexOf(o.id) > -1);
    }

    this.setState({ earnings: earnings });
    this.setState({ orderInfo: orderInfo });
    this.setState({ earningsStart: earningsStart });
    this.setState({ earningsEnd: earningsEnd });
    this.setState({ anotherUsers: anotherUsers.length });
  }


  render() {
    if (this.props.floor === undefined || this.props.order === undefined) {
      return (<div className="well info-wrapper"><div className="loader"></div></div>);
    }

    return (
      <div className="well info-wrapper">
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Нормовреме (мин.)</td>
              <td>{this.props.order.payload !== undefined && (Math.round(this.props.order.payload.time / 60 * 100) / 100)}</td>
              <td>Брой пуснати облекла</td>
              <td>{this.state.earningsStart}</td>
              <td>Остават за пускане</td>
              <td>{this.state.orderInfo.articles_number_from_batches - this.state.earningsStart}</td>
            </tr>
            <tr>
              <td>Общо скроени бройки</td>
              <td>{this.state.orderInfo.articles_number_from_batches}</td>
              <td>Остават за кроене</td>
              <td>{this.state.orderInfo.articles_number - this.state.orderInfo.articles_number_from_batches}</td>
              <td>Брой готови облекла</td>
              <td>{this.state.earningsEnd}</td>
            </tr>
            <tr>
              <td>Брой облекла във веригатa</td>
              <td colSpan="5">{this.state.earningsStart - this.state.earningsEnd}</td>
            </tr>
            <tr>
              <td>Присъстващи</td>
              <td>{this.props.floor.payload.currentPeople}</td>
              <td>Отсъстващи</td>
              <td>{this.props.floor.payload.missingPeople}</td>
              <td>Работници от друга бригада</td>
              <td>{this.state.anotherUsers}</td>
            </tr>
            <tr>
              <td colSpan="6">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    floor: state.floor.floor,
    queryOrder: parseInt(state.query.order, 10),
    department: parseInt(state.query.department, 10),
    earnings: state.earnings.data,
    order: state.orders.cache[parseInt(state.query.order, 10)],
    users: state.users.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setQueryValue: (val, type, callback) => dispatch(setQueryValue(val, type, callback)),
    loadOrderData: (id) => dispatch(loadOrderById(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(More);