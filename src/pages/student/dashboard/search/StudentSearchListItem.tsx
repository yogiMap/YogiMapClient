import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IStudent } from '@/pages/student/types';

interface IProps extends IStudent {
  studentDeleteById: (id: String) => void;
}

const StudentSearchListItem = (props: IProps) => {
  const { studentDeleteById } = props;

  const owner = get(props, 'item.owner', '');
  const studentId = get(props, 'item._id', '');
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
        <Button danger onClick={() => studentDeleteById(studentId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  studentDeleteById: (studentId: string) =>
    dispatch({ type: 'StudentDashboard/studentDeleteDyId', payload: studentId }),
});

// @ts-ignore
export default connect(null, mapDispatchToProps)(StudentSearchListItem);
