import React from 'react';
import { connect } from 'react-redux';
import { setQueryValue} from '../../actions/query';
import { loadOrderById } from '../../actions/orders';

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earnings: [],
      orderInfo: {
        articles_number: 0,
        articles_number_from_batches: 0
      }
    }
  }
  
  componentWillReceiveProps(props) {
    let earnings = [];
    let orderInfo = this.state.orderInfo;

    if (props.earnings !== undefined) {
      const order = props.earnings.find((o) => o.order_id);
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

    this.setState({ earnings: earnings });
    this.setState({ orderInfo: orderInfo });
  }
  
  
  render() {
    if (this.props.floor === undefined) {
      return (<div className="well info-wrapper"><div className="loader"></div></div>);
    }

    return (
      <div className="well info-wrapper">
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Нормовреме (мин.)</td>
              <td>{this.props.order.payload !== undefined && (Math.round(this.props.order.payload.time/60*100)/100)}</td>
              <td>Брой пуснати облекла</td>
              <td>...</td>
              <td>Остават за пускане</td>
              <td>?{this.state.orderInfo.articles_number_from_batches}</td>
            </tr>
            <tr>
              <td>Общо скроени бройки</td>
              <td>{this.state.orderInfo.articles_number_from_batches}</td>
              <td>Остават за кроене</td>
              <td>{this.state.orderInfo.articles_number - this.state.orderInfo.articles_number_from_batches}</td>
              <td>Брой готови облекла</td>
              <td>...</td>
            </tr>
            <tr>
              <td>Брой облекла във веригатa</td>
              <td colSpan="5">...</td>
            </tr>
            <tr>
              <td>Присъстващи</td>
              <td>{this.props.floor.payload.currentPeople}</td>
              <td>Отсъстващи</td>
              <td>{this.props.floor.payload.missingPeople}</td>
              <td>Работници от друга бригада</td>
              <td>...</td>
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
    queryOrder: state.query.order,
    earnings: state.earnings.data,
    order: state.orders.order,
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