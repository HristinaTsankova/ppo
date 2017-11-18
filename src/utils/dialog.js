import React from 'react';
import { connect } from 'react-redux';
import { hideDialog } from '../actions/dialog';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.doConfirm = this.doConfirm.bind(this);
  }

  doConfirm() {
    this.props.hideDialog();
    this.props.dialog.data.callback();
  }

  render() {
    if (this.props.dialog.show !== true) {
      return null;
    }

    return (
      <div>
        <div className="modal fade in" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.hideDialog}><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">{this.props.dialog.data.title}</h4>
              </div>
              <div className="modal-body">
                <p>{this.props.dialog.data.question}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.hideDialog}>Откажи</button>
                <button type="button" className="btn btn-primary" onClick={this.doConfirm}>Потвърди</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dialog: state.dialog
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    hideDialog: () => dispatch(hideDialog())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);