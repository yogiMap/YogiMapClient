import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Drawer } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import BaseFormCreateWrapper from '@/pages/base/form/BaseFormCreateWrapper';
import BaseFormEditWrapper from '@/pages/base/form/BaseFormEditWrapper';
import VendorCreateWrapper from '@/pages/vendor/form/VendorCreateWrapper';
import VendorEditWrapper from '@/pages/vendor/form/VendorEditWrapper';
import VendorTypeCreateWrapper from '@/pages/vendorType/form/VendorTypeCreateWrapper';
import VendorTypeEditWrapper from '@/pages/vendorType/form/VendorTypeEditWrapper';
import ClassesCreateWrapper from '@/pages/classes/form/ClassesFormCreateWrapper';
import ClassesEditWrapper from '@/pages/classes/form/ClassesFormEditWrapper';
interface IProps extends ISidepanel {
  Sidepanel: ISidepanel;
  close: () => void;
}

const Sidepanel = (props: IProps) => {
  const open = get(props, 'Sidepanel.open', false);
  const component = get(props, 'Sidepanel.component', '');
  const title = get(props, 'Sidepanel.title', '');
  const width = get(props, 'Sidepanel.width', 750);

  const components: any = {
    BaseFormCreate: <BaseFormCreateWrapper />,
    BaseFormEdit: <BaseFormEditWrapper />,

    VendorFormCreate: <VendorCreateWrapper />,
    VendorFormEdit: <VendorEditWrapper />,

    ClassesFormCreate: <ClassesCreateWrapper />,
    ClassesFormEdit: <ClassesEditWrapper />,

    VendorTypeFormCreate: <VendorTypeCreateWrapper />,
    VendorTypeFormEdit: <VendorTypeEditWrapper />,
  };

  const mapping = (c: string): any => {
    return components[c] || null;
  };

  const onCloseDrawer = () => {
    props.close();
  };

  return (
    <Drawer title={title} width={width} onClose={onCloseDrawer} visible={open}>
      {mapping(component)}
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'Sidepanel/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
