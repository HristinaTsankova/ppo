import React from 'react';
import { connect } from 'react-redux';
import { setQueryValue, QUERY_ORDER, QUERY_EDITABLE } from '../../actions/query';
import { loadDepartmentById } from '../../actions/departments';
import { loadOrderById } from '../../actions/orders';

import Dropdown from './dropdown';


class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      showMore: false
    }
    this.showSidebarForm = this.showSidebarForm.bind(this);
    this.showMoreForm = this.showMoreForm.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
  }

  onOrderChange(order) {
    this.props.setQueryValue(order, QUERY_ORDER);
    this.props.loadOrderData(order);
  }

  showSidebarForm = () => {
    const { showSidebar } = this.state
    this.setState({
      showSidebar: !showSidebar
    })
  }

  showMoreForm = () => {
    const { showMore } = this.state
    this.setState({
      showMore: !showMore
    })
  }

  setEditable = () => {
    this.props.setQueryValue(!this.props.editable, QUERY_EDITABLE);
  }

  render() {
    if (this.props.department === undefined || this.props.department.id === undefined || this.props.queryOrder === null || this.props.order === undefined) {
      return null;
    }

    return (

      <div className=" well info-wrapper">
        <div className="div-table">
          <div className="row">
            <div className="col-md-6">Модел</div>
            <div className="col-md-6"><Dropdown changeHandler={this.onOrderChange} /></div>
          </div>
          <div className="row">
            <div className="col-md-6">График</div>
            <div className="col-md-6"><input type='number' className="form-control" /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Работници</div>
            <div className="col-md-6"><input type='number' className="form-control" /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Отсъстващи</div>
            <div className="col-md-6"><input type='number' className="form-control" /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Актуален график</div>
            <div className="col-md-6"><input type='number' className="form-control" /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Брой поръчки</div>
            <div className="col-md-6"><input type='number' className="form-control" /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Остават</div>
            <div className="col-md-6"><input type='number' className="form-control" /></div>
          </div>
          <div className="row">
            <div className="col-md-12">Забележки ...</div>
          </div>
          <div className="row">
            <div className="col-md-12"><textarea type="text" className="form-control" /></div>
          </div>
        </div>
      </div>
    )
  }
}

/*
<div className="col-md-3">

</div>
*/

const mapStateToProps = (state) => {
  return {
    department: state.departments.department,
    queryOrder: state.query.order,
    editable: state.query.editable,
    order: state.orders.order
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setQueryValue: (val, type, callback) => dispatch(setQueryValue(val, type, callback)),
    loadOrderData: (id) => dispatch(loadOrderById(id)),
    loadCurrentDepartment: (id, callback) => dispatch(loadDepartmentById(id, callback))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
