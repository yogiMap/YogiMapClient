import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { debounce } from 'lodash';
import { ISidPhoneQueryParams } from '@/pages/sidPhone/types';
import { get } from 'lodash';

interface IProps {
  onChange: (values: null | ISidPhoneQueryParams) => void;
  filters: ISidPhoneQueryParams;
}

const SidPhoneFilterForm = (props: IProps) => {
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
      <Form.Item name="sidPhoneSearchParam1">
        <Input placeholder="sidPhoneSearchParam1" />
      </Form.Item>

      <Form.Item name="sidPhoneSearchParam2">
        <Input placeholder="sidPhoneSearchParam2" />
      </Form.Item>

      <Form.Item>
        <Button onClick={reset}>Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default SidPhoneFilterForm;
