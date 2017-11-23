import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import Floor from './floor';
import { setQueryValue, QUERY_PROCESS, QUERY_DEPARTMENT, QUERY_ORDER, QUERY_EDITABLE } from '../../actions/query';
import { loadDepartmentById } from '../../actions/departments';
import { loadOrderById } from '../../actions/orders';
import noImage from '../image/image.png';
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
    this.props.setQueryValue(parseInt(query.get('process'), 10), QUERY_PROCESS);
    this.props.setQueryValue(this.props.match.params.id, QUERY_DEPARTMENT);
    this.props.setQueryValue(parseInt(query.get('order'), 10), QUERY_ORDER, (order) => {
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
    const {showMore} = this.state
    this.setState ({
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
      <div>
        <div className="row">
          <div className="row bar">
            <div className="col-md-7 col-sm-7">
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
                    <td><input type='number' className="selectpicker works"/></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-1">
              <button type="button" className="btn more_menu" onClick={this.showMoreForm}><span className="glyphicon glyphicon-option-horizontal"></span></button>
              <button type="button" className="btn sidebar_button" onClick={this.showSidebarForm}><span className="glyphicon glyphicon-th-large"></span></button>
            </div>
            <div className="col-md-1">
              <img src={noImage} alt='' className="noImage" />
            </div>
            <div className="col-md-3">
              <textarea type="text" placeholder="Забележки..." className="notes" />
            </div>
          </div>
        </div>
        {
          this.state.showMore
            ? <More/>
            : null
        }
        <Sidebar isOpen={this.state.showSidebar}/>
        <div className={this.props.isOpen ? 'content more' : 'content'}>
          <div className="row">
            <h2>{department.name} <button type="button" onClick={this.setEditable} className="btn btn-link"><span className="glyphicon glyphicon-pencil" /></button></h2>
          </div>
          <div className="row">
            <Floor />
          </div>
        </div>
      </div>
    )
  }
}

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
