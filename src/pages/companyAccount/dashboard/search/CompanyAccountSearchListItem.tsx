import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { ICompanyAccount } from '@/pages/companyAccount/types';

interface IProps extends ICompanyAccount {
  companyAccountDeleteById: (id: String) => void;
}

const CompanyAccountSearchListItem = (props: IProps) => {
  const { companyAccountDeleteById } = props;

  const owner = get(props, 'item.owner', '');
  const companyAccountId = get(props, 'item._id', '');
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
        <Button danger onClick={() => companyAccountDeleteById(companyAccountId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  companyAccountDeleteById: (companyAccountId: string) =>
    dispatch({ type: 'CompanyAccountDashboard/companyAccountDeleteDyId', payload: companyAccountId }),
});

// @ts-ignore
export default connect(null, mapDispatchToProps)(CompanyAccountSearchListItem);
