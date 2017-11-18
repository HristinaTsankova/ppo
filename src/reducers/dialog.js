import { DIALOG_SHOW, DIALOG_DATA } from "../actions/dialog";

const dialog = (state = {
  data: { title: null, question: null, callback: null },
  show: false
}, action) => {
  switch (action.type) {
    case DIALOG_SHOW:
      return {
        ...state,
        show: action.show
      };

    case DIALOG_DATA:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}

export default dialog;