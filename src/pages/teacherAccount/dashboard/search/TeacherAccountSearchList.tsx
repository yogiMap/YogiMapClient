import React from 'react';
import { get } from 'lodash';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { ITeacherAccount, ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';

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
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/teacherAccount/${row._id}`}>{row.name}</Link>,
    },

    {
      title: 'Yoga Focus',
      key: 'focus',
      dataIndex: 'focus',
    },

    {
      title: 'YogaStyle',
      key: 'style',
      // dataIndex: 'style',
      render: (row) => {
        return <Link to={`/style/${get(row, 'style._id')}`}>{get(row, 'style.name')}</Link>;
      },
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   className: 'actions',
    //   width: 80,
    //   render: (row) => <ActionMenu row={row} queryParams={queryParams} />,
    // },
  ];

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
