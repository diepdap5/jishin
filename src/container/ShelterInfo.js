import "antd/dist/antd.css";
import "../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Table } from "antd";
import { HomeOutlined, NotificationOutlined } from "@ant-design/icons";
import ShelterInfo from "../container/ShelterInfo";
import { Component } from "react";
import MapTemp from "./MapTemp";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
class ShelterPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    shelters: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false
  }

  componentDidMount() {
    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/shelter`)
      .then((res) => {
        const shelters = res.data.map((obj) => ({
          id: obj.id,
          name: obj.name,
          place: obj.place,
          coord_lat: obj.coord_lat,
          coord_long: obj.coord_long,
        }));
        this.setState({ shelters });
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
    const { shelters, pagination, loading } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'place'
      }
    ];
    return (
      <div>
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
        避難所情報
      </Header>
      <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
        <div>
          <MapTemp pagename={this.props.pagename} />
        </div>
      </Content>

      <Table
        columns={columns}
        dataSource={shelters}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
      <Footer style={{ textAlign: "center" }}>Design by Hanabi</Footer>
      </div>
    // </Layout>
      
    );
  }
}

export default ShelterPage;
