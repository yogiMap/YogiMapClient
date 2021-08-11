import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { IPaymentStats } from '@/pages/payment/types';

interface IProps {
  stats: IPaymentStats;
}

const PaymentStats = (props: IProps) => {
  const paymentStats = get(props, 'stats', '');

  const totalCount = get(paymentStats, 'totalCount', '...');
  const totalCountDouble = get(paymentStats, 'totalCountDouble', '...');
  const totalCountTriple = get(paymentStats, 'totalCountTriple', '...');
  const totalCountTen = get(paymentStats, 'totalCountTen', '...');

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

export default PaymentStats;
