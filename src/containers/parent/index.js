import React from 'react';

export default class AddInputs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showDel : false,
     };

      this.showDelForm = this.showDelForm.bind(this);
   
    }

    showDelForm = () => {
      const {showDel} = this.state;
      this.setState({showDel : !showDel})
    }

   
    render() {
      return(
        <div onClick={this.showDelForm}>
          <span onClick = {this.showDelForm}>.</span>
          {
            this.state.showDel &&
            <button className="btn btn-circle btn-danger dependencies">-</button>}
        </div>
      )
    }
    

}