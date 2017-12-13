import React from 'react';
import { connect } from 'react-redux';
import { setQueryValue, QUERY_ORDER } from '../../actions/query';
import { saveFloor } from '../../actions/floor';
import { loadOrderById } from '../../actions/orders';

import Dropdown from './dropdown';


class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      calculatedLoadPerDay: 0,
      missingPeople: 0,
      currentPeople: 0,
      loadPerDay: 0,
      description: ''
    }
  }

  onOrderChange = (order) => {
    this.props.setQueryValue(order, QUERY_ORDER);
    this.props.loadOrderData(order);
  }

  saveFloorSettings = () => {
    const floor = this.props.floor;
    floor.payload.description = this.state.description;
    floor.payload.calculatedLoadPerDay = parseInt(this.state.calculatedLoadPerDay, 10);
    floor.payload.missingPeople = parseInt(this.state.missingPeople, 10);
    floor.payload.currentPeople = parseInt(this.state.currentPeople, 10);
    floor.payload.loadPerDay = parseInt(this.state.loadPerDay, 10);
    this.setState({ edited: false });
    this.props.saveFloorData(floor);
  }

  componentDidMount() {
    this.initState(this.props);
  }

  componentWillReceiveProps(props) {
    this.initState(props);
  }

  initState = (props) => {

    if (props.floor !== undefined) {
      this.setState({
        calculatedLoadPerDay: props.floor.payload.calculatedLoadPerDay !== undefined ? props.floor.payload.calculatedLoadPerDay : 0,
        missingPeople: props.floor.payload.missingPeople !== undefined ? props.floor.payload.missingPeople : 0,
        currentPeople: props.floor.payload.currentPeople !== undefined ? props.floor.payload.currentPeople : 0,
        loadPerDay: props.floor.payload.loadPerDay !== undefined ? props.floor.payload.loadPerDay : 0,
        description: props.floor.payload.description !== undefined ? props.floor.payload.description : ''
      });

      if (props.order.id !== undefined) {
        if (props.order.payload.time !== undefined && props.floor.payload.currentPeople !== undefined) {
          let final = Math.round((480 * props.floor.payload.currentPeople) / (props.order.payload.time/60));
          this.setState({
            calculatedLoadPerDay: final
          });
        }
      }
    }
  }

  updateStateWithValue = (object) => {
    this.setState(object);
    this.setState({ edited: true })
  }

  render() {
    if (this.props.queryOrder === null || this.props.order === undefined) {
      return null;
    }

    let calculatedLoadPerDay = 0;
    if (this.state.currentPeople !== 0 && this.props.order.payload.time !== undefined) {
      calculatedLoadPerDay = Math.round((480 * this.state.currentPeople) / (this.props.order.payload.time/60));
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
            <div className="col-md-6"><input type='number' className="form-control" value={this.state.loadPerDay} onChange={e => this.updateStateWithValue({ loadPerDay: e.target.value })} /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Работници</div>
            <div className="col-md-6"><input type='number' className="form-control" value={this.state.currentPeople} onChange={e => this.updateStateWithValue({ currentPeople: e.target.value })} /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Отсъстващи</div>
            <div className="col-md-6"><input type='number' className="form-control" value={this.state.missingPeople} onChange={e => this.updateStateWithValue({ missingPeople: e.target.value })} /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Актуален график</div>
            <div className="col-md-6"><input type='number' className="form-control" disabled="true" value={calculatedLoadPerDay} onChange={e => this.updateStateWithValue({ calculatedLoadPerDay: e.target.value })} /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Брой поръчки</div>
            <div className="col-md-6"><input type='number' className="form-control" disabled="true" /></div>
          </div>
          <div className="row">
            <div className="col-md-6">Остават</div>
            <div className="col-md-6"><input type='number' className="form-control" disabled="true" /></div>
          </div>
          <div className="row">
            <div className="col-md-12">Забележки ...</div>
          </div>
          <div className="row">
            <div className="col-md-12"><textarea type="text" className="form-control" onChange={e => this.updateStateWithValue({ description: e.target.value })} value={this.state.description} /></div>
          </div>
          <p />
          <div className="row">
            <div className="col-md-12 text-right"><button type="button" className="btn btn-warning" disabled={!this.state.edited} onClick={this.saveFloorSettings}><span className="glyphicon glyphicon-ok" /> Приложи промените</button></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    floor: state.floor.floor,
    queryOrder: state.query.order,
    order: state.orders.order
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    saveFloorData: (data) => dispatch(saveFloor(data)),
    setQueryValue: (val, type, callback) => dispatch(setQueryValue(val, type, callback)),
    loadOrderData: (id) => dispatch(loadOrderById(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
