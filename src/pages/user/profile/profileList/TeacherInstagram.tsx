import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { connect } from 'umi';

const TeacherInstagram = (props: any) => {

    // useEffect(() => {}, []);

    return (
      <div className="profile-block">
        <p className="profile-name">Instagram</p>

        <button className="button-primary float-end">Save</button>

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

export default TeacherInstagram;