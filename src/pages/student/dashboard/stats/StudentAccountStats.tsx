import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { IStudentStats } from '@/pages/student/types';

interface IProps {
  stats: IStudentStats;
}

const StudentStats = (props: IProps) => {
  const studentStats = get(props, 'stats', '');

  const totalCount = get(studentStats, 'totalCount', '...');
  const totalCountDouble = get(studentStats, 'totalCountDouble', '...');
  const totalCountTriple = get(studentStats, 'totalCountTriple', '...');
  const totalCountTen = get(studentStats, 'totalCountTen', '...');

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

export default StudentStats;
