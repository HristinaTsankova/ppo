export const DIALOG_SHOW = 'DIALOG_SHOW';
export const DIALOG_DATA = 'DIALOG_DATA';

export function showDialog(title, question, callback) {
  return dispatch => {
    dispatch(setDialogData(title, question, callback));
    dispatch(setShowDialog(true));
  }
}

export function hideDialog() {
  return dispatch => {
    dispatch(setShowDialog(false));
  }
}

function setDialogData(title, question, callback) {
  return {
    type: DIALOG_DATA,
    data: {
      title: title,
      question: question,
      callback: callback
    }
  };
}

function setShowDialog(show) {
  return {
    type: DIALOG_SHOW,
    show: show
  };
}
