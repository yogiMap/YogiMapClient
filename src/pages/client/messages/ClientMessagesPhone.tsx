import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get, omitBy } from 'lodash';
import ClientMessagesPhoneList from '@/pages/client/messages/ClientMessagesPhoneList';
import Pager from '@/pages/utils/pager/Pager';
import { history } from '@@/core/history';
// import { IClientAddressQueryParams } from '@/pages/client/types';
import ClientMessageForm from './form/ClientMessageForm';

const initialSearchForm = {
  searchParam1: '',
  searchParam2: '',
};

const initialSearchQuery = {
  limit: 10,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  clientId: string;
  messageSearch: (arg: any) => void;
  //ClientAddress: any;
}

const ClientMessagesPhone = (props: IProps) => {
  //const clientId = get(props, 'match.params.clientId');
  const clientId = get(props, 'clientId');
  const clientMessagesList = get(props, 'ClientMessage.messageList', []);
  const pager = get(props, 'ClientMessage.messagePager', {});
  const limit = pager.limit;
  const pageCurrent = pager.pageCurrent;
  const queryParams = { limit: limit, page: pageCurrent };

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.messageSearch({ ...getSearchQuery(), clientId });

    return () => {
      // props.addressReset();
    };
  }, []);

  // const onFiltersChange = (values: any) => {
  //   // обнулять pager при каждом новом поиске
  //   const query = getSearchQuery({ ...values, page: 1 });
  //   history.push({ query });
  // };

  const onPagerChange = (page: number) => {
    props.messageSearch({ ...getSearchQuery({ page }), clientId });
    // history.push({ query });
  };

  return (
    <div>
      {/* <ClientAddressFilterForm filters={getSearchQuery()} onChange={onFiltersChange} /> */}
      <ClientMessagesPhoneList items={clientMessagesList} clientId={clientId} />
      <Pager pager={pager} onChange={onPagerChange} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClientMessage: state.ClientMessage,
});

const mapDispatchToProps = (dispatch: any) => ({
  messageSearch: (payload: any) => dispatch({ type: 'ClientMessage/search', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientMessagesPhone);
