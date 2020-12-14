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
// import DetailPage from "./container/DetailInformation/EarthQuakeDetail"
import BuildingDetail from "./container/DetailInformation/BuildingDetail";
import SignUp from "./component/SignUp/SignUp";
import Login from "./component/Login/Login";
const { Sider } = Layout;
require("dotenv").config();

const { SubMenu } = Menu;
class App extends Component {
  state = {
    user_location: {
      lat: process.env.REACT_APP_DEFAULT_LATITUDE,
      lng: process.env.REACT_APP_DEFAULT_LONGTITUDE,
    },
    zoom: process.env.REACT_APP_DEFAULT_ZOOM,
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
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                      <Link to="/">地震情報</Link>
                    </Menu.Item>
                    <SubMenu key="2" icon={<NotificationOutlined />} title="避難所" style={{ background: "#FFE3F2" }} >
                      <Menu.Item key="shelter" icon={<MdPlace />}  ><Link to="/shelter">避難所情報</Link></Menu.Item>
                      <Menu.Item key="building" icon={<FaBuilding />}   ><Link to="/building">建物情報</Link></Menu.Item>
                    </SubMenu>
                  </Menu>
                  <Login />
                  <SignUp />
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                  <Route exact path="/">
                    <LogPage user_location={this.state.user_location} />
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
                  {/* <Route path="/building/:building_id" component={BuildingDetail}/> */}
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
