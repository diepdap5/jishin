import "antd/dist/antd.css";
import "../App.css";
import { Layout, Table, Col, Row } from "antd";
import { Component } from "react";
import MapTemp from "./MapTemp";
import axios from "axios";
import SearchField from "react-search-field";
import { Link } from "react-router-dom";
import { getDistance } from "../component/ForGetTable/getData";
import PageHeader from '../component/PageHeader/PageHeader';

const { Content, Footer } = Layout;

class BuildingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      pagination: {
        current: 1,
        pageSize: 3,
      },
      loading: false,
      isauthe: false,
    };
  }

  componentDidMount() {
    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/building`)
      .then((res) => {
        const buildings = res.data.map((obj) => ({
          id: obj.id,
          name: obj.name,
          place: obj.place,
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_lng,
          distance: getDistance(
            obj.coord_lat,
            obj.coord_lng,
            this.props.user_location.lat,
            this.props.user_location.lng
          ).toFixed(4),
          fortification: obj.grade,
        }));
        this.setState({ buildings });
      });
    var loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      this.setState({ isauthe: true });
    }
  }

  handleTableChange = (pagination) => {
    this.setState({
      pagination: {
        ...pagination,
      },
    });
  };


  onChange = (value, event) => {
    axios
      .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/building`)
      .then((res) => {
        const buildings = res.data.filter(building => building.name.toLowerCase().includes(value.toLowerCase())).map((obj) => ({
          id: obj.id,
          name: obj.name,
          place: obj.place,
          coord_lat: obj.coord_lat,
          coord_lng: obj.coord_lng,
          distance: getDistance(
            obj.coord_lat,
            obj.coord_lng,
            this.props.user_location.lat,
            this.props.user_location.lng
          ).toFixed(4),
          fortification: obj.grade,
        }));
        this.setState({ buildings });
      });
  }

  render() {
    const { buildings, pagination, loading } = this.state;
    const columns = [
      {
        title: <div style={{fontSize: 25}}>場所の名前</div>,
        dataIndex: "name",
        key: "building_name",
        render: text => {
          if (this.state.isauthe === true){
            return (<div><Link to={`/building/` + (buildings.find(x => x.name === text).id - 1).toString()}>{text}</Link></div>);
          }
          else {
            return (<div>{text}</div>);
          }
        } 
      },
      {
        title: <div style={{fontSize: 25}}>場所</div>,
        dataIndex: "place",
        key: "building_place",
      },
      {
        title: <div style={{fontSize: 25}}>距離 ( m )</div>,
        dataIndex: "distance",
        key: "distance",
        defaultSortOrder: 'ascend',
        sorter: {
          compare: (a, b) => a.distance - b.distance,
          multiple: 1,
        },
      },
      {
        title: <div style={{fontSize: 25}}>防備レベル</div>,
        dataIndex: "fortification",
        key: "fortification",
        sorter: {
          compare: (a, b) => a.fortification - b.fortification,
          multiple: 1,
        },
      },
    ];

    return (
      <div style={{ background: "#FFFFFF" }}>
        <PageHeader title="建物情報" />
        <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
          <div>
            <MapTemp
              pagename={this.props.pagename}
              center={this.props.user_location}
              user_location={this.props.user_location}
              data={buildings}
            />
          </div>
        </Content>
        <Col >
          <Row >
            <Col span={24}>
              <SearchField
                placeholder="検索..."
                onChange={this.onChange}
                onClick={this.onChange}
                classNames="shelter-search"
              />
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={buildings}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}

          />
        </Col>
        <Footer style={{ textAlign: "center", background: "#FFFFFF" }}>開発チーム・花火</Footer>
      </div>
      // </Layout>
    );
  }
}
export default BuildingPage;
