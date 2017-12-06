import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { setQueryValue, QUERY_PROCESS, QUERY_DEPARTMENT, QUERY_ORDER, QUERY_EDITABLE } from '../../actions/query';
import { loadDepartmentById } from '../../actions/departments';
import { loadOrderById } from '../../actions/orders';
import Sidebar from './sidebar';
import Floor from './floor';
import Info from './info';
import '../style/debug.css';

class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlan: true,
      showSettings: false,
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

  setEditable = () => {
    this.props.setQueryValue(!this.props.editable, QUERY_EDITABLE);
  }

  showHidePlan = () => {
    const { showPlan } = this.state
    this.setState({
      showPlan: !showPlan
    })
  }

  showHideSettings = () => {
    const { showSettings } = this.state
    this.setState({
      showSettings: !showSettings
    })
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

  render() {
    if (this.props.department === undefined || this.props.department.id === undefined || this.props.queryOrder === null || this.props.order === undefined) {
      return null;
    }

    let { department } = this.props;

    return (
      <div className="page-wrap">
        <div className="menu-bar">
          <p />
          <button data-tip="Подов план" type="button" className={this.state.showPlan ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showHidePlan}><span className="glyphicon glyphicon-dashboard" /></button>
          <button data-tip="Списъци с данни за подов план" type="button" className={this.state.showSidebar ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showSidebarForm}><span className="glyphicon glyphicon-th-list"></span></button>
          
          <button data-tip="Редактиране на подов план" type="button" className={this.props.editable ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.setEditable}><span className="glyphicon glyphicon-pencil" /></button>

          <button data-tip="Настройки на подов план" type="button" className={this.state.showSettings ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showHideSettings}><span className="glyphicon glyphicon-wrench" /></button>
          <button data-tip="Информация подовия план" type="button" className={this.state.showMore ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showMoreForm}><span className="glyphicon glyphicon-info-sign"></span></button>
        </div>
        <div className="panel-body offset-left-60 col-md-12">
          {this.state.showMore && <div className={((this.state.showMore) ? "col-md-12" : "col-md-12")}><Info/></div>}
          <div className="row">
            <h2 className="title_brigade">{department.name}</h2>
          </div>
          <div className={((this.state.showSidebar) ? "col-md-8 wrapper" : "col-md-12 wrapper")}>
            {this.state.showPlan && <Floor />}
          </div>
          {this.state.showSidebar && <div className={((this.state.showPlan) ? "col-md-4" : "col-md-12")}><Sidebar /></div>}
          
        </div>
        <ReactTooltip type="dark" effect="solid" />
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
