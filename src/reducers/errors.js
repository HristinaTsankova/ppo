export const LOAD_GENERAL_ERROR = 'LOAD_GENERAL_ERROR';

const errors = (state = {
  isError: null
}, action) => {
  switch (action.type) {
    case LOAD_GENERAL_ERROR:
      return {
        ...state,
        isError: action.isError
      };

    default:
      return state;
  }
}

export default errors;