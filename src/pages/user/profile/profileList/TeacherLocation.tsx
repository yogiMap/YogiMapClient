import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { connect } from 'umi';
import { Button, Form } from 'antd';

const TeacherLocation = (props: any) => {

    // useEffect(() => {}, []);

    return (
      <div className="profile-block">
        <p className="profile-name">Location</p>

        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button float-end'
          shape='round'
          // disabled={disableSubmit}
          // loading={isLoading}
        >
          Save
        </Button>

      </div>
    );
  };
// const mapStateToProps = (state: any) => ({
//   // userDiary: state.Profile.userDiary,
// });
//
// const mapDispatchToProps = (dispatch: any) => ({
//   // userDiaryGetAll: (payload: any) => dispatch({ type: 'Profile/userDiaryGetAll', payload }),
// });

export default TeacherLocation;
