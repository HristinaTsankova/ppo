import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import Floor from './floor';
import { setQueryValue, QUERY_PROCESS, QUERY_DEPARTMENT, QUERY_ORDER } from '../../actions/query';
import { loadDepartmentById } from '../../actions/departments';
import { loadOrderById } from '../../actions/orders';
import noImage from '../image/image.png';
import Dropdown from './dropdown';

class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false
    }
    this.showSidebarForm = this.showSidebarForm.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.props.setQueryValue(query.get('process'), QUERY_PROCESS);
    this.props.setQueryValue(this.props.match.params.id, QUERY_DEPARTMENT);
    this.props.setQueryValue(query.get('order'), QUERY_ORDER, (order) => {
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
                    <th>Скроено</th>
                    <th>Остават</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Dropdown changeHandler={this.onOrderChange} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-1">
              <button type="button" className="btn sidebar_button" onClick={this.showSidebarForm}><span className="glyphicon glyphicon-th-large"></span></button>
            </div>
            <div className="col-md-1">
              <img src={noImage} alt='' className="noImage" />
            </div>
            <div className="col-md-2">
              <textarea type="text" placeholder="Забележки" className="notes" />
            </div>
          </div>
        </div>

        <Sidebar isOpen={this.state.showSidebar} />
        <div className={this.props.isOpen ? 'content more' : 'content'}>
          <div className="row">
            <h2>{department.name}</h2>
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
