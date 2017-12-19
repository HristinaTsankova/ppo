import React from 'react';
import { connect } from 'react-redux';
import Department from './department';
import moment from 'moment';


class Cutting extends React.Component {
  renderRow(rowData, i) {
    return (
      <div className="row" key={i}>
        <Department data={rowData} />
      </div>
    )
  }

  render() {
    if (this.props.departments === undefined || this.props.departments.length === undefined) {
      return (<div className="panel-body"><div className="loader"></div></div>)
    }
    const rows = this.props.departments.map(this.renderRow);
    return (
      <div className="panel-body">
        <div className="container-fluid">
          <h2 className="title2">План Кроялно {moment().date('d').month('m').year('y').format('DD/MM/YYYY')}</h2>
          {rows}
          <br /><br />
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
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cutting);