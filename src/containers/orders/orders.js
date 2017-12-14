import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';

class Orders extends React.Component {

  state = {
    orders: [],
    selectedModel: null,
  }

  constructor(props) {
    super(props)
    this.onDependenciesClick = this.onDependenciesClick.bind(this)
    this.onSelectionModel = this.onSelectionModel.bind(this)
  }

  onDependenciesClick() {
    this.props.history.push(`/orders/${this.state.selectedModel}/dependencies`);
  }

  onSelectionModel(selection) {
    this.setState({
      ...this.state,
      selectedModel: selection.length ? selection[0].id : null
    })
  }
  
  onSelectionBrigade(selection) {
    this.setState({
      ...this.state,
      selectedBrigade: selection.length ? selection[0].id : null
    })
  }

  render() {
    if (this.props.orders === undefined || this.props.orders.length === undefined) {
      return (<div className="panel-body"><div className="loader"></div></div>)
    }

    return (
      <div className="col-lg-6 col-sm-12 col-md-12">
        <div className="model">
          <div className="row text-center">
            <h2>Избери модел:</h2>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Typeahead
                options={this.props.orders}
                onChange={this.onSelectionModel}
                labelKey="name"
                placeholder="Търси по модел..." />

            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <button type="button" disabled={!this.state.selectedModel} className="btn btn-primary save" onClick={this.onDependenciesClick}>Последователност на процеси</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.list
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));