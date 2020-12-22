import MarkerPin from "./Marker";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Circle } from "react-google-maps";
require("dotenv").config();
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 11,
  };
  renderDirection(map, maps) {
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsService.route(
      {
        origin: this.props.user_location,
        destination: this.props.destination,
        travelMode: maps.DirectionsTravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
          console.log(response.routes[0]);
          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path,
          });
          routePolyline.setMap(map);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => {
            if (this.props.destination != null) {
              new maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.3,
                map,
                center: {lat: 21, lng: 105},
                radius: 275,
              })
              this.renderDirection(map, maps);
              
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
          {/* <Circle
            // key={index}
            defaultCenter={{
              lat: 21,
              lng: 105,
            }}
            radius={30000}
            options={{
              strokeColor: "#0022ff",
              fillColor: "#0099ff",
              fillOpacity: 0.1,
            }}
          /> */}
          {this.props.data.map(function (this_data, index) {
            if (this_data.name && this_data.image_link) {
              return (
                <MarkerPin
                  lat={this_data.coord_lat}
                  lng={this_data.coord_lng}
                  name={this_data.name}
                  color="green"
                  tooltip={
                    this_data.name +
                    "\n" +
                    this_data.place +
                    "<img src='" +
                    this_data.image_link +
                    "' width =300 height =200 />"
                  }
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
              <div>
                <MarkerPin
                  lat={this_data.coord_lat}
                  lng={this_data.coord_lng}
                  name={
                    "Time: " +
                    this_data.occure_time +
                    " \nStrength: " +
                    this_data.strength
                  }
                  color="red"
                  tooltip={this_data.name + "\n" + this_data.place}
                />
                <Circle
                  key={index}
                  defaultCenter={{
                    lat: 21,
                    lng: 105,
                  }}
                  radius={30000}
                  options={{
                    strokeColor: "#0022ff",
                    fillColor: "#0099ff",
                    fillOpacity: 0.1,
                  }}
                />
              </div>
              // <MarkerPin
              //   lat={this_data.coord_lat}
              //   lng={this_data.coord_lng}
              //   name={"Time: " + this_data.occure_time + " \nStrength: " + this_data.strength}
              //   color="red"
              //   tooltip={this_data.name + "\n" + this_data.place}
              // />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
