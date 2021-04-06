import React from 'react';
import { Checkbox } from 'antd';

const options = [
  { label: 'Body', value: 'Body' },
  { label: 'Mind', value: 'Mind' },
  { label: 'Soul', value: 'Soul' },
];


const TeacherYogaCategory = (props: any) => {
  function onChange(checkedValues: any) {
    console.log('checked = ', checkedValues);
  }

return (
  <div>
    <Checkbox.Group options={options} defaultValue={['Body']} onChange={onChange} />
  </div>
)
}

export default TeacherYogaCategory;
