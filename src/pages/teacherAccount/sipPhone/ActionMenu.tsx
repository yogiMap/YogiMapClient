import { ISipPhone, ISipPhoneQueryParams } from '@/pages/sipPhone/types';
import { Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';

interface ISipPhoneDeleteById {
  sipPhoneId: string;
  queryParams: ISipPhoneQueryParams;
}

interface IProps {
  row: ISipPhone;
  open: (arg: ISidepanel) => void;
  sipPhoneDeleteById: (arg: ISipPhoneDeleteById) => void;
  queryParams: ISipPhoneQueryParams;
  teacherAccountId: string;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: ISipPhone) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: ISipPhone) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (sipPhoneId: string) => {
    props.open({
      title: 'Edit SipPhone',
      component: 'SipPhoneFormEdit',
      place: 'SipPhoneDashboard',
      width: 800,
      sipPhoneId,
      teacherAccountId: props.teacherAccountId,
    });
  };

  const deletePrompt = (sipPhone: ISipPhone) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${sipPhone.phoneNumber}`,
      okType: 'danger',
      onOk: () => props.sipPhoneDeleteById({ sipPhoneId: sipPhone._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Dropdown overlay={menu(row)} trigger={['click']}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  sipPhoneDeleteById: (payload: ISipPhoneDeleteById) =>
    dispatch({ type: 'SipPhoneDashboard/sipPhoneDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
