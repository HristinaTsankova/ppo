import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import Header from '../header';

export default class Orders extends React.Component {

  state = {
    orders: [],
    selectedModel: null,
    selectedBrigade: null
  }

  constructor() {
    super()
    this.onDependenciesClick = this.onDependenciesClick.bind(this)
    this.onPlansClick = this.onPlansClick.bind(this)
    this.onSelectionModel = this.onSelectionModel.bind(this)
    this.onSelectionBrigade = this.onSelectionBrigade.bind(this)
  }

  onDependenciesClick() {
    this.props.history.push(`/orders/${this.state.selectedModel}/dependencies`);
  }
  onPlansClick() {
    this.props.history.push(`/orders/${this.state.selectedBrigade}/plan`)
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
            <div>
                <Header/>
                <div className="container-fluid choice">
                    <div className="row logo">
                        <div className="col-md-6 model">
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
                        <div className="col-md-6 briga">
                            <div className="row">
                                <h2>Избери бригада:</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-8 login-form">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-search"/></span>
                                        <Typeahead
                                            options={this.state.orders}
                                            onChange={this.onSelectionBrigade}
                                            labelKey="name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 login-form">
                                    <button type="button" disabled={!this.state.selectedBrigade} className="btn btn-warning save" onClick={this.onPlansClick}>Подов план</button>
                                </div>
                            </div>
                        </div>
          </div>
        </div>
      </div>
    )
  }
}
