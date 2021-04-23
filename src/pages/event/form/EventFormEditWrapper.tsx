import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import eventForm from '@/pages/event/form/eventForm';
import { Ievent } from '@/pages/event/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (eventId: string) => void;
  reset: () => void;
  updateById: any;
  eventInfo: Ievent;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const eventFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const eventId: string = get(props, 'sidepanel.eventId', '');

  const isLoadingGet = get(props, 'loadingEffects.eventForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.eventForm/updateById', false);

  useEffect(() => {
    props.getById(eventId);
  }, []);

  const onFinish = (values: Ievent) => {
    props.updateById({ values, eventId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <eventForm
      onFinish={onFinish}
      initialValues={props.eventInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  eventInfo: state.eventForm.eventInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'eventForm/reset' }),
  updateById: (payload: Ievent) => dispatch({ type: 'eventForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'eventForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(eventFormEditWrapper));
