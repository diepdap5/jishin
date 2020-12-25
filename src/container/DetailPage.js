// import "antd/dist/antd.css";
// import "../App.css";
// import { withRouter } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Layout, Table, Tag, Button } from "antd";
// import { Component } from "react";
// import MapTemp from "./MapTemp";
// import axios from "axios";
// import { NotificationOutlined } from "@ant-design/icons";
// const { Header, Content, Footer } = Layout;
// function changeDate(this_date) {
//   var return_date = "";
//   return_date =
//     this_date.getHours().toString() +
//     ":" +
//     this_date.getMinutes().toString() +
//     ":" +
//     this_date.getSeconds().toString() +
//     " " +
//     this_date.getDate().toString() +
//     "/" +
//     this_date.getMonth().toString() +
//     "/" +
//     this_date.getFullYear().toString();

//   return return_date;
// }
// class DetailPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: [],
//       // noti: [],
//       loading: false,
//       config_center: {
//         lat: null,
//         lng: null,
//       },
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/log")
//       .then((res) => {
//         const posts = res.data.map((obj) => {
//           let timeLeft = "";
//           const difference = obj.occure_time - Date.now() / 1000;
//           if (difference > 0) {
//             if (difference > 24 * 60 * 60)
//               timeLeft = `${Math.floor(difference / 24 / 60 / 60)} days left`;
//             else if (difference > 60 * 60)
//               timeLeft = `${Math.floor(difference / 60 / 60)} hours left`;
//             else if (difference > 60)
//               timeLeft = `${Math.floor(difference / 60)} minutes left`;
//             else timeLeft = `${difference} seconds left`;
//           }
//           return {
//             id: obj.id,
//             occure_time: `
//             ${changeDate(new Date(obj.occure_time * 1000))} ${
//               timeLeft ? "- " + timeLeft : ""
//             }`,
//             place: obj.place,
//             strength: obj.strength,
//             coord_lat: obj.coord_lat,
//             coord_lng: obj.coord_long,
//           };
//         });
//         this.setState({ posts });
//       });
//   }

//   handleTableChange = (pagination) => {
//     this.setState({
//       pagination: {
//         ...pagination,
//       },
//     });
//   };

//   render() {
//     const { posts, pagination, loading, config_center } = this.state;
//     var i = 0;
//     var noti = [];
//     for (i = 0; i < posts.length - 1; i++) {
//       noti[i] = posts[i+4];
//     }
//     // var noti = [];
//     // noti[0] = posts[4];
//     const columns = [
//       {
//         title: "Location",
//         dataIndex: "place",
//         key: "jishin_place",
//       },
//       {
//         title: "Occured time",
//         dataIndex: "occure_time",
//         key: "jishin_occure_time",
//       },
//       {
//         title: "Strength",
//         dataIndex: "strength",
//         key: "strength",
//         render: (text) => <Tag color="red">{text}</Tag>,
//       },
//     ];
//     return (
//       <Router>
//         <Layout style={{ background: "#FFFFFF" }}>
//           <Header
//             className="site-layout-sub-header-background"
//             style={{
//               padding: 0,
//               textAlign: "center",
//               fontSize: "30px",
//               color: "black",
//               background: "#FFE3F2",
//             }}
//           >
//             <span>地震情報</span>
//             <Button
//               style={{
//                 left: 510,
//                 width: 10,
//                 background: "#FFE3F2",
//                 border: "yellow",
//               }}
//               icon={<NotificationOutlined style={{ fontSize: "30px" }} />}
//               size="large"
//             ></Button>
//           </Header>
//           <Content style={{ margin: "24px 16px 0", minHeight: "800px" }}>
//             <div>
//               <Switch>
//                 <Route path="/detail/noti">
//                   <MapTemp
//                     pagename={this.props.pagename}
//                     default_center={this.props.user_location}
//                     config_center={config_center}
//                     data={noti}
//                   />
//                 </Route>
//               </Switch>
//             </div>
//           </Content>
//           <Table
//             columns={columns}
//             dataSource={noti}
//             pagination={pagination}
//             loading={loading}
//             onChange={this.handleTableChange}
//           />
//           <Footer style={{ textAlign: "center", background: "#ffffff" }}>
//             Design by Hanabi
//           </Footer>
//         </Layout>
//       </Router>
//     );
//   }
// }

// export default withRouter(DetailPage);
import "antd/dist/antd.css";
import "../App.css";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Table, Tag, Button } from "antd";
import React from "react";
import MapTemp from "./MapTemp";
import { NotificationOutlined } from "@ant-design/icons";
import {Circle} from "react-google-maps";
import PageHeader from '../component/PageHeader/PageHeader';

const { Header, Content, Footer } = Layout;
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
                    data={data_jishin}
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
          <Footer style={{ textAlign: "center", background: "#ffffff"}}>Design by Hanabi</Footer>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(DetailPage);
