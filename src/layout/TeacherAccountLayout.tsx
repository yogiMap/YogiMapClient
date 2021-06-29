import React, { useEffect } from 'react';
import { Anchor, Menu } from 'antd';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  children: any;
  open: (arg: ISidepanel) => void;
  teacherAccountGetById: (teacherAccountId: string) => void;
}

const TeacherAccountLayout = (props: IProps) => {
  const tab = get(props, 'location.pathname', '').split('/').pop();
  const teacherName = get(props, 'TeacherAccountView.name', '');
  const teacherAccountId = get(props, 'match.params.teacherAccountId', '');

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
    return () => {};
  }, []);

  const menuItems = [
    {
      title: 'TeacherAccount Info',
      link: `/teacherAccount/${teacherAccountId}`,
    },
    {
      title: 'SIP Phones',
      link: `/teacherAccount/${teacherAccountId}/sipPhone`,
    },
    {
      title: 'Classes',
      link: `/teacherAccount/${teacherAccountId}/classes`,
    },
    {
      title: 'Events',
      link: `/teacherAccount/${teacherAccountId}/event`,
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-3">
          <h5 className="text-colored-first mt-5">{teacherName}</h5>

          <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode={'vertical'}>
            {menuItems.map((item) => (
              <Menu.Item key={item.title}>
                <Link to={item.link}>{item.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>

        <div className="col-lg-9 col-md-9">{props.children}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountView: state.TeacherAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountLayout);
