import Chart from "../../components/chart/Chart";
import "./home.css";
// import { userData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import { Link } from "react-router-dom";
import React, { Component } from 'react'
import axios from "axios";
import Recomendation from "../../components/recomendation/Recomendation";
import Loading from "../../components/loading/Loading";
import menuItems from "../../menuItems.json"


export default class Home extends Component {

  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      // home
      asset_id:"props.match.params.id",
      loading:false,
      // runtime
      runtimes:[], 

      // anomaly info 
      asset:"",
      sensors:[],
      _sensors:[],
      title:"",
      anomaly_count:0,
      percentage:0,
      first:"",
      last:"",
      priority:[],
      recomendations:[]
    }
  }

  findInSchema(o, id) {
    let i;
    if (id === undefined){ 
      return undefined
    }
    else{
      for (i of o) {
        if(i.id==id){
          return i;
        } else if(i.components.length>0){
          const inComponents = this.findInSchema(i.components,id);
          if (typeof(inComponents) != "undefined") return inComponents;
        }
      }
    }
  }

  async componentDidMount(){
    this.setState({
      loading:true
    })
    let host = ''
    let anomaly = this.props.anomaly
    let asset_id= undefined
    if (this.props.match?.params.id!=='undefined'){
      asset_id = this.props.location ? this.props.location.state.asset_id : this.findInSchema(menuItems, this.props.match?.params.id);
    }
    // const asset_id = this.props.match?.params.id
    console.log(asset_id)
    console.log(process.env.NODE_ENV, process.env.REACT_APP_HOST_DEV, process.env.REACT_APP_HOST_PROD)
    if (process.env.NODE_ENV!=='production'){
      host = process.env.REACT_APP_HOST_DEV
    }
    else{host = process.env.REACT_APP_HOST_PROD}
    if (asset_id!==undefined){
      const url_info= 'http://'+host+'/api/anomaly-info/'+anomaly+'-'+asset_id
      const url_runtime = 'http://'+host+'/api/runtime/'+anomaly+'/'+asset_id+'-500'
      const response = await axios.get(url_info);
      const response2 = await axios.get(url_runtime);
      console.log(response)
      console.log(response2)
      this.setState({
        asset_id:asset_id,
        // runtime
        runtimes: response2.data.results,
        // anomaly info
        title: response.data.fault+" Problem",
        anomaly_count: response.data.anomaly_count,
        percentage:response.data.anomaly_percentage,
        first:response.data.first_occurence,
        last:response.data.last_occurence,
        priority:response.data.severity,
        asset: response.data.asset,
        sensors:response.data.sensors,
        _sensors:response.data._sensors,
        // recomendations
        recomendations: response.data.recomendation
      })
      this.setState({
        loading:false
      })
    }
  }

  async componentDidUpdate(prevProps){
    if (prevProps.anomaly !== this.props.anomaly){
      this.componentDidMount()
    } 
  }

  render() {
    return (
      this.props.anomaly?
      <div className="home">
        {
          this.state.loading?
          <p>loading...</p>
          // <Loading />
          :
          <div>
            <FeaturedInfo asset_id={this.state.asset_id} title={this.state.title} first={this.state.first} last={this.state.last} count={this.state.anomaly_count} percentage={this.state.percentage} 
            asset={this.state.asset} sensors={this.state.sensors} _sensors={this.state._sensors} priority={this.state.priority}/>
            <Recomendation datas={this.state.recomendations}/>
            <Chart datas={this.state.runtimes} grid priority={this.state.priority}/>
          </div>
        }
        {/* <div className="homeWidgets">
          <WidgetSm/>
          <WidgetLg/>
        </div> */}
      </div>
      :
      <div className="home">
        <ul>
          <Link to="/cooling-loss" >
            <li>
              Cooling Loss
            </li>
          </Link>
          <Link to="/local-bearing">
            <li>
              Local Bearing
            </li>
          </Link>
        </ul>
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
