// import logo from './logo.svg';
import React, { Component } from 'react';

import '../App.css';
import SimpleMap from '../component/ForMapTemp/Map'

class MapTemp extends Component {
  render() {
    return (
      <div className="App">
        <SimpleMap 
        center={this.props.center} 
        user_location={this.props.user_location}
        data = {this.props.data?this.props.data:[]}
        earthquake_data ={this.props.earthquake_data? this.props.earthquake_data : []}
        defaultZoom={this.props.zoom}
        destination = {this.props.destination}/>
      </div>
    );
  }

}

export default MapTemp;
