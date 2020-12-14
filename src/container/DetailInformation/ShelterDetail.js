import "antd/dist/antd.css";
import { Layout, Table } from "antd";
import { Component } from "react";
import MapTemp from "../MapTemp";
import axios from "axios";
import { withRouter } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
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

var getDistrict = function (place) {
  var place_list = place.split(",");
  var district = " ";
  district = place_list[place_list.length - 3];
  return district;
};
var getCity = function (place) {
  var place_list = place.split(",");
  var city = "";
  city = place_list[place_list.length - 2];
  return city;
};
var getAddress = function (place) {
  var place_list = place.split(",");
  var address = "";
  address = place_list[0];
  return address;
};
class BuildingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelters: [],
      pagination: {
        current: 1,
        pageSize: 3,
      },
      loading: false,
      config_center: {
        lat: null,
        lng: null,
      },
      coord_des: {
        lat: null,
        lng: null,
      },
      shelter: [],
    };
  }

  getBuildingDetail=(user_id) => {
    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/shelter`)
      .then((res) => {
        const shelters = res.data.map((obj) => ({
          id: obj.id,
          name: obj.name,
          place: getAddress(obj.place),
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_lng,
          district: getDistrict(obj.place),
          city: getCity(obj.place),
          distance: getDistance(
            obj.coord_lat,
            obj.coord_lng,
            this.props.user_location.lat,
            this.props.user_location.lng
          ).toFixed(4),
        }));
        this.setState({ shelter : [
          {
            id: shelters[user_id].id,
            name: shelters[user_id].name,
            place: shelters[user_id].place,
            coord_lat: shelters[user_id].coord_lat,
            coord_lng: shelters[user_id].coord_lng,
            district: shelters[user_id].district,
            city: shelters[user_id].city,
            distance: shelters[user_id].distance,
          },] });
          this.setState({coord_des:
            {
              lat: shelters[user_id].coord_lat,
              lng: shelters[user_id].coord_lng,
            }});
      });
      console.log(this.state.coord_des);
    

  }
  handleTableChange = (pagination) => {
    this.setState({
      pagination: {
        ...pagination,
      },
    });
  };
  render() {
    
    const { pagination, loading, config_center } = this.state;
    const user_id = this.props.match.params.shelter_id;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "shelter_name",
      },
      {
        title: "Place",
        dataIndex: "place",
        key: "shelter_place",
      },
      {
        title: "District",
        dataIndex: "district",
        key: "district",
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "Distance (Unit: m )",
        dataIndex: "distance",
        key: "distance",
      },
    ];
    this.getBuildingDetail(user_id);
    return (
      <div style={{ background: "#FFFFFF" }}>
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
          避難所情報
        </Header>
        <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
          <div>
            <MapTemp
              pagename={this.props.pagename}
              default_center={this.props.user_location}
              config_center={config_center}
              data={this.state.shelter}
              destination = {this.state.coord_des}
              zoom ={15}
            />
          </div>
        </Content>

        <Table
          columns={columns}
          dataSource={this.state.shelter}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
        <Footer style={{ textAlign: "center", background: "#FFFFFF" }}>Design by Hanabi</Footer>
      </div>
      // </Layout>
    );
  }
}
export default withRouter(BuildingDetail);