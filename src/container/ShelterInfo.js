import "antd/dist/antd.css";
import "../App.css";
import { Layout, Table, Button } from "antd";
import { Component } from "react";
import MapTemp from "./MapTemp";
import axios from "axios";
const { Header, Content, Footer } = Layout;
class ShelterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      pagination: {
        current: 1,
        pageSize: 5,
      },
      loading: false,
      config_center: {
        lat: null,
        lng: null
      }
    }
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
          coord_lng: obj.coord_lng,
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
  handleChangeMap = () => {
    this.setState({
      config_center: {
        lat: 23,
        lng: 105
      }
    });
  }
  render() {
    const { shelters, pagination, loading, config_center } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'shelter_name',
      },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'shelter_place'
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
          }}
        >
          避難所情報
      </Header>
        <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
          <div>
            <Button type="primary" onClick={this.handleChangeMap}>ClickMe</Button>
            <MapTemp
              pagename={this.props.pagename}
              default_center={this.props.user_location}
              config_center={config_center} />
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
