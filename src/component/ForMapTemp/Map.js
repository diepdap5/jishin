import MarkerPin from './Marker';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
require('dotenv').config()
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 11
  };
  renderDirection(map, maps, origin_ord, des_ord) {
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsService.route({
      origin: origin_ord,
      destination: des_ord,
      travelMode: maps.DirectionsTravelMode.DRIVING
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        const routePolyline = new maps.Polyline({
          path: response.routes[0].overview_path
        });
        routePolyline.setMap(map);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => {
            if (this.props.destination != null) {
              this.renderDirection(map, maps, this.props.user_location, this.props.destination);
            }
            if (this.props.destination_list != null) {
              var temp_destination_list = this.props.destination_list;
              var i;
              for (i = 0; i < temp_destination_list.length; i++) {
                var origin_ord = {
                  lat: temp_destination_list[i].origin_lat,
                  lng: temp_destination_list[i].origin_lng
                };
                var des_ord = {
                  lat: temp_destination_list[i].des_lat,
                  lng: temp_destination_list[i].des_lng
                };
                this.renderDirection(map, maps,
                  {
                    lat: temp_destination_list[i].origin_lat,
                    lng: temp_destination_list[i].origin_lng
                  }
                  ,
                  {
                    lat: temp_destination_list[i].des_lat,
                    lng: temp_destination_list[i].des_lng
                  });
                console.log(origin_ord);
                console.log(des_ord);
                
              }
              // this.renderDirection(map,maps, {lat:21, lng:106}, {lat:22, lng:105});
              // this.renderDirection(map,maps, {lat:21, lng:106}, {lat:22, lng:104});
            }
          }}

        >
          <MarkerPin
            lat={this.props.user_location ? this.props.user_location.lat : null}
            lng={this.props.user_location ? this.props.user_location.lng : null}
            name="You're here"
            color="blue"
            tooltip="You're here"
          />
          {this.props.data.map(function (this_data, index) {
            if (this_data.name && this_data.image_link) {
              return (
                <MarkerPin
                  lat={this_data.coord_lat}
                  lng={this_data.coord_lng}
                  name={this_data.name}
                  color="green"
                  tooltip={this_data.name + "\n" + this_data.place + "<img src='" + this_data.image_link + "' width =300 height =200 />"}
                />
              );
            } else {
              return (
                <MarkerPin
                  lat={this_data.coord_lat}
                  lng={this_data.coord_lng}
                  name={this_data.name}
                  color="green"
                  tooltip={this_data.name + "\n" + this_data.place}
                />
              );
            }

          })}
          {this.props.earthquake_data.map(function (this_data, index) {
            return (
              <MarkerPin
                lat={this_data.coord_lat}
                lng={this_data.coord_lng}
                name={"Time: " + this_data.occure_time + " \nStrength: " + this_data.strength}
                color="red"
                tooltip={this_data.name + "\n" + this_data.place}
              />
            );

          })
          }


        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;