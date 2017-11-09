import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import Floor from './floor';
import { loadAllUsers } from '../../actions/users';
import { setQueryValue, QUERY_PROCESS, QUERY_DEPARTMENT } from '../../actions/query';
import noImage from '../image/image.png';

class Plan extends React.Component {
  state = {
    showSidebar: false
  };

  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    this.props.setQueryValue(query.get('process'), QUERY_PROCESS);
    this.props.setQueryValue(this.props.match.params.id, QUERY_DEPARTMENT);
    this.showSidebarForm = this.showSidebarForm.bind(this);
  }


  componentDidMount() {
    this.props.loadAllUsers();
  }

  showSidebarForm = () => {
    const { showSidebar } = this.state
    this.setState({
      showSidebar: !showSidebar
    })
  }

  render() {
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
                    <td><input type="search" className="form-control" /></td>
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

        {this.state.showSidebar &&
          <Sidebar />}
        <div className="container-fluid places">
          <div className="row">
            <h2>Бригада 1</h2>
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
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadAllUsers: () => dispatch(loadAllUsers()),
    setQueryValue: (val, type) => dispatch(setQueryValue(val, type)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
