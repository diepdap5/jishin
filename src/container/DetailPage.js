import "antd/dist/antd.css";
import "../App.css";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Table, Tag} from "antd";
import React from "react";
import MapTemp from "./MapTemp";
import {Circle} from "react-google-maps";
import PageHeader from '../component/PageHeader/PageHeader';

const {  Content, Footer } = Layout;
function changeDate(this_date) {
  var return_date = '';
    return_date = this_date.getHours().toString() + ":" +
                  this_date.getMinutes().toString() + ":" +
                  this_date.getSeconds().toString() + " " +
                  this_date.getDate().toString() + "/" +
                  this_date.getMonth().toString() + "/" +
                  this_date.getFullYear().toString() ;

    return return_date;
}
class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      config_center: {
        lat: null,
        lng: null,
      },
    };
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
    const noti = [
      {
        id: "6",
        occure_time: 1606227521,
        place: "Thai Binh, Viet Nam",
        strength: 5.0,
        coord_lat: 20.444252,
        coord_long: 106.317358,
      },
    ];
    const data_jishin = noti.map((obj) => {
      let timeLeft = "";
      const difference = obj.occure_time - Date.now()/1000;
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
        occure_time: `${changeDate(new Date(obj.occure_time * 1000))} ${
          timeLeft ? "- " + timeLeft : ""
        }`,
        place: obj.place,
        strength: obj.strength,
        coord_lat: obj.coord_lat,
        coord_lng: obj.coord_long,
      };
    });

    const columns = [
      {
        title: "場所",
        dataIndex: "place",
        key: "jishin_place",
      },
      {
        title: "起きる時間",
        dataIndex: "occure_time",
        key: "jishin_occure_time",
      },
      {
        title: "震度",
        dataIndex: "strength",
        key: "strength",
        render: (text) => <Tag color="red">{text}</Tag>,
      },
    ];
    return (
      <Router>
          <Layout style={{background: "#FFFFFF"}}>
          <PageHeader title="地震情報" alert={false} />
          <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
            <div>
              <Switch>
                <Route path="/">
                  <MapTemp
                    pagename={this.props.pagename}
                    default_center={this.props.user_location}
                    config_center={config_center}
                    earthquake_data={data_jishin}
                  />
                  <Circle
                    defaultCenter={{
                      lat: parseFloat(data_jishin.coord_lat),
                      lng: parseFloat(data_jishin.coord_lng)
                    }}
                    radius={3000}
                    blue="red"
                    // options={place.circle.options}
                  />
                </Route>
              </Switch>
            </div>
          </Content>
          <Table
            columns={columns}
            dataSource={data_jishin}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
          <Footer style={{ textAlign: "center", background: "#ffffff"}}>開発チーム・花火</Footer>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(DetailPage);
