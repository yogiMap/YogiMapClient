import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { Iclass } from '@/pages/class/types';

interface IProps extends Iclass {
  classDelete: (id: String) => void;
}

const classSearchListItem = (props: IProps) => {
  const { classDelete } = props;

  const owner = get(props, 'item.owner', '');
  const classId = get(props, 'item._id', '');
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
        <Button danger onClick={() => classDelete(classId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  classDelete: (payload: any) => dispatch({ type: 'classDashboard/classDelete', payload }),
});

export default connect(null, mapDispatchToProps)(classSearchListItem);
