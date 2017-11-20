import React from 'react';
import CutDepartments from './cutDepartments';


export default class Cutting extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
        departments:'',
    }
}

  
  render() {

    return(
      <div>
        <div className="container-fluid">
          <h2 className="title2">План Кроялно</h2>
          <div className="row">
            
              <CutDepartments/>
            
          </div>
        </div>
      </div>
    )
  }
}

