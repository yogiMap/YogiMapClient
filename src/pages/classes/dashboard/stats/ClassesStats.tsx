import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IClassesStats } from '@/pages/classes/types';

interface IProps {
  stats: IClassesStats;
}

const ClassesStats = (props: IProps) => {
  const classesStats = get(props, 'stats', '');

  // if (isEmpty(classesStats)) return null;

  const totalCount = get(classesStats, 'totalCount', '...');
  const totalCountDouble = get(classesStats, 'totalCountDouble', '...');
  const totalCountTriple = get(classesStats, 'totalCountTriple', '...');
  const totalCountTen = get(classesStats, 'totalCountTen', '...');

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

export default ClassesStats;
