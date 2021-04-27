import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IStyleStats } from '@/pages/style/types';

interface IProps {
  stats: IStyleStats;
}

const StyleStats = (props: IProps) => {
  const styleStats = get(props, 'stats', '');

  // if (isEmpty(styleStats)) return null;

  const totalCount = get(styleStats, 'totalCount', '...');
  const totalCountDouble = get(styleStats, 'totalCountDouble', '...');
  const totalCountTriple = get(styleStats, 'totalCountTriple', '...');
  const totalCountTen = get(styleStats, 'totalCountTen', '...');

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

export default StyleStats;
