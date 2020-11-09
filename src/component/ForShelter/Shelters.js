// import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ShelterTable from './ShelterTable';

class Shelters extends React.Component {

    constructor(props) {
        super(props);
    
        //  this.state.products = [];
        this.state = {};
        this.state.filterText = "";
        this.state.shelters = [
          {
            id: 1,
            name: '工科大学',
            address: '1 Đại Cồ Việt'
          }, {
            id: 2,
            name: 'ハノイ駅',
            address: 'Văn Miếu, Đống Đa, Hanoi'
          }, {
            id: 3,
            name: 'イオンモール Long Bien',
            address: '3rd fIoor, East Office, 27 Đ. Cổ Linh, Long Biên, Hà Nội'
          }
        ];
      }
  
    handleAddEvent(evt) {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var shelter = {
        id: id,
        name: "empty row",
        address: "empty row",
      }
      this.state.shelters.push(shelter);
      this.setState(this.state.shelters);
  
    }
  
    handleShelterTable(evt) {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var shelters = this.state.shelters.slice();
        var newShelters = shelters.map(function(shelter) {
            for (var key in shelter) {
                if (key == item.name && shelter.id == item.id) {
                    shelter[key] = item.value;
                }
            }
            return shelter;
        });
        this.setState({products:newShelters});
    };

    render() {
  
      return (
        <div>
          <ShelterTable onShelterTableUpdate={this.handleShelterTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} shelters={this.state.shelters} />
        </div>
      );
  
    }
  
  }

  export default Shelters;