import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { debounce } from 'lodash';
import { IClientQueryParams } from '@/pages/client/types';
import { get } from 'lodash';

interface IProps {
  onChange: (values: null | IClientQueryParams) => void;
  filters: IClientQueryParams;
}

const ClientFilterForm = (props: IProps) => {
  const { onChange, filters } = props;
  const [form] = Form.useForm();
  const formValues = form.getFieldsValue();
  const debounceInput = debounce((changedValues, allValues) => {
    onChange(allValues);
  }, 500);

  useEffect(() => {
    // при обновлении фильтров из пропс нужно обновлять форму
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
      <Form.Item name="name">
        <Input placeholder="Client Name" />
      </Form.Item>

      <Form.Item name="teacherAccount">
        <Input placeholder="teacherAccount" />
      </Form.Item>

      <Form.Item>
        <Button onClick={reset}>Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default ClientFilterForm;
