import React from 'react';
import { Input, Select, Col, Row, Form } from 'antd';
import { debounce } from 'lodash';
import { IUsersSearchTerms } from '@/pages/user/userSearch/types';

const { Option } = Select;

interface IProps {
  filters: IUsersSearchTerms;
  selectOptions: {
    usersRolesList: string[];
  };
  onChange: (arg: IUsersSearchTerms) => void;
}

const UsersFilterForm = (props: IProps) => {
  const { onChange, filters, selectOptions } = props;

  const debounceInput = debounce((allValues) => {
    onChange(allValues);
  }, 700);

  return (
    <Form
      layout="vertical"
      className="mt-3rem mb-3rem"
      initialValues={filters}
      onValuesChange={(changedValues, allValues) => debounceInput(allValues)}
    >
      <div className="row">
        <div className="col-md-3">
          <Form.Item name="name">
            <Input size="large" placeholder="Search by Name..." />
          </Form.Item>
        </div>

        <div className="col-md-3">
          <Form.Item name="email">
            <Input size="large" placeholder="Search by Email..." />
          </Form.Item>
        </div>

        <div className="col-md-3">
          <Form.Item name="role">
            <Select showSearch allowClear={true} size="large" placeholder="Select...">
              {selectOptions.usersRolesList.map((el) => (
                <Option value={el} key={el}>
                  {el}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default UsersFilterForm;
