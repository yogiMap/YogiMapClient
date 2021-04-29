import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { ITeacherAccountStats } from '@/pages/teacherAccount/types';

interface IProps {
  stats: ITeacherAccountStats;
}

const TeacherAccountStats = (props: IProps) => {
  const teacherAccountStats = get(props, 'stats', '');

  const totalCount = get(teacherAccountStats, 'totalCount', '...');
  const totalCountDouble = get(teacherAccountStats, 'totalCountDouble', '...');
  const totalCountTriple = get(teacherAccountStats, 'totalCountTriple', '...');
  const totalCountTen = get(teacherAccountStats, 'totalCountTen', '...');

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

export default TeacherAccountStats;
