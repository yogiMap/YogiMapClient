import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { IAddress, IAddressQueryParams } from '@/pages/address/types';
import { EditOutlined } from '@ant-design/icons';

interface IAddressDeleteById {
  addressId: string;
  queryParams: IAddressQueryParams;
}

interface IProps {
  row: IAddress;
  open: (arg: ISidepanel) => void;
  addressDeleteById: (arg: IAddressDeleteById) => void;
  queryParams: IAddressQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  let menuItems: { key: string; handler: string; name: string; danger: boolean }[] = [
    { key: 'edit', handler: 'edit', name: 'Edit', danger: false },
  ];
  //conditionally show delete menu items depending if address in this row default or not
  if (!row.isDefault) {
    menuItems.push({ key: 'delete', handler: 'delete', name: 'Delete', danger: true });
  }

  const menu = (row: IAddress) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IAddress) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (addressId: string) => {
    props.open({
      title: 'Edit Address',
      component: 'AddressFormEdit',
      place: 'AddressDashboard',
      width: 800,
      addressId,
    });
  };

  const deletePrompt = (address: IAddress) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${address.address}`,
      okType: 'danger',
      onOk: () => props.addressDeleteById({ addressId: address._id, queryParams }),
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
  addressDeleteById: (payload: IAddressDeleteById) => dispatch({ type: 'AddressDashboard/deleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
