import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { connect } from 'umi';

const TeacherImageUpload = (props: any) => {
  // const userImage= get(props, 'userImage', []);

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e: any) => {
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'my_pic');
      setLoading(true);
      const res = await fetch('https://api.cloudinary.com/v1_1/dbagw9piw/image/upload', {
        method: 'POST',
        body: data,
      });
      const file = await res.json();

      setImage(file.secure_url);
      setLoading(false);
    };

    // useEffect(() => {}, []);

    return (
      <div className="profile-block">
        <p className="profile-name">Picture</p>

        {loading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <img src={image} className="profile-img" alt="img" />
        )}

        <div>
          <input type="file" name="image" onChange={uploadImage} />
        </div>

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

// @ts-ignore
export default TeacherImageUpload;
