import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { ITeacherAccount } from '@/pages/teacherAccount/types';

interface IProps extends ITeacherAccount {
  teacherAccountDeleteById: (id: String) => void;
}

const TeacherAccountSearchListItem = (props: IProps) => {
  const { teacherAccountDeleteById } = props;

  const owner = get(props, 'item.owner', '');
  const teacherAccountId = get(props, 'item._id', '');
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
        <Button danger onClick={() => teacherAccountDeleteById(teacherAccountId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountDeleteById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountDashboard/teacherAccountDeleteDyId', payload: teacherAccountId }),
});

// @ts-ignore
export default connect(null, mapDispatchToProps)(TeacherAccountSearchListItem);
