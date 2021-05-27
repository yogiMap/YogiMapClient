import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { ITeacherStats } from '@/pages/teacher/types';

interface IProps {
  stats: ITeacherStats;
}

const TeacherStats = (props: IProps) => {
  const teacherStats = get(props, 'stats', '');

  if (isEmpty(teacherStats)) return null;

  const totalCount = get(teacherStats, 'totalCount', '...');
  const totalCountDouble = get(teacherStats, 'totalCountDouble', '...');
  const totalCountTriple = get(teacherStats, 'totalCountTriple', '...');
  const totalCountTen = get(teacherStats, 'totalCountTen', '...');

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

export default TeacherStats;
