import React from 'react';
import { get } from 'lodash';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'antd';
import { ICompanyAccount, ICompanyAccountQueryParams } from '@/pages/companyAccount/types';
import RenderPhoneNumber from '@/pages/phoneNumberRendering/PhoneNumbersRendering';

interface ICompanyAccountDeleteById {
  companyAccountId: string;
  queryParams: ICompanyAccountQueryParams;
}

interface IProps extends RouteComponentProps {
  items: ICompanyAccount[];
  open: (arg: ISidepanel) => void;
  companyAccountDeleteById: (arg: ICompanyAccountDeleteById) => void;
}

const CompanyAccountSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ICompanyAccount>[] = [
    {
      title: 'Teacher Name',
      key: 'teacherName',
      render: (row) => <Link to={`/companyAccount/${row._id}`}>{row.teacherName}</Link>,
    },

    {
      title: 'Phone Number1',
      render: (row) => <RenderPhoneNumber phoneNumberAll={get(row, 'phoneNumber1', {})} />,
      key: 'phoneNumber',
    },

    {
      title: 'Phone Number2',
      render: (row) => <RenderPhoneNumber phoneNumberAll={get(row, 'phoneNumber2', {})} />,
      key: 'phoneNumber',
    },

    {
      title: 'Fax',
      dataIndex: 'fax',
      key: 'fax',
    },

    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },

    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },

    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },

    {
      title: 'Zip Code',
      dataIndex: 'zipCode',
      key: 'zipCode',
    },

    {
      title: 'Time Zone',
      dataIndex: 'timeZone',
      key: 'timeZone',
    },

    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },

    {
      title: 'Owner',
      key: 'owner',
      render: (row) => {
        return <Link to={`/profile/${get(row, 'owner._id')}`}>{get(row, 'owner.name')}</Link>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      className: 'actions',
      width: 200,
      render: (row) => (
        <span>
          <Button type="link" onClick={() => edit(row._id)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => deletePrompt(row)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const edit = (companyAccountId: string) => {
    props.open({
      title: 'Edit CompanyAccount',
      component: 'CompanyAccountFormEdit',
      place: 'CompanyAccountDashboard',
      width: 800,
      companyAccountId,
    });
  };

  const deletePrompt = (companyAccount: ICompanyAccount) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${companyAccount.teacherName}`,
      okType: 'danger',
      onOk: () => props.companyAccountDeleteById({ companyAccountId: companyAccount._id, queryParams }),
    });
  };

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={items}
      size="middle"
      className="table-middle"
      pagination={false}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  companyAccountDeleteById: (payload: ICompanyAccountDeleteById) =>
    dispatch({ type: 'CompanyAccountDashboard/companyAccountDeleteById', payload }),
});

export default withRouter(connect(null, mapDispatchToProps)(CompanyAccountSearchList));
