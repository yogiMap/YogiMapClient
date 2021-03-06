import { IPayment, IPaymentQueryParams } from '@/pages/payment/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IPaymentDeleteById {
  paymentId: string;
  queryParams: IPaymentQueryParams;
}

interface IProps {
  row: IPayment;
  open: (arg: ISidepanel) => void;
  paymentDeleteById: (arg: IPaymentDeleteById) => void;
  queryParams: IPaymentQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IPayment) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IPayment) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (paymentId: string) => {
    props.open({
      title: 'Edit Payment',
      component: 'PaymentFormEdit',
      place: 'PaymentDashboard',
      width: 800,
      paymentId,
    });
  };

  const deletePrompt = (payment: IPayment) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${payment.paymentNumber}`,
      okType: 'danger',
      onOk: () => props.paymentDeleteById({ paymentId: payment._id, queryParams }),
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
  paymentDeleteById: (payload: IPaymentDeleteById) => dispatch({ type: 'PaymentDashboard/paymentDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
