import React from 'react';
import { get } from 'lodash';
import StatisticsItem from '@/pages/utils/statistics/StatisticsItem';
import { Row } from 'antd';

interface Statistic {
  [key: string]: number;
}
interface IProps {
  items: Statistic;
}
const getKeyValue = <U extends keyof S, S extends object>(key: U) => (obj: S) => obj[key];

const StatisticsList = (props: IProps) => {
  const items = get(props, 'items', {});

  const itemsLength = Object.keys(items).length;
  const spacingHor = 16;
  const spacingVer = 16;
  const colSize = Math.floor(24 / itemsLength);

  return (
    <div className="mb-1rem">
      <Row gutter={[spacingHor, spacingVer]}>
        {Object.keys(items).map((statistic: string) => (
          <StatisticsItem
            key={statistic}
            title={statistic}
            value={getKeyValue<keyof Statistic, Statistic>(statistic)(items)}
            colSize={colSize}
          />
        ))}
      </Row>
    </div>
  );
};

export default StatisticsList;
