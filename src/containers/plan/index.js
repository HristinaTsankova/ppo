import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import Floor from './floor';
import { loadAllUsers } from '../../actions/users';
import { setQueryValue, QUERY_PROCESS, QUERY_DEPARTMENT } from '../../actions/query';
import noImage from '../image/image.png';
import Dropdown from './dropdown';

class Plan extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      
    }
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
                    <td>
                      <Dropdown/>
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

       
          <Sidebar isOpen = {this.state.showSidebar}/>
          <Content isOpen = {this.state.showSidebar}/>
      </div>
    )
  }
}

class Content extends React.Component {

  render() {
    const contentClass = this.props.isOpen ? 'content more' : 'content';
    return(
      <div className={contentClass}>
        <div className="row">
          <h2>Бригада 1</h2>
        </div>
        <div className="row">
          <Floor />
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
