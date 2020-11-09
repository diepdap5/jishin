import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import {Table} from 'react-bootstrap'

class ShelterTable extends React.Component {

    render() {
      var onShelterTableUpdate = this.props.onShelterTableUpdate;
      var shelter = this.props.shelters.map(function(shelter) {
        return (<ShelterRow onShelterTableUpdate={onShelterTableUpdate} shelter={shelter}  key={shelter.id}/>)
      });

      return (  
        <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
          <Table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>避難所の位置</th>
                <th>場所</th>
                <th>距離</th>
              </tr>
            </thead>
  
            <tbody>
              {shelter}
            </tbody>
  
          </Table>
        </div>
      );
    }

}

export default ShelterTable;

class ShelterRow extends React.Component {

    render() {
      return (
        <tr className="eachRow">
            <td>
            {this.props.shelter.id}
            </td>
            <td>
            {this.props.shelter.name}
            </td>
            <td>
            {this.props.shelter.address}
            </td>
            <td>
            0m
            </td>
        </tr>
      );
    }

}