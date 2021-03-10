import { IVendorType, IVendorTypeQueryParams } from '@/pages/vendorType/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IVendorTypeDeleteById {
  vendorTypeId: string;
  queryParams: IVendorTypeQueryParams;
}

interface IProps {
  row: IVendorType;
  open: (arg: ISidepanel) => void;
  vendorTypeDeleteById: (arg: IVendorTypeDeleteById) => void;
  queryParams: IVendorTypeQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IVendorType) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IVendorType) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (vendorTypeId: string) => {
    props.open({
      title: 'Edit VendorType',
      component: 'VendorTypeFormEdit',
      place: 'VendorTypeDashboard',
      width: 800,
      vendorTypeId,
    });
  };

  const deletePrompt = (vendorType: IVendorType) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${vendorType.name}`,
      okType: 'danger',
      onOk: () => props.vendorTypeDeleteById({ vendorTypeId: vendorType._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

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
  vendorTypeDeleteById: (payload: IVendorTypeDeleteById) => dispatch({ type: 'VendorTypeDashboard/vendorTypeDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
