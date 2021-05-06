import React from 'react';
import { Badge } from 'antd';
import { get } from 'lodash';

export default function UserRoles(props: any) {
  const roles = get(props, 'roles', []);
  return (
    <div>
      {roles.map((el: string) => (
        <Badge count={el} style={{ backgroundColor: '#c4c4c4' }} key={el} />
      ))}
    </div>
  );
}
