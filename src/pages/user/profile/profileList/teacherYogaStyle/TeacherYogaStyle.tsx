import React from 'react';
import TeacherYogaCategory from '@/pages/user/profile/profileList/teacherYogaStyle/TeacherYogaCategory';

const TeacherYogaStyle = (props: any) => {

  return (
    <div className='profile-block'>
      <p className='profile-name'>Yoga Styles & Lineages</p>
      <TeacherYogaCategory />
      <button className='button-primary float-end'>Save</button>
    </div>
  );
};

export default TeacherYogaStyle;
