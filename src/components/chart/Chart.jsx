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

const CustomizedDot = (props) => {
  const { cx, cy, value } = props;

  if (value > 0) {
    return (
      <circle cx={cx} cy={cy} r={1} value={props.maxVal} stroke="#b22222" strokeWidth={2} />
    );
  }else{
    return null
  }
};

const Chart = ({datas, grid, priority}) => {
  return (
    <div>
      {
        datas ?
        <div>
        {datas.map((data)=>{
          console.log(data)
          return(
            <div className="chart">
              <h3 className="chartTitle">{data.sensor}</h3>
              <ResponsiveContainer width="100%" aspect={5 / 1}>
                <LineChart data={data.runtimes}>
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter = {(unixTime) => moment(unixTime).format('DD/MM/YYYY HH:mm:ss')}
                    interval="preserveEnd"
                    minTickGap={100}
                    />
                  <YAxis 
                  domain={[dataMin => (dataMin-(dataMin/10)), dataMax => (dataMax + (dataMax*1/10))]} 
                  yAxisId="left" allowDataOverflow={true}
                  tickFormatter={(data)=> data % 1 !=0 ? data.toFixed(3): data}
                  />
                  <YAxis hide={true} domain={[0, 1]} yAxisId="right" orientation="right" />
                  <Legend verticalAlign="bottom" height={0} />
                  <Line yAxisId="left" type="monotone" name="actual" dataKey="actual" stroke="#5550bd" strokeWidth={2} dot={false} />
                  <Line yAxisId="left"type="monotone" name="estimate" dataKey="estimate" stroke="#82ca9d" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" name="priority" dataKey="priority" stroke="#b22222" strokeWidth={0} dot={<CustomizedDot maxVal={priority} />} />
                  {/* <Line yAxisId="right" type="monotone" name="priority" dataKey="priority" stroke="#fff" strokeWidth={0} /> */}
                  <Tooltip/>
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
