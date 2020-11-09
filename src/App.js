// import logo from './logo.svg';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Button } from 'antd';

import './App.css';
import MapTemp from './container/MapTemp'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path="/" component={MapTemp}/>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
