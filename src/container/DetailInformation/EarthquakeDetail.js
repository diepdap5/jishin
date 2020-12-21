import "antd/dist/antd.css";
import "../../App.css";
import { Layout, Table } from "antd";
import { Component } from "react";
import MapTemp from "../MapTemp";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import {getDistance, getDistrict, getCity, getAddress} from "../../component/ForGetTable/getData";


const { Header, Content, Footer } = Layout;
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

class EarthquakeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      loading: false,
      jishin:[],
      coord_des: {
        lat: null,
        lng: null,
      },
    };
  }
  getEQDetail=(user_id) => {
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
        this.setState({ jishin : [
          {
            id: jishins[user_id].id,
            occure_time: jishins[user_id].occure_time,
            place: jishins[user_id].place,
            strength: jishins[user_id].strength,
            coord_lat: jishins[user_id].coord_lat,
            coord_lng: jishins[user_id].coord_lng,

          },] });
        this.setState({coord_des:
            {
              lat: jishins[user_id].coord_lat,
              lng: jishins[user_id].coord_lng,
            }});
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
        places = places.slice(0,3);
        this.setState({ places });
      });
  }
  // componentDidMount() {
    
  // }

  handleTableChange = (pagination) => {
    this.setState({
      pagination: {
        ...pagination,
      },
    });
  };

  render() {
    const { places, loading, jishin, coord_des } = this.state;
    const user_id = this.props.match.params.earth_quake_id;
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
    this.getEQDetail(user_id);
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
              center={coord_des}
              user_location={this.props.user_location}
              data={places}
              earthquake_data={jishin}
            />
          </div>
        </Content>

        <Table
          columns={columns}
          dataSource={places}
          loading={loading}
          onChange={this.handleTableChange}
        />
        <Footer style={{ textAlign: "center", background: "#FFFFFF" }}>開発チーム・花火</Footer>
      </div>
      // </Layout>
    );
  }
}
export default withRouter(EarthquakeDetail);
