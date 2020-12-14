import "antd/dist/antd.css";
import "../App.css";
import { Layout, Table, Button, Result } from "antd";
import { Component } from "react";
import MapTemp from "./MapTemp";
import axios from "axios";
import SearchField from "react-search-field";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;
var distance_building;
var rad = function (x) {
  return (x * Math.PI) / 180;
};

var getDistance = function (lat1, lng1, lat2, lng2) {
  var R = 6378137; // Earth's mean radius in meter
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

class BuildingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      pagination: {
        current: 1,
        pageSize: 3,
      },
      loading: false,
      config_center: {
        lat: null,
        lng: null,
      },
    };
  }

  componentDidMount() {
    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/building`)
      .then((res) => {
        const buildings = res.data.map((obj) => ({
          id: obj.id,
          name: obj.name,
          place: obj.place,
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_lng,
          distance:getDistance(
            obj.coord_lat,
            obj.coord_lng,
            this.props.user_location.lat,
            this.props.user_location.lng
          ).toFixed(4),
          fortification: obj.grade,
        }));
        this.setState({ buildings });
      });
  }

  handleTableChange = (pagination) => {
    this.setState({
      pagination: {
        ...pagination,
      },
    });
  };

  handleChangeMap = () => {
    this.setState({
      config_center: {
        lat: 23,
        lng: 105,
      },
    });
  };

  handleCenterLocation = (x, y) =>{
    this.setState({
      config_center: {
        lat: x,
        lng: y,
      },
    });
  }

  onChange = (value, event) => {
    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/building`)
      .then((res) => {
        const buildings = res.data.filter(building=>building.name.toLowerCase().includes(value.toLowerCase())).map((obj) => ({
          id: obj.id,
          name: obj.name,
          place: obj.place,
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_lng,
          distance:getDistance(
            obj.coord_lat,
            obj.coord_lng,
            this.props.user_location.lat,
            this.props.user_location.lng
          ).toFixed(4),
          fortification: obj.grade,
        }));
        this.setState({ buildings });
      });
  }

  selectRow = (record) => {
    this.handleCenterLocation(record.coord_lat, record.coord_lng);
    window.location.href = "#";
  }

  render() {
    const { buildings, pagination, loading, config_center } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "building_name",
      render: text => (<div><Link to={`/building/` + (buildings.find(x => x.name === text).id -1).toString()}>{text}</Link></div>),
      },
      {
        title: "Place",
        dataIndex: "place",
        key: "building_place",
      },
      {
        title: "Distance (Unit: m )",
        dataIndex: "distance",
        key: "distance",
        sorter: {
          compare: (a, b) => a.distance - b.distance,
          multiple: 1,
        },
      },
      {
        title: "Fortification level",
        dataIndex: "fortification",
        key: "fortification",
        sorter: {
          compare: (a, b) => a.fortification - b.fortification,
          multiple: 1,
        },
      },
    ];
    var i =0;
    var j;
    var tmp = {};
    for (i=0;i<buildings.length-1;i++){
      for(j=0;j<buildings.length-1-i;j++){
        if(buildings[j].distance>buildings[j+1].distance){
          tmp = buildings[j];
          buildings[j]=buildings[j+1];
          buildings[j+1]=tmp;
        }
      }
    }

    return (
      <div style={{background: "#FFFFFF"}}>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            textAlign: "center",
            fontSize: "30px",
            color: "black",
            background: "#FFE3F2",
          }}
        >
          建物情報
        </Header>
        <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
          <div>
            <MapTemp
              pagename={this.props.pagename}
              default_center={this.props.user_location}
              config_center={config_center}
              data={buildings}
            />
          </div>
        </Content>
        
        <SearchField
          placeholder="Search..."
          onChange={this.onChange}
          onClick={this.onChange}
          classNames="building-search"
        />

        <Table
          columns={columns}
          dataSource={buildings}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
        />
        <Footer style={{ textAlign: "center" , background: "#FFFFFF"}}>Design by Hanabi</Footer>
      </div>
      // </Layout>
    );
  }
}
export default BuildingPage;
