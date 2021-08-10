import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import { ISipPhone } from '@/pages/telephony/types';
import { Button, Table, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { IBase } from '@/pages/base/types';
import ActionMenu from '@/pages/base/dashboard/search/ActionMenu';

interface IProps {
  create: (arg: ISipPhone) => void;
  loadingEffects: ILoadingEffects;
  availablePhoneNumbers: (teacherAccountId: string) => void;
}

const SipPhoneBuy = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.Telephony/create', false);
  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');
  const availableNumbers = get(props, 'Telephony.availablePhoneNumbers', []);
  // const onFinish = (values: ISipPhone) => {
  //   values.teacherAccount = teacherAccountId;
  //   props.create(values);
  // };

  useEffect(() => {
    props.availablePhoneNumbers({ teacherAccountId });
  }, []);

  useEffect(() => {
    addFeeProperty();
  }, [availableNumbers]);

  const addFeeProperty = () => {
    availableNumbers.forEach(function (item: ColumnProps<IBase>) {
      item.fee = '$10.00';
    });
    return availableNumbers;
  };

  const columns: ColumnProps<IBase>[] = [
    {
      title: 'Number',
      dataIndex: 'friendlyName',
      key: 'friendlyName',
    },

    {
      title: 'Capabilities',
      dataIndex: 'capabilities',
      key: 'capabilities',
      render: (capabilities) => (
        <>
          {Object.keys(capabilities).map((key) => {
            return capabilities[key] === true ? <Tag color={'geekblue'}>{key}</Tag> : null;
          })}
        </>
      ),
    },
    {
      title: 'Monthly fee',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => <Button type="primary">Buy number</Button>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={availableNumbers}
      // scroll={{ x: 500 }}
      size="middle"
      // pagination={false}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Sidepanel: state.Sidepanel,
  Telephony: state.Telephony,
});

const mapDispatchToProps = (dispatch: any) => ({
  availablePhoneNumbers: (teacherAccountId: string) =>
    dispatch({ type: 'Telephony/availablePhoneNumbers', payload: teacherAccountId }),
  create: (payload: ISipPhone) => dispatch({ type: 'Telephony/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneBuy);
