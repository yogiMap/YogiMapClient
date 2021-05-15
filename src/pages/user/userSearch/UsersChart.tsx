import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { get } from 'lodash';
import { Radio } from 'antd';
import { connect } from 'umi';
import { RadioChangeEvent } from 'antd/es/radio';

interface IProps {
  usersGetReport: (number: string) => void;
  usersGetHourlyReport: (timeStamp: string) => void;
}

const UsersChart = (props: IProps) => {
  const { usersGetReport, usersGetHourlyReport } = props;

  const usersReport = get(props, 'UsersDashboard.usersReport', []);

  const [range, setRange] = useState('30');

  const handleRangeChange = (e: RadioChangeEvent) => {
    setRange(e.target.value);
    if (e.target.value === '24h') {
      usersGetHourlyReport(Date.now().toString());
    }
  };

  useEffect(() => {
    if (range !== 'hourly' && range !== '24h') {
      usersGetReport(range);
    }
  }, [range]);

  function barOnClick(e: { activeLabel: string }) {
    if (range !== 'hourly' && range !== '24h') {
      const dayLengthMilSec = 86400000; // Milliseconds in a day
      const timeStamp = Date.parse(e.activeLabel) + dayLengthMilSec; //for counting 24 hours from the end of chosen day
      usersGetHourlyReport(timeStamp.toString());
      setRange('hourly');
    }
  }

  return (
    <>
      <Radio.Group value={range} onChange={handleRangeChange}>
        <Radio.Button value="24h">24 h</Radio.Button>
        <Radio.Button value="30">30 d</Radio.Button>
        <Radio.Button value="60">60 d</Radio.Button>
        <Radio.Button value="90">90 d</Radio.Button>
        <Radio.Button value="180">180 d</Radio.Button>
        <Radio.Button value="365">365 d</Radio.Button>
      </Radio.Group>

      <ResponsiveContainer minWidth="300px" aspect={4}>
        <BarChart
          data={usersReport}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 15,
          }}
          onClick={barOnClick}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="createdAt" hide={true} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="students" stackId="a" fill="#ffc107" />
          <Bar dataKey="teachers" stackId="a" fill="#766df4" />
          <Bar dataKey="new" stackId="a" fill="#20c997" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  UsersDashboard: state.UsersDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  usersGetReport: (payload: string) => dispatch({ type: 'UsersDashboard/usersGetReport', payload }),
  usersGetHourlyReport: (payload: string) => dispatch({ type: 'UsersDashboard/usersGetHourlyReport', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersChart);
