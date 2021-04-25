import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { debounce } from 'lodash';
import { ITeacherQueryParams } from '@/pages/teacher/types';
import { get } from 'lodash';

interface IProps {
  onChange: (values: null | ITeacherQueryParams) => void;
  filters: ITeacherQueryParams;
}

const TeacherFilterForm = (props: IProps) => {
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
    <Form form={form} onValuesChange={debounceInput} initialValues={filters} className="row d-flex justify-content-center">
      <div className="col-lg-2 d-flex justify-content-center">
        <Form.Item name="name">
          <Input placeholder="name" className="rounded-pill" />
        </Form.Item>
      </div>

      <div className="col-lg-2 d-flex justify-content-center">
        <Form.Item name="yogaStyle">
          <Input placeholder="yogaStyle" className="rounded-pill" />
        </Form.Item>
      </div>

      <div className="col-lg-2 d-flex justify-content-center">
        <Form.Item name="Class Type">
          <Input placeholder="classType" className="rounded-pill" />
        </Form.Item>
      </div>

      <div className="col-lg-2 d-flex justify-content-center">
        <Form.Item name="Location">
          <Input placeholder="Location" className="rounded-pill" />
        </Form.Item>
      </div>

      <div className="col-lg-2 d-flex justify-content-center">
        <Form.Item>
          <Button onClick={reset} shape="round">
            Reset
          </Button>
        </Form.Item>
      </div>

    </Form>
  );
};

export default TeacherFilterForm;
