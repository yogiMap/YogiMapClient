import { ISidPhone, ISidPhoneQueryParams } from '@/pages/sidPhone/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface ISidPhoneDeleteById {
  sidPhoneId: string;
  queryParams: ISidPhoneQueryParams;
}

interface IProps {
  row: ISidPhone;
  open: (arg: ISidepanel) => void;
  sidPhoneDeleteById: (arg: ISidPhoneDeleteById) => void;
  queryParams: ISidPhoneQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: ISidPhone) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: ISidPhone) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (sidPhoneId: string) => {
    props.open({
      title: 'Edit SidPhone',
      component: 'SidPhoneFormEdit',
      place: 'SidPhoneDashboard',
      width: 800,
      sidPhoneId,
    });
  };

  const deletePrompt = (sidPhone: ISidPhone) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${sidPhone.name}`,
      okType: 'danger',
      onOk: () => props.sidPhoneDeleteById({ sidPhoneId: sidPhone._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

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
  sidPhoneDeleteById: (payload: ISidPhoneDeleteById) =>
    dispatch({ type: 'SidPhoneDashboard/sidPhoneDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
