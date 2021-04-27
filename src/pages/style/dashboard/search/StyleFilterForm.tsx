import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { debounce } from 'lodash';
import { IStyleQueryParams } from '@/pages/style/types';
import { get } from 'lodash';

interface IProps {
  onChange: (values: null | IStyleQueryParams) => void;
  filters: IStyleQueryParams;
}

const StyleFilterForm = (props: IProps) => {
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
    <Form form={form} onValuesChange={debounceInput} initialValues={filters}>
      <div className="row d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <Form.Item name="style">
            <Input placeholder="Yoga Style" className="rounded-pill" />
          </Form.Item>
        </div>

        <div className="col d-flex justify-content-center">
          <Form.Item>
            <Button onClick={reset} shape="round">
              Reset
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default StyleFilterForm;
