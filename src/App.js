// import logo from './logo.svg';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import "antd/dist/antd.css";
import './App.css';
import ShelterPage from './container/ShelterInfo'
import LogPage from './container/LogPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <Route exact path="/"
              render={(props) => {
                return (
                  <div>
                    {/* <MapTemp pagename={this.props.pagename} /> */}
                    <LogPage pagename={this.props.pagename} />
                  </div>
                )
              }} />
            <Route exact path="/shelter-details"
              render={(props) => {
                return (
                  <div>
                    {/* <MapTemp pagename={this.props.pagename} /> */}
                    <ShelterPage  pagename={this.props.pagename}/>
                  </div>
                )
              }} />
          </Fragment>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
