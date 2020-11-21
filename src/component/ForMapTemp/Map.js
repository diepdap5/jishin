import Marker from './Marker';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import axios from "axios";
require('dotenv').config()
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 11
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            name="You're here"
            color="blue"
            tooltip = "You're here"
          />
          
          {this.props.data.map(function (this_data, index) {
            if (this_data.name) {
              return (
                <Marker
                  lat={this_data.coord_lat}
                  lng={this_data.coord_lng}
                  name={this_data.name}
                  color="green"
                  tooltip={this_data.name + "\n" + this_data.place}
                />
            );
            } else {
              return (
                <Marker
                  lat={this_data.coord_lat}
                  lng={this_data.coord_lng}
                  name={"Time: " + this_data.occure_time + " \nStrength: " + this_data.strength}
                  color="red"
                  tooltip={this_data.name + "\n" + this_data.place}
                />
            );
            }
            
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;