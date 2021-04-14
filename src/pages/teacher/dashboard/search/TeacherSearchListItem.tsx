import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { ITeacher } from '@/pages/teacher/types';

interface IProps extends ITeacher {
  teacherDelete: (id: String) => void;
}

const TeacherSearchListItem = (props: IProps) => {
  const { teacherDelete } = props;

  const owner = get(props, 'item.owner', '');
  const teacherId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => teacherDelete(teacherId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  teacherDelete: (payload: any) => dispatch({ type: 'TeacherDashboard/teacherDelete', payload }),
});

export default connect(null, mapDispatchToProps)(TeacherSearchListItem);
