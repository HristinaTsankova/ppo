import React, {Component} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead';

class AddParent extends Component {
  
  state = {
    open: false
  }
  
  constructor() {
    super()
    this.show = this.show.bind(this)
    this.add = this.add.bind(this)
  }
  
  show() {
    this.setState({open:true})
  }
  
  add(selection) {
    this.setState({open: false})
    this.props.onAdd(selection)
  }
  
  render() {
    const {open} = this.state
    if(!open) {
      return (
        <button
          type="button"
          className="btn-add-parent btn btn-info btn-sm"
          onClick={this.show}>+</button>
      )
    }
    
    return (
      <Typeahead
        {...this.props}
        autoFocus={true}
        onChange={this.add} />
    )
  }
}

export default AddParent