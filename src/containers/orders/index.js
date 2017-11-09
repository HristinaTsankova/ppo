import React from 'react';
import Orders from './orders';
import Departments from './departments';

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid choice">
          <div className="row logo">
            <Orders />
            <Departments />
          </div>
        </div>
      </div>
    )
  }
}
