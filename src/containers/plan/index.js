import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { setQueryValue, QUERY_PROCESS, QUERY_DEPARTMENT, QUERY_ORDER, QUERY_EDITABLE } from '../../actions/query';
import { loadDepartmentById } from '../../actions/departments';
import { loadOrderById } from '../../actions/orders';
import { loadEarningsByIds } from "../../actions/earnings";
import Sidebar from './sidebar';
import Floor from './floor';
import Setup from './setup';
import More from './more';
import noImage from "../image/image.png";
import '../style/debug.css';

class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlan: true,
      showSettings: false,
      showMore: false,
      showImage: false,
      showSidebar: false
    }
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
          order = data.orders[0].id;
        }

        if (!this.props.order.hasOwnProperty('id')) {
          const ids = data.orders.map((o) => o.id);
          if (ids.length > 0) {
            this.props.loadEarnings(ids);
          }
          data.orders.forEach(o => {
            this.props.loadOrderData(o.id, order);
          });
        }
      });
    });
  }

  reloadData = () => {
    const ids = this.props.department.orders.map((o) => o.id);
    if (ids.length > 0) {
      this.props.loadEarnings(ids);
    }
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

  showHideImage = () => {
    const { showImage } = this.state
    this.setState({
      showImage: !showImage
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
    let order = this.props.department.orders.find(o => o.id === this.props.queryOrder);
    let { department } = this.props;

    return (
      <div className="page-wrap">
        <div className="menu-bar">
          <p />
          <button data-tip="Подов план" type="button" className={this.state.showPlan ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showHidePlan}><span className="glyphicon glyphicon-dashboard" /></button>
          <button data-tip="Списъци с данни за подов план" type="button" className={this.state.showSidebar ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showSidebarForm}><span className="glyphicon glyphicon-th-list"></span></button>
          <button data-tip="Редактиране на подов план" type="button" className={this.props.editable ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.setEditable}><span className="glyphicon glyphicon-pencil" /></button>
          <button data-tip="Настройки на подов план" type="button" className={this.state.showSettings ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showHideSettings}><span className="glyphicon glyphicon-wrench" /></button>
          <button data-tip="Информация за подов план" type="button" className={this.state.showMore ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showMoreForm}><span className="glyphicon glyphicon-info-sign"></span></button>
          <button data-tip="Модел" type="button" className={this.state.showImage ? 'btn menu-button-selected' : 'btn menu-button'} onClick={this.showHideImage}><span className="glyphicon glyphicon-film"></span></button>
          <button data-tip="Презареди данните" type="button" className="btn menu-button" onClick={this.reloadData}><span className="glyphicon glyphicon-refresh"></span></button>
        </div>
        <div className="panel-body offset-left-60 col-md-12">
          <div className="panel-body">
            <h2>{department.name}</h2>
            {order !== undefined && <h4>Поръчка: {order.name}</h4>}
          </div>
          <div className="panel-body">
            {this.state.showSettings && <div className="col-md-3"><Setup /></div>}
            {this.state.showMore && <div className="col-md-6"><More /></div>}
            {this.state.showImage && <div className="col-md-3"><div className="well info-wrapper"><img src={noImage} alt="" className="noImage" /></div></div>}
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
    queryOrder: parseInt(state.query.order, 10),
    editable: state.query.editable,
    order: state.orders.order
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setQueryValue: (val, type, callback) => dispatch(setQueryValue(val, type, callback)),
    loadOrderData: (id, order) => dispatch(loadOrderById(id, order)),
    loadCurrentDepartment: (id, callback) => dispatch(loadDepartmentById(id, callback)),
    loadEarnings: (ids) => dispatch(loadEarningsByIds(ids))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
