import React from 'react';
import { connect } from 'umi';
import StyleForm from '@/pages/style/form/StyleForm';
import { IStyle } from '@/pages/style/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IStyle) => void;
  loadingEffects: ILoadingEffects;
}

const StyleFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IStyle) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.StyleForm/create', false);

  return <StyleForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IStyle) => dispatch({ type: 'StyleForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyleFormCreateWrapper);
