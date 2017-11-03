import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {withRouter} from "react-router-dom";
import Constants from '../../utils/constants';

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
          headers: Constants.headers
        };
        fetch(`${Constants.remoteServer}/api/fp/departments`, request).then((response) => {
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
                <div className="col-lg-6 col-sm-12 col-md-12">
                    <div className="briga">
                        <div className="row">
                            <h2>Избери бригада:</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
                                <Typeahead
                                    options={this.state.departments}
                                    onChange={this.onSelectionBrigade}
                                    labelKey="name"
                                    placeholder="Търси по бригада..." />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
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