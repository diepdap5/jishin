// import logo from './logo.svg';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Button, Switch } from 'antd';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapTemp from './container/MapTemp'
import ShelterInfo from './container/ShelterInfo'


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <Route exact path="/"
              render={(props) => {
                  return <MapTemp/>
              }} />

            <Route exact path="/shelter-details"
              render={(props) => {
                return <ShelterInfo/>
              }} />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
