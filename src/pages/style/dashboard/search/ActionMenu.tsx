import { IStyle, IStyleQueryParams } from '@/pages/style/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IStyleDeleteById {
  styleId: string;
  queryParams: IStyleQueryParams;
}

interface IProps {
  row: IStyle;
  open: (arg: ISidepanel) => void;
  styleDeleteById: (arg: IStyleDeleteById) => void;
  queryParams: IStyleQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IStyle) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IStyle) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (styleId: string) => {
    props.open({
      title: 'Edit Style',
      component: 'StyleFormEdit',
      place: 'StyleDashboard',
      width: 800,
      styleId,
    });
  };

  const deletePrompt = (style: IStyle) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${style.name}`,
      okType: 'danger',
      onOk: () => props.styleDeleteById({ styleId: style._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Dropdown overlay={menu(row)}>
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
  styleDeleteById: (payload: IStyleDeleteById) => dispatch({ type: 'StyleDashboard/styleDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
