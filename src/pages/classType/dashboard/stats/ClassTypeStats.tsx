import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IClassTypeStats } from '@/pages/classType/types';

interface IProps {
  stats: IClassTypeStats;
}

const ClassTypeStats = (props: IProps) => {
  const classTypeStats = get(props, 'stats', '');

  // if (isEmpty(classTypeStats)) return null;

  const totalCount = get(classTypeStats, 'totalCount', '...');
  const totalCountDouble = get(classTypeStats, 'totalCountDouble', '...');
  const totalCountTriple = get(classTypeStats, 'totalCountTriple', '...');
  const totalCountTen = get(classTypeStats, 'totalCountTen', '...');

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

export default ClassTypeStats;
