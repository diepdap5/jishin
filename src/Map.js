import { Marker } from '@react-google-maps/api';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
  
  static defaultProps = {
    center: {
      lat: 21.020671999999998,
      lng: 105.84391679999999
    },
    zoom: 15
  };
  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: {lat: 21.020671999999998, lng: 105.84391679999999 },
      map,
      title: 'Shelter 01'
    });
    return marker;
  }
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCUCeYVV74IxeZkqF62sxloBc8m-EBkXOE' }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;