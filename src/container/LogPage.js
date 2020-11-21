import "antd/dist/antd.css";
import "../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Table, Tag, Button, Dropdown, Menu } from "antd";
import ShelterInfo from "../container/ShelterInfo";
import { Component } from "react";
import MapTemp from "./MapTemp";
import axios from "axios";
import { NotificationOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/detail/6">
        <button
          style={{
            background: "white",
            border: "white",
          }}
          onClick={() => window.location.reload(false)}
        >
          New earthquake announcement: Thai Binh, Viet Nam
        </button>
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" disabled>
      New earthquake announcement:Tokyo, Japan
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" disabled>
      New earthquake announcement:New York, United States
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>
      New earthquake announcement:Mexico City, Mexico
    </Menu.Item>
  </Menu>
);
class LogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
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
<<<<<<< HEAD
    axios
      .get("https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/log")
      .then((res) => {
        const posts = res.data.map((obj) => {
          let timeLeft = "";
          const difference = obj.occure_time - Date.now();
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
            occure_time: `${new Date(obj.occure_time * 1000).toString()} ${
              timeLeft ? "- " + timeLeft : ""
            }`,
            place: obj.place,
            strength: obj.strength,
            coord_lat: obj.coord_lat,
            coord_lng: obj.coord_long,
          };
        });
        this.setState({ posts });
=======
    axios.get('https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/log').then((res) => {
      const posts = res.data.map((obj) => {
        let timeLeft = '';
        const difference = obj.occure_time - Date.now()/ 1000;
        if (difference > 0) {
          if (difference > 24 * 60 * 60) timeLeft = `${Math.floor(difference / 24 / 60 / 60)} days left`;
          else if (difference > 60 * 60) timeLeft = `${Math.floor(difference / 60 / 60)} hours left`;
          else if (difference > 60) timeLeft = `${Math.floor(difference / 60)} minutes left`;
          else timeLeft = `${difference} seconds left`;
        }
        return {
          id: obj.id,
          occure_time: `${new Date(obj.occure_time * 1000).toString()} ${timeLeft ? '- ' + timeLeft : ''}`,
          place: obj.place,
          strength: obj.strength,
          coord_lat: obj.coord_lat,
          coord_long: obj.coord_long
        };
>>>>>>> occure.time
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
        lat: 22,
        lng: 105,
      },
    });
  };

  render() {
    const { posts, pagination, loading, config_center } = this.state;
    const columns = [
      {
        title: "Location",
        dataIndex: "place",
        key: "jishin_place",
      },
      {
        title: "Occured time",
        dataIndex: "occure_time",
        key: "jishin_occure_time",
      },
      {
        title: "Strength",
        dataIndex: "strength",
        key: "strength",
        render: (text) => <Tag color="red">{text}</Tag>,
      },
    ];
    return (
      <Router>
        <Layout>
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
            <span>地震情報</span>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button
                style={{
                  left: 510,
                  width: 10,
                  background: "#FFE3F2",
                  border: "yellow",
                }}
                icon={<NotificationOutlined style={{ fontSize: "30px" }} />}
                size="large"
              >
                <span className="badge ">1</span>
                {/* bottomRight */}
              </Button>
            </Dropdown>
          </Header>
          <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
            <div>
              <Switch>
                <Route path="/shelter-details">
                  <ShelterInfo />
                </Route>
                <Route path="/">
                  <Button type="primary" onClick={this.handleChangeMap}>
                    ClickMe
                  </Button>
                  <MapTemp
                    pagename={this.props.pagename}
                    default_center={this.props.user_location}
                    config_center={config_center}
                    data={posts}
                  />
                </Route>
              </Switch>
            </div>
          </Content>
          <Table
            columns={columns}
            dataSource={posts}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
          <Footer style={{ textAlign: "center" }}>Design by Hanabi</Footer>
        </Layout>
      </Router>
    );
  }
}

export default LogPage;
