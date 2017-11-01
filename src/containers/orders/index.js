import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import Header from '../header';
import Departments from './departments';
import Consants from '../app/constants';

export default class Orders extends React.Component {

  state = {
    orders: [],
    selectedModel: null,
  }

  constructor() {
    super()
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

  fetchOrders() {
    const request = {
      method: 'GET',
      headers: ({'Accept': 'application/vnd.elitex-v1+json', 'Content-Type': 'application/json', 'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ"})
    };
    fetch(`${Consants.remoteServer}/api/fp/orders`, request).then((response) => {
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
      <div>
        <Header/>
        <div className="container-fluid choice">
          <div className="row logo">
            <div className="col-md-6 col-sm-6">
              <div className="model">
                <div className="row">
                  <h2>Избери модел:</h2>
                </div>
                <div className="row">
                  <div className="col-md-8 login-form">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-search"/></span>
                      <Typeahead
                        options={this.state.orders}
                        onChange={this.onSelectionModel}
                        labelKey="name" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 login-form">
                    <button type="button" disabled={!this.state.selectedModel} className="btn btn-primary save" onClick={this.onDependenciesClick}>Последователност на процеси</button>
                  </div>
                </div>
              </div>
            </div>
            <Departments/>
          </div>
        </div>
      </div>
    )
  }
}
