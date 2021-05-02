import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { ICompanyAccountStats } from '@/pages/companyAccount/types';

interface IProps {
  stats: ICompanyAccountStats;
}

const CompanyAccountStats = (props: IProps) => {
  const companyAccountStats = get(props, 'stats', '');

  const totalCount = get(companyAccountStats, 'totalCount', '...');
  const totalCountDouble = get(companyAccountStats, 'totalCountDouble', '...');
  const totalCountTriple = get(companyAccountStats, 'totalCountTriple', '...');
  const totalCountTen = get(companyAccountStats, 'totalCountTen', '...');

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

export default CompanyAccountStats;
