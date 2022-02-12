import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import moment from "moment"; 

const Chart = ({datas, grid}) => {
  console.log(datas)
  return (
    <div>
      {
        datas ?
        <div>
        {datas.map((data)=>{
          return(
            <div className="chart">
              <h3 className="chartTitle">{data.sensor}</h3>
              <ResponsiveContainer width="100%" aspect={5 / 1}>
                <LineChart data={data.runtimes}>
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter = {(unixTime) => moment(unixTime).format('MMMM Do YYYY, hh:mm:ss')}
                    />
                  <YAxis domain={['dataMin', 'auto']}/>
                  <Legend verticalAlign="bottom" height={0} />
                  <Line type="monotone" name="actual" dataKey="actual" stroke="#5550bd" strokeWidth={2} dot={false} />
                  <Line type="monotone" name="estimate" dataKey="estimate" stroke="#82ca9d" strokeWidth={2} dot={false} />
                  <Tooltip cursor={false}/>
                  {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
        })}
        </div>
        :
        <div>Loading data ...</div>
      }
    </div>
  );
}

export default Chart;
