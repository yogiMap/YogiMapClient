import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  vendorTypeId: string;
  name: string;
  vendorTypeGetById: (id: string) => void;
}

const VendorTypeView = (props: IProps) => {
  const vendorTypeId = get(props, 'match.params.vendorTypeId');
  const name = get(props, 'VendorTypeView.name', '');

  console.log(props);

  useEffect(() => {
    props.vendorTypeGetById(vendorTypeId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  VendorTypeView: state.VendorTypeView,
});

const mapDispatchToProps = (dispatch: any) => ({
  vendorTypeGetById: (payload: string) => dispatch({ type: 'VendorTypeView/vendorTypeGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorTypeView);
