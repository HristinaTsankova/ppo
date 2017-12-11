import { LOAD_ORDERS_SUCCESS, LOAD_SINGLE_ORDER_SUCCESS, CACHE_SINGLE_ORDER } from "../actions/orders";

const orders = (state = {
  list: [],
  order: {},
  cache: {}
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
        order: action.order,
      };

    case CACHE_SINGLE_ORDER:
      let cache = state.cache;
      cache[action.order.id] = action.order;
      return {
        ...state,
        cache: cache
      };

    default:
      return state;
  }
}

export default orders;
