import "antd/dist/antd.css";
import "../../App.css";
import { Layout, Table } from "antd";
import { Component } from "react";
import MapTemp from "../MapTemp";
import { Link, withRouter } from "react-router-dom";
import effectData from "../../effect.json";
import PageHeader from '../../component/PageHeader/PageHeader';

const { Content, Footer } = Layout;
class EarthquakeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      loading: false,
      jishin: [],
      coord_des: {
        lat: null,
        lng: null,
      },
      destination_list: [],
    };
  }
  componentDidMount = () => {
    const user_id = parseInt(this.props.match.params.earth_quake_id);
    var jishins = this.props.jishins;
    console.log(this.props.jishins);
    console.log("haha");
    console.log(user_id);
    console.log(this.props.places);
    this.setState({
      jishin: [
        {
          id: jishins[user_id].id,
          occure_time: jishins[user_id].occure_time,
          place: jishins[user_id].place,
          strength: jishins[user_id].strength,
          coord_lat: jishins[user_id].coord_lat,
          coord_lng: jishins[user_id].coord_lng,

        },]
    });
    this.setState({
      coord_des:
      {
        lat: jishins[user_id].coord_lat,
        lng: jishins[user_id].coord_lng,
      }
    });
    this.setState({ destination_list: effectData[user_id].effect });
    
    console.log(effectData);
    console.log(effectData[0]);
    console.log(effectData[0].effect);
    console.log(this.state.destination_list);
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
    const { loading, jishin, coord_des } = this.state;

    const columns = [
      {
        title: <div style={{fontSize: 25}}>場所の名前</div>,
        dataIndex: "name",
        key: "place_name",
        render: text => {
          let id = this.props.places.find(x => x.name === text).id.split("_");
          if (id[0] === "shelter") return (<div><Link to={`/shelter/` + (id[1] - 1).toString()}>{text}</Link></div>);
          else if (id[0] === "building") return (<div><Link to={`/building/` + (id[1] - 1).toString()}>{text}</Link></div>);
        },
      },
      {
        title: <div style={{fontSize: 25}}>場所</div>,
        dataIndex: "place",
        key: "place_address",
      },
      {
        title: <div style={{fontSize: 25}}>地区</div>,
        dataIndex: "district",
        key: "district",
      },
      {
        title: <div style={{fontSize: 25}}>都市</div>,
        dataIndex: "city",
        key: "city",
      },
      {
        title: <div style={{fontSize: 25}}>距離 ( m )</div>,
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
        <PageHeader title="特別情報" />
        <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
          <div>
            <MapTemp
              pagename={this.props.pagename}
              center={coord_des}
              user_location={this.props.user_location}
              data={this.props.places}
              earthquake_data={jishin}
              destination_list={this.state.destination_list}
            />
          </div>
        </Content>

        <Table
          columns={columns}
          dataSource={this.props.places}
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
