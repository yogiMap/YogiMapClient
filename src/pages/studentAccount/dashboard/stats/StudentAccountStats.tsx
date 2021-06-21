import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { IStudentAccountStats } from '@/pages/studentAccount/types';

interface IProps {
  stats: IStudentAccountStats;
}

const StudentAccountStats = (props: IProps) => {
  const studentAccountStats = get(props, 'stats', '');

  const totalCount = get(studentAccountStats, 'totalCount', '...');
  const totalCountDouble = get(studentAccountStats, 'totalCountDouble', '...');
  const totalCountTriple = get(studentAccountStats, 'totalCountTriple', '...');
  const totalCountTen = get(studentAccountStats, 'totalCountTen', '...');

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

export default StudentAccountStats;
