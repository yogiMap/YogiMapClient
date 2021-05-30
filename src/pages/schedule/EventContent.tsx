import React from 'react';
import { get } from 'lodash';
import { Dropdown, Menu } from 'antd';
import { IClassesUpdate } from '@/pages/classes/form/ClassesFormEditWrapper';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';

interface IProps {
  open: (arg: ISidepanel) => void;
  arg: any; // TODO
}

const EventContent = (props: IProps) => {
  const extendedProps = get(props, 'arg.event.extendedProps', {});

  const clientName = get(extendedProps, 'client.name', '');
  const clientAddress = get(extendedProps, 'address.address', '');

  const contextMenuClick = (handler: string) => {
    if (handler === 'edit') {
      props.open({
        title: 'Edit Classes',
        component: 'ClassesFormCreate',
        place: '',
        width: '95%',
      });
    }

    if (handler === 'cancel') {
      props.open({
        title: 'PaymentFormCreate',
        component: 'PaymentFormCreate',
        place: '',
        width: '95%',
      });
    }
  };

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'updateTime', handler: 'updateTime', name: 'Update Time' },
    { key: 'sms', handler: 'sms', name: 'Send SMS to Client' },
    { key: 'reassign', handler: 'reassign', name: 'Reassign Classes' },
    { key: 'cancel', handler: 'cancel', name: 'Cancel' },
  ];

  const menu = (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} onClick={() => contextMenuClick(el.handler)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>{props.arg.timeText}</div>
        <div className="text-body">{clientName}</div>

        <div id="top-menu" role="menu" className="d-flex align-items-center">
          <Dropdown overlay={menu}>
            <span className="ant-dropdown-link">....</span>
          </Dropdown>
        </div>
      </div>

      <div>{clientAddress}</div>
      <div className="font-italic">{props.arg.event.title}</div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ScheduleDashboard: state.ScheduleDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  scheduleSearch: (payload: any) => dispatch({ type: 'ScheduleDashboard/search', payload }),
  scheduleGetStats: () => dispatch({ type: 'ScheduleDashboard/getStats' }),
  scheduleReset: () => dispatch({ type: 'ScheduleDashboard/reset' }),
  classesUpdateById: (payload: IClassesUpdate) => dispatch({ type: 'ClassesForm/updateById', payload }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventContent);
