import "antd/dist/antd.css";
import { Layout, Table } from "antd";
import { Component } from "react";
import MapTemp from "../MapTemp";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import {getDistance, getDistrict, getCity, getAddress} from "../../component/ForGetTable/getData";
const { Header, Content, Footer } = Layout;
class ShelterDetail extends Component {
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

  getShelterDetail=(user_id) => {
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
        title: "場所の名前",
        dataIndex: "name",
        key: "shelter_name",
      },
      {
        title: "場所",
        dataIndex: "place",
        key: "shelter_place",
      },
      {
        title: "地区",
        dataIndex: "district",
        key: "district",
      },
      {
        title: "都市",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "距離 ( m )",
        dataIndex: "distance",
        key: "distance",
      },
    ];
    this.getShelterDetail(user_id);
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
              zoom ={20}
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
        <Footer style={{ textAlign: "center", background: "#FFFFFF" }}>開発チーム・花火</Footer>
      </div>
    );
  }
}
export default withRouter(ShelterDetail);
