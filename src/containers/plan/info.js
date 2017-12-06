import React from 'react';
import { connect } from 'react-redux';
import { setQueryValue, QUERY_PROCESS, QUERY_DEPARTMENT, QUERY_ORDER, QUERY_EDITABLE } from '../../actions/query';
import { loadDepartmentById } from '../../actions/departments';
import { loadOrderById } from '../../actions/orders';

import Dropdown from './dropdown';
import More from './more';


class Plan extends React.Component {
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

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    let process = (query.get('process') !== null) ? parseInt(query.get('process'), 10) : null;
    this.props.setQueryValue(process, QUERY_PROCESS);

    this.props.setQueryValue(this.props.match.params.id, QUERY_DEPARTMENT);

    let getOrder = (query.get('order') !== null) ? parseInt(query.get('order'), 10) : null;
    this.props.setQueryValue(getOrder, QUERY_ORDER, (order) => {
      this.props.loadCurrentDepartment(this.props.match.params.id, (data) => {
        if (order === null) {
          this.props.setQueryValue(data.orders[0].id, QUERY_ORDER);
        }
        if (this.props.order === undefined) {
          this.props.loadOrderData((order === null) ? data.orders[0].id : order);
        }
      });
    });
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

    let { department } = this.props;

    return (
      <div className="page-wrap">
        <div className={this.state.showSidebar ? 'col-md-9' : 'col-md-12'}>
          <div className="row bar">
            
            <div className="col-md-10">
              <table className="table">
                <thead>
                  <tr>
                    <th>Модел</th>
                    <th>График</th>
                    <th>Работници</th>
                    <th>Отсъстващи</th>
                    <th>Актуален график</th>
                    <th>Брой поръчки</th>
                    <th>Остават</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Dropdown changeHandler={this.onOrderChange} />
                    </td>
                    <td></td>
                    <td><input type='number' className="selectpicker works" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-1">
              <button type="button" className="btn more-menu" onClick={this.showMoreForm}><span className="glyphicon glyphicon-option-horizontal"></span></button>
            </div>
          </div>
          { this.state.showMore ? <More/> : null }
          
        </div>
      </div>
    )
  }
}

/*
<div className="col-md-1">
<img src={noImage} alt='' className="noImage" />
</div>
<div className="col-md-3">
<textarea type="text" placeholder="Забележки..." className="notes" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
