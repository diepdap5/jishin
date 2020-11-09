// import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Shelters from '../component/ForShelter/Shelters'


class ShelterInfo extends Component { 

  render (){
      return (
        <Shelters/>
      );
    }
}

export default ShelterInfo;