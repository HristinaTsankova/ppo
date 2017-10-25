import React from 'react'

class Parent extends React.Component {
  state = {
    showDel: false
  };

  constructor(props) {
    super(props);
    this.showDelForm = this.showDelForm.bind(this);

  }

  showDelForm = () => {
    const {showDel} = this.state;
    this.setState({
      showDel: !showDel
    })
  }

  render() {
    const {parent} = this.props
    return (
      <div className="child">
        <span className="parentDel">
          {this.state.showDel && <button className="btn btn-circle btn-danger dependencies" value={parent.id} onClick={this.props.onDelete}>X</button>}
        </span>
        <span className="parent" onClick={this.showDelForm}>
          {parent.serial_number}
        </span>

      </div>
    )
  }
}

export default Parent