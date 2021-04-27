import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import StyleForm from '@/pages/style/form/StyleForm';
import { IStyle } from '@/pages/style/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (styleId: string) => void;
  reset: () => void;
  updateById: any;
  styleInfo: IStyle;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StyleFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const styleId: string = get(props, 'sidepanel.styleId', '');

  const isLoadingGet = get(props, 'loadingEffects.StyleForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.StyleForm/updateById', false);

  useEffect(() => {
    props.getById(styleId);
  }, []);

  const onFinish = (values: IStyle) => {
    props.updateById({ values, styleId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <StyleForm
      onFinish={onFinish}
      initialValues={props.styleInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  styleInfo: state.StyleForm.styleInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'StyleForm/reset' }),
  updateById: (payload: IStyle) => dispatch({ type: 'StyleForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'StyleForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StyleFormEditWrapper));
