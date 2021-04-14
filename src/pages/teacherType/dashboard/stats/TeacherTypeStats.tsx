import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { ITeacherTypeStats } from '@/pages/teacherType/types';

interface IProps {
  stats: ITeacherTypeStats;
}

const TeacherTypeStats = (props: IProps) => {
  const teacherTypeStats = get(props, 'stats', '');

  // if (isEmpty(teacherTypeStats)) return null;

  const totalCount = get(teacherTypeStats, 'totalCount', '...');
  const totalCountDouble = get(teacherTypeStats, 'totalCountDouble', '...');
  const totalCountTriple = get(teacherTypeStats, 'totalCountTriple', '...');
  const totalCountTen = get(teacherTypeStats, 'totalCountTen', '...');

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

export default TeacherTypeStats;
