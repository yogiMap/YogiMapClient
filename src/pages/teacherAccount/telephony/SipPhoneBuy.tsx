import React, { useEffect, useState } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import { ISipPhone } from '@/pages/telephony/types';
import { Button, Table, Tag, Radio, Input } from 'antd';
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
  areaCode: string;
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
  tollFreePhoneNumbers: () => void;
}

const SipPhoneBuy = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [areaCode, setAreaCode] = useState('');
  const [mode, setMode] = useState('');
  const isLoading = get(props, 'loadingEffects.Telephony/create', false);
  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');

  const availableNumbers = get(props, 'Telephony.availablePhoneNumbers', []);
  const tollFreeNumbers = get(props, 'Telephony.tollFreePhoneNumbers', []);

  // useEffect(() => {
  //   props.availablePhoneNumbers({ teacherAccountId});
  // }, []);

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setMode(mode);
  };
  const getNumbersByCode = () => {
    props.availablePhoneNumbers({ areaCode });
  };

  const getTollFreeNumbers = () => {
    props.tollFreePhoneNumbers();
    setOpen(!open);
  };

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

  // if (isLoading || !availableNumbers.length) return null;

  return (
    <>
      <h5>Number Type</h5>
      <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 15 }}>
        <Radio.Button value="local" onClick={() => setOpen(!open)}>
          Local
        </Radio.Button>
        <Radio.Button value="tollFree" onClick={getTollFreeNumbers}>
          Toll-free
        </Radio.Button>
      </Radio.Group>
      {open && (
        <div className="row">
          <div className="col-2">
            <Input
              value={areaCode}
              placeholder="Area Code"
              maxLength={3}
              onChange={(e) => setAreaCode(e.target.value)}
            />
          </div>

          <div className="col-8">
            <Button type="primary" onClick={getNumbersByCode}>
              Search
            </Button>
          </div>
        </div>
      )}
      {mode === 'local' ? (
        <Table rowKey="phoneNumber" columns={columns} dataSource={availableNumbers} size="middle" pagination={false} />
      ) : (
        <Table rowKey="phoneNumber" columns={columns} dataSource={tollFreeNumbers} size="middle" pagination={false} />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Sidepanel: state.Sidepanel,
  Telephony: state.Telephony,
});

const mapDispatchToProps = (dispatch: any) => ({
  availablePhoneNumbers: (payload: IAvailablePhoneNumbersRequest) =>
    dispatch({ type: 'Telephony/availablePhoneNumbers', payload }),
  tollFreePhoneNumbers: () => dispatch({ type: 'Telephony/tollFreePhoneNumbers' }),
  buyPhoneNumber: (payload: IBuyPhoneNumbersRequest) => dispatch({ type: 'Telephony/buyPhoneNumber', payload }),
  create: (payload: ISipPhone) => dispatch({ type: 'Telephony/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneBuy);
