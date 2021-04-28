import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IAddressStats } from '@/pages/address/types';

interface IProps {
  stats: IAddressStats;
}

const AddressStats = (props: IProps) => {
  const addressStats = get(props, 'stats', '');

  // if (isEmpty(addressStats)) return null;

  const totalCount = get(addressStats, 'totalCount', '...');
  const totalCountDouble = get(addressStats, 'totalCountDouble', '...');
  const totalCountTriple = get(addressStats, 'totalCountTriple', '...');
  const totalCountTen = get(addressStats, 'totalCountTen', '...');

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

export default AddressStats;
