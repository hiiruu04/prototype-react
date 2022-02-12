import { Divider } from "@material-ui/core";
import "./featuredInfo.css";

const FeaturedInfo=({title, count, percentage, first, last, asset, sensors, severity}) => {
    // console.log(sensors)
    return (
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Asset Information</span>
          <p>Asset: {asset.asset}</p>
          <p>Asset description: {asset.description}</p>
          <br />
          <p>List sensor:</p>
          {
            sensors ?
            <ul>
              {
                sensors.map((sensor)=>{return <li key={sensor.id}>{sensor.name}</li>})
              }
            </ul>
            :
            null
          }
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Anomaly Information</span>
          <p>Anomaly detected: {title}</p>
          {
            severity.length ?
            <p>Severity: {severity}</p>
            :
            <p>Severity: -</p>
          }
          <p>Anomaly count: {count}</p>
          <p>Anomaly percentage: {percentage}%</p>
          <Divider />
          {
            first?
            <p>First Occurence: {first}</p>
            :
            <p>First Occurence: - </p>
          }
          {
            last?
            <p>Last Occurence: {last}</p>
            :
            <p>Last Occurence: - </p>
          }
        </div>
        {/* <div className="featuredItem">
          <span className="featuredTitle">Sales</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$4,415</span>
            <span className="featuredMoneyRate">
              -1.4
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div> */}
      </div>
    );
  }

export default FeaturedInfo;