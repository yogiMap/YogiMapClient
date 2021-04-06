import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IClasses } from '@/pages/classes/types';

interface IProps extends IClasses {
  classesDelete: (id: String) => void;
}

const ClassesSearchListItem = (props: IProps) => {
  const { classesDelete } = props;

  const owner = get(props, 'item.owner', '');
  const classesId = get(props, 'item._id', '');
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
        <Button danger onClick={() => classesDelete(classesId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  classesDelete: (payload: any) => dispatch({ type: 'ClassesDashboard/classesDelete', payload }),
});

export default connect(null, mapDispatchToProps)(ClassesSearchListItem);
