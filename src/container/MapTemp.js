// import logo from './logo.svg';
import React, { Component } from 'react';

import '../App.css';
import SimpleMap from '../component/ForMapTemp/Map'
import axios from "axios";

class MapTemp extends Component {
  state = {
    data: [],
  }
  componentDidMount() {
    if (this.props.data === 'shelter') {
      axios
        .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/shelter`)
        .then((res) => {
          const data = res.data.map((obj) => ({
            id: obj.id,
            name: obj.name,
            place: obj.place,
            coord_lat: obj.coord_lat,
            coord_lng: obj.coord_lng,
          }));
          this.setState({ data });
        });
    }
    else if (this.props.data === 'jishin'){
      axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/log`)
      .then((res) => {
        const data = res.data.map((obj) => ({
          id: obj.id,
          occure_time: obj.occure_time,
          place: obj.place,
          strength: obj.strength,
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_long,
        }));
        this.setState({ data });
      });
    }
  }
  render() {
    return (
      <div className="App">
        <SimpleMap 
        center={this.props.config_center.lat == null ? this.props.default_center : this.props.config_center} 
        data = {this.state.data}/>
      </div>
    );
  }

}

export default MapTemp;
