import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IStudentAccount } from '@/pages/studentAccount/types';

interface IProps extends IStudentAccount {
  studentAccountDeleteById: (id: String) => void;
}

const StudentAccountSearchListItem = (props: IProps) => {
  const { studentAccountDeleteById } = props;

  const owner = get(props, 'item.owner', '');
  const studentAccountId = get(props, 'item._id', '');
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
        <Button danger onClick={() => studentAccountDeleteById(studentAccountId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountDeleteById: (studentAccountId: string) =>
    dispatch({ type: 'StudentAccountDashboard/studentAccountDeleteDyId', payload: studentAccountId }),
});

// @ts-ignore
export default connect(null, mapDispatchToProps)(StudentAccountSearchListItem);
