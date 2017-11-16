import React from 'react';
import { connect } from 'react-redux';

class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getOrders: ''
    }
  }
  
  renderRow(rowData, i) {
    return (
      <option key={i} value={rowData.id}>{rowData.name}</option>
    )
  }
  
  render() {
    const rows = this.props.department.orders.map(this.renderRow)
    return (
      <select className="selectpicker" value={this.props.order} onChange={(e) => this.props.changeHandler(e.target.value) }>
        <option disabled>Избери модел</option>
        {rows}
      </select>
    )
  }
}

const mapStateToProps = (state) => ({
  department: state.departments.department,
  order: state.query.order
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);