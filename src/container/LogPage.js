import "antd/dist/antd.css";
import "../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Table, Tag } from "antd";
import { HomeOutlined, NotificationOutlined } from "@ant-design/icons";
import ShelterInfo from "../container/ShelterInfo";
import { Component } from "react";
import MapTemp from "./MapTemp";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
// ];
// var data = [];
class LogPage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   posts: [],
    //   pagination: {
    //     current: 1,
    //     pageSize: 5,
    //   },
    //   loading: false

    // };
  }
  state = {
    posts: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false
  }

  componentDidMount() {
    axios.get('https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/log').then((res) => {
      const posts = res.data.map((obj) => {
        let timeLeft = '';
        const difference = obj.occure_time - Date.now();
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
      });
      this.setState({ posts });
    });
  }
  handleTableChange = (pagination) => {
    this.setState({
      pagination: {
        ...pagination
      }
    });
  }

  render() {
    const { posts, pagination, loading } = this.state;
    const columns = [
      {
        title: 'Location',
        dataIndex: 'place',
        key: 'place',
      },
      {
        title: 'Occured time',
        dataIndex: 'occure_time',
        key: 'occure_time'
      },
      {
        title: 'Strength',
        dataIndex: 'strength',
        key: 'strength',
        render: text => <Tag color="red">{text}</Tag>
      }
    ];
    return (
      <Router>
        <Layout>
          {/* <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">地震情報</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<NotificationOutlined />}>
                <Link to="/shelter-details">避難所情報</Link>
              </Menu.Item>
            </Menu>
          </Sider> */}
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{
                padding: 0,
                textAlign: "center",
                fontSize: "30px",
                color: "black",
                background: "#FFE3F2"
              }}
            >
              地震情報
            </Header>
            <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
              <div>
                <Switch>
                  <Route path="/shelter-details">
                    <ShelterInfo />
                  </Route>
                  <Route path="/">
                    <MapTemp pagename={this.props.pagename} />
                    {/* <Table columns={columns} dataSource={this.state.posts} size="middle" /> */}
                    <ul>
                      {this.state.posts.map(function (post, index) {
                        return (
                          <div >
                            {/* <table>
                              <tr>
                                <th>{post.place}</th>
                                <td>{post.occure_time}</td>
                                <td>{post.strength}</td>
                              </tr>
                            </table> */}

                          </div>
                        );
                      })}
                    </ul>
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
        </Layout>
      </Router>
    );
  }
}

export default LogPage;
