// import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HomeOutlined, NotificationOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

import "antd/dist/antd.css";
import './App.css';
import ShelterPage from './container/ShelterInfo';
import LogPage from './container/LogPage';
const { Sider } = Layout;
require('dotenv').config()

class App extends Component {
  state = {
    user_location: {
      lat: process.env.DEFAULT_LATITUDE,
      lng: process.env.DEFAULT_LONGTITUDE
    },
    zoom: process.env.DEFAULT_ZOOM
  }
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          user_location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      }
    );
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
                  style={{ background: '#FFE3F2' }}
                >
                  <div className="logo" />
                  <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} style={{ background: '#FFE3F2' }}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                      <Link to="/">地震情報</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<NotificationOutlined />}>
                      <Link to="/shelter">避難所情報</Link>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Route exact path="/">
                    <LogPage user_location={this.state.user_location} />
                  </Route>
                  <Route exact path="/shelter">
                    <ShelterPage user_location={this.state.user_location} />
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
