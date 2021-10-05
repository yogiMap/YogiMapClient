import React from 'react';
import { get } from 'lodash';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';
import { IClasses } from '@/pages/classes/types';
import ClassesDashboardControls from '@/pages/classes/dashboard/controls/ClassesDashboardControls';
import { formatterDateFull, formatterTimeFull } from '@/utils/dateTime';

interface IProps extends RouteComponentProps {
  classes: IClasses[];
  teacherAccountGetById: (teacherAccountId: string) => void;
}

const TeacherAccountViewClassesList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  //const classes: any = get(props, 'classes', []);
  const classesObject = get(props, 'TeacherAccount.classes', {});
  const classes: any = Object.values(classesObject);
  const name = get(props, 'TeacherAccount.name', '');

  const columns: ColumnProps<IClasses>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/classes/${row._id}`}>{row.name}</Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend'],
    },
    {
      title: 'Date',
      key: 'eventDate',
      render: (row) => {
        return formatterDateFull(row.date);
      },
    },
    {
      title: 'Time',
      key: 'eventDate',
      render: (row) => {
        return formatterTimeFull(row.date);
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    // {
    //   title: 'YogaStyle',
    //   key: 'style',
    //   render: (row) => {
    //     return <Link to={`/style/${get(row, 'style._id')}`}>{get(row, 'style.name')}</Link>;
    //   },
    // },
    // {
    //   title: 'classType',
    //   key: 'classType',
    //   render: (row) => {
    //     return <Link to={`/classType/${get(row, 'classType._id')}`}>{get(row, 'classType.name')}</Link>;
    //   },
    // },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      className: 'actions',
      width: 80,
      render: (row) => <ActionMenu row={row} queryParams={queryParams} />,
    },
  ];

  return (
    <>
      <div className="teacher-account__header">
        <h1 className="text-colored-first">{name} Classes </h1>
      </div>

      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={classes}
          size="middle"
          className="table-middle"
          pagination={false}
        />
        {/*{isUserAuth && (*/}
        <div className="d-flex justify-content-end my-5">
          <ClassesDashboardControls />
        </div>
        {/*)}*/}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccount: state.TeacherAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (payload: string) => dispatch({ type: 'TeacherAccount/teacherAccountGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountViewClassesList);
