import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IClassType } from '@/pages/classType/types';

interface IProps extends IClassType {
  classTypeDelete: (id: String) => void;
}

const ClassTypeSearchListItem = (props: IProps) => {
  const { classTypeDelete } = props;

  const owner = get(props, 'item.owner', '');
  const classTypeId = get(props, 'item._id', '');
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
        <Button danger onClick={() => classTypeDelete(classTypeId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  classTypeDelete: (payload: any) => dispatch({ type: 'ClassTypeDashboard/classTypeDelete', payload }),
});

export default connect(null, mapDispatchToProps)(ClassTypeSearchListItem);
