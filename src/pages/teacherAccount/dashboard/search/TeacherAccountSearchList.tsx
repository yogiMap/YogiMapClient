import React from 'react';
import { get } from 'lodash';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'antd';
import { ITeacherAccount, ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';
import RenderPhoneNumber from '@/pages/phoneNumberRendering/PhoneNumbersRendering';

interface ITeacherAccountDeleteById {
  teacherAccountId: string;
  queryParams: ITeacherAccountQueryParams;
}

interface IProps extends RouteComponentProps {
  items: ITeacherAccount[];
  open: (arg: ISidepanel) => void;
  teacherAccountDeleteById: (arg: ITeacherAccountDeleteById) => void;
}

const TeacherAccountSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ITeacherAccount>[] = [
    {
      title: 'Teacher Name',
      key: 'teacherName',
      render: (row) => <Link to={`/teacherAccount/${row._id}`}>{row.teacherName}</Link>,
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

  const edit = (teacherAccountId: string) => {
    props.open({
      title: 'Edit TeacherAccount',
      component: 'TeacherAccountFormEdit',
      place: 'TeacherAccountDashboard',
      width: 800,
      teacherAccountId,
    });
  };

  const deletePrompt = (teacherAccount: ITeacherAccount) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${teacherAccount.teacherName}`,
      okType: 'danger',
      onOk: () => props.teacherAccountDeleteById({ teacherAccountId: teacherAccount._id, queryParams }),
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
  teacherAccountDeleteById: (payload: ITeacherAccountDeleteById) =>
    dispatch({ type: 'TeacherAccountDashboard/teacherAccountDeleteById', payload }),
});

export default withRouter(connect(null, mapDispatchToProps)(TeacherAccountSearchList));
