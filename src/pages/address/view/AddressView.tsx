import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Button, Tag } from 'antd';

const AddressView = (props: any) => {
  const addressId: string = get(props, 'match.params.addressId');
  const code: string = get(props, 'AddressView.code', '');
  const addressLine1: string = get(props, 'AddressView.addressLine1', '');
  const addressLine2: string = get(props, 'AddressView.addressLine2', '');
  const state: string = get(props, 'AddressView.state', '');
  const city: string = get(props, 'AddressView.city', '');
  const zipCode: string = get(props, 'AddressView.zipCode', '');
  const countryName: string = get(props, 'AddressView.countryName', '');
  const isDefault: boolean = get(props, 'AddressView.isDefault', false);

  useEffect(() => {
    props.addressGetById(addressId);
  }, []);

  return (
    <div className="d-print-block">
      <h6>
        Address {code} {isDefault && <Tag color="default">default</Tag>}
      </h6>
      <div className="mb-1">{addressLine1}</div>
      <div className="mb-1">{addressLine2}</div>
      <div className="mb-1">{city}</div>
      <div className="mb-1">{state}</div>
      <div className="mb-1">{zipCode}</div>
      <div className="mb-1">{countryName}</div>

      <Button type="primary" className="ms-0 mt-2  d-print-none" onClick={() => window.print()}>
        Print
      </Button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  AddressView: state.AddressView,
});

const mapDispatchToProps = (dispatch: any) => ({
  addressGetById: (payload: string) => dispatch({ type: 'AddressView/getById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressView);
