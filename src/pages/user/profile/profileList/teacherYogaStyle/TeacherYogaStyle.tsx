import React, { useState } from 'react';
import { Button, Form, Checkbox } from 'antd';
import { get } from 'lodash';
import { connect } from 'umi';

const options = [
  { label: 'Body', value: 'Body' },
  { label: 'Mind', value: 'Mind' },
  { label: 'Soul', value: 'Soul' },
];


const TeacherYogaStyle = (props: any) => {
  const isLoading = get(props, 'loadingEffects.Profile', false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const onFinish = (formValues: any) => {
    props.onchange;
  };

  const TeacherYogaCategory = (props: any) => {
    function onChange(checkedValues: any) {
      console.log('checked = ', checkedValues);
    }
  };

  const onFieldsChange = (_: any, allFields: any) => {
    console.log(TeacherYogaCategory);
  };

  return (
    <div className='profile-block'>
      <Form size='large' name='normal_login' className='login-form' onFieldsChange={onFieldsChange}>
        <p className='profile-name'>Yoga Style</p>

        <Form.Item>
          <Checkbox.Group options={options} defaultValue={['Body']} onChange={TeacherYogaStyle}/>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button float-end'
            shape='round'
            disabled={disableSubmit}
            // loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>

      </Form>

    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  // userLogin: (payload: ILoginForm) => dispatch({ type: 'Account/login', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherYogaStyle);
