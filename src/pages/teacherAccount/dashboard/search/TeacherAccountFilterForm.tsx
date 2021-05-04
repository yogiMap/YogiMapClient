import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { debounce } from 'lodash';
import { ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';
import { get } from 'lodash';

interface IProps {
  onChange: (values: null | ITeacherAccountQueryParams) => void;
  filters: ITeacherAccountQueryParams;
}

const TeacherAccountFilterForm = (props: IProps) => {
  const { onChange, filters } = props;
  const [form] = Form.useForm();
  const formValues = form.getFieldsValue();

  const debounceInput = debounce((changedValues, allValues) => {
    onChange(allValues);
  }, 500);

  useEffect(() => {
    Object.keys(formValues).forEach((key) => {
      formValues[key] = get(filters, `${key}`, '');
    });

    form.setFieldsValue(formValues);
  }, [filters]);

  const reset = () => {
    Object.keys(formValues).forEach((key) => {
      formValues[key] = '';
    });

    form.setFieldsValue(formValues);
    onChange(formValues);
  };

  return (
    <Form form={form} onValuesChange={debounceInput} initialValues={filters} layout="inline">
      <Form.Item name="teacherName">
        <Input placeholder="Teacher Name" />
      </Form.Item>

      <Form.Item name="phoneNumber1">
        <Input placeholder="Phone Number1" />
      </Form.Item>

      <Form.Item>
        <Button onClick={reset}>Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default TeacherAccountFilterForm;
