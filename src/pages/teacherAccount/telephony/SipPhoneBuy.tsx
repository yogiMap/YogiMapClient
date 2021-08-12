import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import { ISipPhone } from '@/pages/telephony/types';
import { Button, Table, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';

interface IAvailablePhone {
  addressRequirements: string;
  capabilities: { voice: boolean; SMS: boolean; MMS: boolean };
  friendlyName: string;
  isoCountry: string;
  lata: string;
  latitude: number;
  locality: string;
  longitude: number;
  phoneNumber: string;
  postalCode: string;
  rateCenter: string;
  region: string;
}

interface IAvailablePhoneNumbersRequest {
  teacherAccountId: string;
}
interface IBuyPhoneNumbersRequest {
  teacherAccountId: string;
  phoneNumber: string;
}

interface IProps {
  create: (arg: ISipPhone) => void;
  loadingEffects: ILoadingEffects;
  availablePhoneNumbers: (args: IAvailablePhoneNumbersRequest) => void;
  buyPhoneNumber: (args: IBuyPhoneNumbersRequest) => void;
}

const SipPhoneBuy = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.Telephony/create', false);
  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');

  const availableNumbers = get(props, 'Telephony.availablePhoneNumbers', []);

  useEffect(() => {
    props.availablePhoneNumbers({ teacherAccountId });
  }, []);

  const buyNumber = (row: IAvailablePhone) => {
    console.log(row.phoneNumber);
    props.buyPhoneNumber({ phoneNumber: row.phoneNumber, teacherAccountId });
  };

  const columns: ColumnProps<IAvailablePhone>[] = [
    {
      title: 'Number',
      dataIndex: 'friendlyName',
      key: 'friendlyName',
    },

    {
      title: 'Capabilities',
      dataIndex: 'capabilities',
      render: (capabilities) => (
        <>
          {Object.keys(capabilities).map((key) => {
            return capabilities[key] === true ? (
              <Tag color={'geekblue'} key={key}>
                {key}
              </Tag>
            ) : null;
          })}
        </>
      ),
    },
    {
      title: 'Monthly fee',
      dataIndex: 'fee',
      render: () => <>$10</>,
    },
    {
      title: 'Action',
      render: (row) => (
        <Button type="primary" onClick={() => buyNumber(row)}>
          Buy number
        </Button>
      ),
    },
  ];

  if (isLoading || !availableNumbers.length) return null;

  return <Table rowKey="phoneNumber" columns={columns} dataSource={availableNumbers} size="middle" />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Sidepanel: state.Sidepanel,
  Telephony: state.Telephony,
});

const mapDispatchToProps = (dispatch: any) => ({
  availablePhoneNumbers: (payload: IAvailablePhoneNumbersRequest) =>
    dispatch({ type: 'Telephony/availablePhoneNumbers', payload }),
  buyPhoneNumber: (payload: IBuyPhoneNumbersRequest) => dispatch({ type: 'Telephony/buyPhoneNumber', payload }),
  create: (payload: ISipPhone) => dispatch({ type: 'Telephony/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneBuy);
