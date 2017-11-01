import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {withRouter} from "react-router-dom";
import Consants from '../app/constants';

class Departments extends React.Component{
    state = {
        departments: [],
        selectedBrigade: null
    }
    constructor() {
        super();

        this.onPlansClick = this.onPlansClick.bind(this)
        this.onSelectionBrigade = this.onSelectionBrigade.bind(this)
    }

    onPlansClick() {
        this.props.history.push(`/departments/${this.state.selectedBrigade}/plan`)
    }

    onSelectionBrigade(selection) {
        this.setState({
          ...this.state,
          selectedBrigade: selection.length ? selection[0].id : null
        })
    }
    
    fetchDepartments() {
        const request = {
          method: 'GET',
          headers: ({'Accept': 'application/vnd.elitex-v1+json', 'Content-Type': 'application/json', 'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ"})
        };
        fetch(`${Consants.remoteServer}/api/fp/departments`, request).then((response) => {
          return response.json()
        }).then((json) => {
          this.setState({departments: json})
                    
        });
    }
    
      componentDidMount() {
        this.fetchDepartments();
      }

      render() {
          return(
            <div>
                <div className="col-md-6 col-sm-6">
                    <div className="model">
                        <div className="row">
                            <h2>Избери бригада:</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-8 login-form">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-search"/></span>
                                        <Typeahead
                                            options={this.state.departments}
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
          )
      }
}
export default withRouter (Departments);