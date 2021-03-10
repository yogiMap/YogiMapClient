import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IVendorStats } from '@/pages/vendor/types';

interface IProps {
  stats: IVendorStats;
}

const VendorStats = (props: IProps) => {
  const vendorStats = get(props, 'stats', '');

  // if (isEmpty(vendorStats)) return null;

  const totalCount = get(vendorStats, 'totalCount', '...');
  const totalCountDouble = get(vendorStats, 'totalCountDouble', '...');
  const totalCountTriple = get(vendorStats, 'totalCountTriple', '...');
  const totalCountTen = get(vendorStats, 'totalCountTen', '...');

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

export default VendorStats;
