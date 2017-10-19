import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

export default class Orders extends React.Component {

  state = {
    orders: [],
    selectedId: null
  }

  constructor() {
    super()
    this.onDependenciesClick = this.onDependenciesClick.bind(this)
    this.onPlansClick = this.onPlansClick.bind(this)
    this.onSelection = this.onSelection.bind(this)
  }

  onDependenciesClick() {
    this.props.history.push(`/orders/${this.state.selectedId}/dependencies`);
  }
  onPlansClick() {
    this.props.history.push(`/orders/${this.state.selectedId}/plan`)
  }
  onSelection(selection) {
    this.setState({
      ...this.state,
      selectedId: selection[0].id
    })
  }

  fetchOrders() {
    const request = {
      method: 'GET',
      headers: ({'Access': 'application/vnd.elitex-v1+json', 'Content-Type': 'application/json', 'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ"})
    };
    fetch(`http://178.62.112.203/api/fp/orders`, request).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({orders: json})
    });
  }

  componentDidMount() {
    this.fetchOrders();
  }

  render() {
    return (
      <div className="container">
        <div className="row logo">
          <h2>Избери модел:</h2>
        </div>
        <div className="row">
          <div className="col-md-5 login-form">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-search"/></span>

              <Typeahead options={this.state.orders} onChange={this.onSelection} labelKey="name"/>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-6 login-form">

            <button type="button" disabled={!this.state.selectedId} className="btn btn-primary save" onClick={this.onDependenciesClick}>Технологии и взаимовръзки</button>
            <button type="button" disabled={!this.state.selectedId} className="btn btn-secondary save" onClick={this.onPlansClick}>Подов план</button>

          </div>
        </div>
      </div>
    )
  }
}