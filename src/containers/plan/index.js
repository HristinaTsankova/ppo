import React from 'react';
import Header from '../header';
import Sidebar from './sidebar';
import Floor from './floor';
 
export default class Plan extends React.Component {
    state={
        showSidebar: false
    };
    constructor() {
        super();

        this.showSidebarForm = this.showSidebarForm.bind(this);
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
                <Header/>
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