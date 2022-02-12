import Chart from "../../components/chart/Chart";
import "./home.css";
// import { userData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import WidgetLg from "../../components/widgetLg/WidgetLg"
import WidgetSm from "../../components/widgetSm/WidgetSm";
import React, { Component } from 'react'
import axios from "axios";
import Recomendation from "../../components/recomendation/Recomendation";

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      // runtime
      runtimes:[], 

      // anomaly info 
      asset:"",
      sensors:"",
      title:"",
      anomaly_count:0,
      percentage:0,
      first:"",
      last:"",
      severity:[],
      recomendations:[]
    }
  }

  async componentDidMount(){
    const url_info= 'http://127.0.0.1:5000/api/anomaly-info/Cooling%20Loss-1'
    const url_runtime = 'http://127.0.0.1:5000/api/runtime/Cooling%20Loss/1-1'
    const response = await axios.get(url_info);
    const response2 = await axios.get(url_runtime);
    console.log(response)
    console.log(response2)
    this.setState({
      // runtime
      runtimes: response2.data.results.results,
      // anomaly info
      title: response.data.results.fault+" Problem",
      anomaly_count: response.data.results.anomaly_count,
      percentage:response.data.results.anomaly_percentage,
      first:response.data.results.first_occurence,
      last:response.data.results.last_occurence,
      severity:response.data.results.severity,
      asset: response.data.results.asset,
      sensors:response.data.results.sensors,
      // recomendations
      recomendations: response.data.results.recomendation
    })
  }

  render() {
    return (
      <div className="home">
        <FeaturedInfo title={this.state.title} first={this.state.first} last={this.state.last} count={this.state.anomaly_count} percentage={this.state.percentage} 
        asset={this.state.asset} sensors={this.state.sensors} severity={this.state.severity}/>
        <Recomendation datas={this.state.recomendations}/>
        <Chart datas={this.state.runtimes} grid />
        {/* <div className="homeWidgets">
          <WidgetSm/>
          <WidgetLg/>
        </div> */}
      </div>
    )
  }
}


// export default function Home() {
//   return (
//     <div className="home">
//       {/* <FeaturedInfo /> */}
//       <Chart data={userData} title="Local Bearing Problem" grid dataKey="priority"/>
//       <div className="homeWidgets">
//         {/* <WidgetSm/>
//         <WidgetLg/> */}
//       </div>
//     </div>
//   );
// }
