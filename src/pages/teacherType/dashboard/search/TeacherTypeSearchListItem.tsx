import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { ITeacherType } from '@/pages/teacherType/types';

interface IProps extends ITeacherType {
  teacherTypeDelete: (id: String) => void;
}

const TeacherTypeSearchListItem = (props: IProps) => {
  const { teacherTypeDelete } = props;

  const owner = get(props, 'item.owner', '');
  const teacherTypeId = get(props, 'item._id', '');
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
        <Button danger onClick={() => teacherTypeDelete(teacherTypeId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  teacherTypeDelete: (payload: any) => dispatch({ type: 'TeacherTypeDashboard/teacherTypeDelete', payload }),
});

export default connect(null, mapDispatchToProps)(TeacherTypeSearchListItem);
