import {LOAD_ORDERS_SUCCESS, LOAD_ORDERS_ERROR, LOAD_SINGLE_ORDER_SUCCESS, LOAD_SINGLE_ORDER_ERROR} from "../actions/orders";

const orders = (state = {
}, action) => {
  switch (action.type) {
    case LOAD_ORDERS_SUCCESS:
      return {...state,
        list: action.list
      };
    
    case LOAD_SINGLE_ORDER_SUCCESS:
      return {...state,
        order: action.order
      };

    case LOAD_ORDERS_ERROR:
      return {...state,
        isListLoadError: action.isListLoadError
      };

    case LOAD_SINGLE_ORDER_ERROR:
      return {...state,
        isLoadError: action.isLoadError
      };

    default:
      return state;
  }
}

export default orders;
