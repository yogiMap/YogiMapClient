import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IClassStats } from '@/pages/class/types';

interface IProps {
  stats: IClassStats;
}

const ClassStats = (props: IProps) => {
  const classStats = get(props, 'stats', '');

  // if (isEmpty(classStats)) return null;

  const totalCount = get(classStats, 'totalCount', '...');
  const totalCountDouble = get(classStats, 'totalCountDouble', '...');
  const totalCountTriple = get(classStats, 'totalCountTriple', '...');
  const totalCountTen = get(classStats, 'totalCountTen', '...');

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total" value={totalCount} />
      </Col>

      <Col span={6}>
        <Statistic title="Trend" value={totalCountDouble} />
      </Col>

      <Col span={6}>
        <Statistic title="Users" value={totalCountTriple} />
      </Col>

      <Col span={6}>
        <Statistic title="Hits" value={totalCountTen} />
      </Col>
    </Row>
  );
};

export default ClassStats;
