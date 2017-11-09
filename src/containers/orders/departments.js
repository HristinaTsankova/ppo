import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import { loadAllDepartments } from '../../actions/departments';

class Departments extends React.Component {
  state = {
    departments: [],
    selectedBrigade: null
  }
  constructor(props) {
    super(props);

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

  componentDidMount() {
    this.props.loadDepartments();
  }

  render() {
    if (this.props.departments === undefined || this.props.departments.length === undefined) {
      return null;
    }

    return (
      <div>
        <div className="col-lg-6 col-sm-12 col-md-12">
          <div className="briga">
            <div className="row text-center">
              <h2>Избери бригада:</h2>
            </div>
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <Typeahead
                  options={this.props.departments}
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

const mapStateToProps = (state) => {
  return {
    departments: state.departments.list
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadDepartments: () => dispatch(loadAllDepartments()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Departments));
