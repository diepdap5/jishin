// import logo from './logo.svg';
import React, { Component } from 'react';

import '../App.css';
import SimpleMap from '../component/ForMapTemp/Map'

class MapTemp extends Component {
  render() {
    return (
      <div className="App">
        <SimpleMap 
        center={this.props.config_center.lat == null ? this.props.default_center : this.props.config_center} 
        data = {this.props.data}
        defaultZoom={this.props.zoom}
        destination = {this.props.destination}/>
      </div>
    );
  }

}

export default MapTemp;
