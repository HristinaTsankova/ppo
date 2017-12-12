import { LOAD_EARNINGS_SUCCESS } from "../actions/earnings";

const earnings = (state = {
  data: []
}, action) => {
  switch (action.type) {
    case LOAD_EARNINGS_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}

export default earnings;
