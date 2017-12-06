import { LOAD_ORDERS_SUCCESS, LOAD_SINGLE_ORDER_SUCCESS } from "../actions/orders";

const orders = (state = {
  list: [],
  order: {}
}, action) => {
  switch (action.type) {
    case LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        list: action.list
      };

    case LOAD_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order
      };

    default:
      return state;
  }
}

export default orders;
