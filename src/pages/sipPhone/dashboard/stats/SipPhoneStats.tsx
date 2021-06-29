import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { ISipPhoneStats } from '@/pages/sipPhone/types';

interface IProps {
  stats: ISipPhoneStats;
}

const SipPhoneStats = (props: IProps) => {
  const sipPhoneStats = get(props, 'stats', '');

  // if (isEmpty(sipPhoneStats)) return null;

  const totalCount = get(sipPhoneStats, 'totalCount', '...');
  const totalCountDouble = get(sipPhoneStats, 'totalCountDouble', '...');
  const totalCountTriple = get(sipPhoneStats, 'totalCountTriple', '...');
  const totalCountTen = get(sipPhoneStats, 'totalCountTen', '...');

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

export default SipPhoneStats;
