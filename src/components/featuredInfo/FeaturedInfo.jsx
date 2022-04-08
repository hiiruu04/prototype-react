import { Divider } from "@material-ui/core";
import "./featuredInfo.css";

const FeaturedInfo=({asset_id, title, count, percentage, first, last, asset, sensors, _sensors, priority}) => {
    // console.log(sensors)
    return (
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Asset Information</span>
          <p>Asset: {asset.asset}</p>
          <p>Asset id: {asset_id}</p>
          <p>Asset description: {asset.description}</p>
          <br />
          <p>List sensor:</p>
          {
            _sensors ?
            <ul>
              {
                _sensors.map((sensor)=>{return <li key={sensor.id}>{sensor.name}</li>})
              }
            </ul>
            :
            null
          }
          {
            sensors ?
            <ul>
              {
                sensors.map((sensor)=>{return <li className="sensor-active" key={sensor.id}>{sensor.name}</li>})
              }
            </ul>
            :
            null
          }
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Anomaly Information</span>
          <h2>Anomaly detected: {title}</h2>
          {
            priority?
            priority===1?
            <h2>Priority: {priority} (Highest)</h2>
            :
            priority===2?
            <h2>Priority: {priority} (High)</h2>
            :
            priority===3?
            <h2>Priority: {priority} (Medium)</h2>
            :
            priority===4?
            <h2>Priority: {priority} (Low)</h2>
            :
            priority===5?
            <h2>Priority: {priority} (Lowest)</h2>
            :
            <p>Priority: -</p>
            :
            null
          }
          {
            count?
            <p>Anomaly count: {count.reduce((a, b) => a + b, 0)}</p>
            :
            null
          }
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