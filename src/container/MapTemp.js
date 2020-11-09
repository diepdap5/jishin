// import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Button } from 'antd';

import '../App.css';
import SimpleMap from '../component/ForMapTemp/Map'


class MapTemp extends Component {
  state = {
    my_latitude: 21.020671999999998,
    my_longitude: 105.84391679999999,
    zoom : 15
  }
  handleUserLocation = () => {
    var my_latitude;
    var my_longitude;
  
    navigator.geolocation.getCurrentPosition(
      position => {
        my_latitude = position.coords.latitude;
        this.setState({
          my_latitude: my_latitude
        })
        console.log("My latitude: "+ this.state.my_latitude);
        my_longitude = position.coords.longitude;
        this.setState({
          my_longitude: my_longitude
        })
        console.log("My longitude: "+ this.state.my_longitude);
      }
    );
  };
  render (){
    return (
      <div className="App">
        {/* <Button type="primary" onClick = {this.handleUserLocation}>ClickMe</Button> */}
        <SimpleMap center={{lat:this.state.my_latitude, lng:this.state.my_longitude}}/>
      </div>
    );
  }
  
}

export default MapTemp;
