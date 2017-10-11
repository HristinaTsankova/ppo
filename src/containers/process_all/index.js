import React from 'react';
import Header from '../header/index';
import Process from '../process';

export default () => (
  <div>
    <Header />
    <Process/>
    <a href="/plan" className="btn btn-success">Продължи</a>
  </div>
)