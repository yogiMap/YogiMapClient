import React from 'react';
import { get, startCase } from 'lodash';

import { Card, Col, Statistic } from 'antd';

interface IProps {
  title: string;
  value: number;
  colSize: number;
}

const StatisticsItem = (props: IProps) => {
  const title = get(props, 'title', '');
  const value = get(props, 'value', '');
  const colSize = get(props, 'colSize', '');

  const normalStringTitle = startCase(title); //convert from 'camelCase' to 'Start Case'

  return (
    <Col flex={colSize}>
      <Card bordered={false}>
        <Statistic title={normalStringTitle} value={value} />
      </Card>
    </Col>
  );
};

export default StatisticsItem;
