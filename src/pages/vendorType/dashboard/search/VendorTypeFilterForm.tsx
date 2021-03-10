import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { debounce } from 'lodash';
import { IVendorTypeQueryParams } from '@/pages/vendorType/types';
import { get } from 'lodash';

interface IProps {
  onChange: (values: null | IVendorTypeQueryParams) => void;
  filters: IVendorTypeQueryParams;
}

const VendorTypeFilterForm = (props: IProps) => {
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
      <Form.Item name="vendorTypeSearchParam1">
        <Input placeholder="vendorTypeSearchParam1" />
      </Form.Item>

      <Form.Item name="vendorTypeSearchParam2">
        <Input placeholder="vendorTypeSearchParam2" />
      </Form.Item>

      <Form.Item>
        <Button onClick={reset}>Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default VendorTypeFilterForm;
