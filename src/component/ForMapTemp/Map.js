import Marker from './Marker';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
  
  static defaultProps = {
    center: {
      lat: 21,
      lng: 105
    },
    zoom: 11
  };
  renderMarkers(map, maps, center) {
    let marker = new maps.Marker({
      position: center,
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
          onGoogleApiLoaded={({map, maps,center}) => this.renderMarkers(map, maps, this.props.center)}
        >
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            name="My Location"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;