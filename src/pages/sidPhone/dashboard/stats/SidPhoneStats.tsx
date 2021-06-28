import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { ISidPhoneStats } from '@/pages/sidPhone/types';

interface IProps {
  stats: ISidPhoneStats;
}

const SidPhoneStats = (props: IProps) => {
  const sidPhoneStats = get(props, 'stats', '');

  // if (isEmpty(sidPhoneStats)) return null;

  const totalCount = get(sidPhoneStats, 'totalCount', '...');
  const totalCountDouble = get(sidPhoneStats, 'totalCountDouble', '...');
  const totalCountTriple = get(sidPhoneStats, 'totalCountTriple', '...');
  const totalCountTen = get(sidPhoneStats, 'totalCountTen', '...');

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

export default SidPhoneStats;
