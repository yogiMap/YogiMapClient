import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IVendorTypeStats } from '@/pages/vendorType/types';

interface IProps {
  stats: IVendorTypeStats;
}

const VendorTypeStats = (props: IProps) => {
  const vendorTypeStats = get(props, 'stats', '');

  // if (isEmpty(vendorTypeStats)) return null;

  const totalCount = get(vendorTypeStats, 'totalCount', '...');
  const totalCountDouble = get(vendorTypeStats, 'totalCountDouble', '...');
  const totalCountTriple = get(vendorTypeStats, 'totalCountTriple', '...');
  const totalCountTen = get(vendorTypeStats, 'totalCountTen', '...');

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

export default VendorTypeStats;
