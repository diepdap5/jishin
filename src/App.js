// import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { HomeOutlined, NotificationOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { FaBuilding} from "react-icons/fa";
import { MdPlace} from "react-icons/md";
import "antd/dist/antd.css";
import "./App.css";
import ShelterPage from "./container/ShelterPage";
import BuildingPage from "./container/BuildingPage";
import LogPage from "./container/LogPage";
import DetailPage from "./container/DetailPage";
import BuildingDetail from "./container/DetailInformation/BuildingDetail";
import ShelterDetail from "./container/DetailInformation/ShelterDetail";
import EarthquakeDetail from "./container/DetailInformation/EarthquakeDetail";
import SignUp from "./component/SignUp/SignUp";
import Login from "./component/Login/Login";
import axios from "axios";
import {getDistance, getDistrict, getCity, getAddress} from "./component/ForGetTable/getData";
const { Sider } = Layout;
require("dotenv").config();

const { SubMenu } = Menu;
function changeDate(this_date) {
  var return_date = "";
  return_date =
    this_date.getHours().toString() +
    ":" +
    this_date.getMinutes().toString() +
    ":" +
    this_date.getSeconds().toString() +
    " " +
    this_date.getDate().toString() +
    "/" +
    this_date.getMonth().toString() +
    "/" +
    this_date.getFullYear().toString();

  return return_date;
}
class App extends Component {
  state = {
    user_location: {
      lat: process.env.REACT_APP_DEFAULT_LATITUDE,
      lng: process.env.REACT_APP_DEFAULT_LONGTITUDE,
    },
    zoom: process.env.REACT_APP_DEFAULT_ZOOM,
    jishins: [],
    places: [],
    shelters: [],
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        user_location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/log`)
      .then((res) => {
        const jishins = res.data.map((obj) => {
          let timeLeft = "";
          const difference = obj.occure_time - Date.now() / 1000;
          if (difference > 0) {
            if (difference > 24 * 60 * 60)
              timeLeft = `${Math.floor(difference / 24 / 60 / 60)} days left`;
            else if (difference > 60 * 60)
              timeLeft = `${Math.floor(difference / 60 / 60)} hours left`;
            else if (difference > 60)
              timeLeft = `${Math.floor(difference / 60)} minutes left`;
            else timeLeft = `${difference} seconds left`;
          }
          return {
            id: obj.id,
            occure_time: `
            ${changeDate(new Date(obj.occure_time * 1000))} ${timeLeft ? "- " + timeLeft : ""
              }`,
            place: obj.place,
            strength: obj.strength,
            coord_lat: obj.coord_lat,
            coord_lng: obj.coord_long,
          };
        });
        this.setState({ jishins });
      });
      axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/shelter`)
      .then((res) => {
        const shelters = res.data.map((obj) => ({
          id: "shelter_" + obj.id,
          name: obj.name,
          place: getAddress(obj.place),
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_lng,
          district: getDistrict(obj.place),
          city: getCity(obj.place),
          distance: getDistance(
            obj.coord_lat,
            obj.coord_lng,
            this.state.user_location.lat,
            this.state.user_location.lng
          ).toFixed(4),
        }));
        // let places = shelters;
        this.setState({ shelters });
      });

    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/building`)
      .then((res) => {
        const buildings = res.data.map((obj) => ({
          id: "building_" + obj.id,
          name: obj.name,
          place: obj.place,
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_lng,
          district: getDistrict(obj.place),
          city: getCity(obj.place),
          distance:getDistance(
            obj.coord_lat,
            obj.coord_lng,
            this.state.user_location.lat,
            this.state.user_location.lng
          ).toFixed(4),
        }));
        // let places = this.state.places;
        let places = this.state.shelters.concat(buildings);
        places.sort(function(a,b) {return a.distance - b.distance;});
        places = places.slice(0,3);
        this.setState({ places });
      });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/">
              <Layout>
                <Sider
                  breakpoint="lg"
                  collapsedWidth="0"
                  onBreakpoint={(broken) => {
                    console.log(broken);
                  }}
                  onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                  }}
                  theme="light"
                  style={{ background: "#FFE3F2" }}
                >
                  <div className="logo" />
                  <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    style={{ background: "#FFE3F2" }}
                  >
                    <Menu.Item key="1" icon={<HomeOutlined />}> <Link to="/">地震</Link></Menu.Item>
                    <SubMenu key="2" icon={<NotificationOutlined />} title="避難所" style={{ background: "#FFE3F2" }} >
                      <Menu.Item key="shelter" icon={<MdPlace />}  ><Link to="/shelter">避難所情報</Link></Menu.Item>
                      <Menu.Item key="building" icon={<FaBuilding />}   ><Link to="/building">建物情報</Link></Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                  <Route exact path="/">
                    <LogPage user_location={this.state.user_location} />
                  </Route>
                  <Route exact path="/earth_quake/:earth_quake_id">
                    <EarthquakeDetail user_location={this.state.user_location} jishins={this.state.jishins} places={this.state.places} />
                  </Route>
                  <Route exact path="/shelter">
                    <ShelterPage user_location={this.state.user_location} />
                  </Route>
                  <Route exec path="/detail/noti">
                    <DetailPage user_location={this.state.user_location} />
                  </Route>
                  <Route exact path="/building">
                    <BuildingPage user_location={this.state.user_location} />
                  </Route>
                  <Route exact path="/building/:building_id">
                    <BuildingDetail user_location={this.state.user_location} />
                  </Route>
                  <Route exact path="/shelter/:shelter_id">
                    <ShelterDetail user_location={this.state.user_location} />
                  </Route>
                </Layout>
              </Layout>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
