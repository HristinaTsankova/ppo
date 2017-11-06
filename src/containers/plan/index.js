import React from 'react';
import { connect } from 'react-redux';
import Header from '../header';
import Sidebar from './sidebar';
import Floor from './floor';
import { loadAllUsers } from '../../actions/users';
import { selsectDepartment } from '../../actions/departments';

class Plan extends React.Component {
  state = {
    showSidebar: false
  };
  constructor(props) {
    super(props);
    this.props.selsectDepartment(this.props.match.params.id);
    this.showSidebarForm = this.showSidebarForm.bind(this);
  }
  
  componentDidMount() {
    this.props.loadAllUsers();
  }

    showSidebarForm = () => {
        const {showSidebar} =this.state
        this.setState({
            showSidebar: !showSidebar
        })
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(data) {
        console.log(data)
    }
    render () {
        
        return(
            <div>
                <div className="row">
                    <div className="row bar">
                        <div className="col-md-7 col-sm-7">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>График</th>
                                        <th>Работници</th>
                                        <th>Отсъстващи</th>
                                        <th>Актуален график</th>
                                        <th>Скроено</th>
                                        <th>Остават</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <button type="button" className="btn sidebar_button" onClick={this.showSidebarForm}><span className="glyphicon glyphicon-th-large"></span></button>
                    </div>
                </div>
                
                {this.state.showSidebar &&
                <Sidebar />}
                <div className="container-fluid places">
                    <div className="row">
                        <Floor/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return { };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadAllUsers: () => dispatch(loadAllUsers()),
    selsectDepartment: (department) => dispatch(selsectDepartment(department))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
