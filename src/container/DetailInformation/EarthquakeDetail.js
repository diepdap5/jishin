import "antd/dist/antd.css";
import "../../App.css";
import { Layout, Table } from "antd";
import { Component } from "react";
import MapTemp from "../MapTemp";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import {getDistance, getDistrict, getCity, getAddress} from "../../component/ForGetTable/getData";


const { Header, Content, Footer } = Layout;


class EarthquakeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      loading: false,
      config_center: {
        lat: null,
        lng: null,
      },
      pagination: {
        current: 1,
        pageSize: 3,
      },
    };
  }

  componentDidMount() {
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
            this.props.user_location.lat,
            this.props.user_location.lng
          ).toFixed(4),
        }));
        let places = shelters;
        this.setState({ places });
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
            this.props.user_location.lat,
            this.props.user_location.lng
          ).toFixed(4),
        }));
        let places = this.state.places;
        places = places.concat(buildings);
        places.sort(function(a,b) {return a.distance - b.distance;});
        // places = places.slice(0,3);
        this.setState({ places });
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

  handleCenterLocation = (x, y) => {
    this.setState({
      config_center: {
        lat: x,
        lng: y,
      },
    });
  }

  selectRow = (record) => {
    this.handleCenterLocation(record.coord_lat, record.coord_lng);
    window.location.href = "#";
  }

  render() {
    const { pagination,places, loading, config_center } = this.state;
    const user_id = this.props.match.params.shelter_id;
    const columns = [
      {
        title: "場所の名前",
        dataIndex: "name",
        key: "place_name",
        render: text => {
          let id = places.find(x => x.name === text).id.split("_");
          if (id[0] === "shelter") return (<div><Link to={`/shelter/` + (id[1] -1).toString()}>{text}</Link></div>);
          else if (id[0] === "building") return (<div><Link to={`/building/` + (id[1] -1).toString()}>{text}</Link></div>);
        },
      },
      {
        title: "場所",
        dataIndex: "place",
        key: "place_address",
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
        defaultSortOrder: 'ascend',
        key: "distance",
        sorter: {
          compare: (a, b) => a.distance - b.distance,
          multiple: 1,
        },
      },
    ];

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
              data={places}
            />
          </div>
        </Content>

        <Table
          columns={columns}
          dataSource={places}
          loading={loading}
          pagination={pagination}
          onChange={this.handleTableChange}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
        />
        <Footer style={{ textAlign: "center", background: "#FFFFFF" }}>開発チーム・花火</Footer>
      </div>
      // </Layout>
    );
  }
}
export default withRouter(EarthquakeDetail);
