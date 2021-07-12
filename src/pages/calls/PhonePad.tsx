import React from 'react';
import '@/pages/calls/style.css';
import { connect } from 'umi';
import phoneCall from '@/icons/phone-call.svg';
import { get } from 'lodash';
import { IClient, IClientQueryParams } from '@/pages/client/types';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

export interface IProps {
  callClient: () => void;
  row: IClient;
  queryParams: IClientQueryParams;
  open: (arg: any) => void;
}

interface ICallClient {
  clientPhone: string;
  clientId: string;
}

function PhonePad(props: IProps) {
  const userPhone = get(props, 'userPhone', '');
  const userId = get(props, 'userId', '');
  console.log(' == userId from PhonePad==: ', userId);

  return (
    <div>
      <div className="container-pad center-block">
        <div className="output">{userPhone}</div>
        <div className="row text-center">
          <div className="col digit-pad" id="one">
            1
          </div>
          <div className="col digit-pad" id="two">
            2<div className="sub-pad">ABC</div>
          </div>
          <div className="col digit-pad" id="three">
            3<div className="sub-pad">DEF</div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col digit-pad" id="four">
            4<div className="sub-pad">GHI</div>
          </div>
          <div className="col digit-pad" id="five">
            5<div className="sub-pad">JKL</div>
          </div>
          <div className="col digit-pad" id="six">
            6<div className="sub-pad">MNO</div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col digit-pad" id="seven">
            7<div className="sub-pad">PQRS</div>
          </div>
          <div className="col digit-pad" id="eight">
            8<div className="sub-pad">TUV</div>
          </div>
          <div className="col digit-pad" id="nine">
            9<div className="sub-pad">WXYZ</div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col digit-pad"> * </div>
          <div className="col digit-pad"> 0 </div>
          <div className="col digit-pad"> # </div>
        </div>

        <div className="row text-center">
          <div className="col digit-pad"> </div>
          <div className="col text-center">
            {/*@ts-ignore*/}
            <button className="btn" onClick={props.callUser}>
              {/*<i className='glyphicon glyphicon-plus'></i>*/}
              <img src={phoneCall} alt="" height="44" />
            </button>
          </div>
          <div className="col digit-pad"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userPhone: state.Sidepanel.userPhone,
  userId: state.Sidepanel.userId,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  callUser: (payload: ICallClient) => dispatch({ type: 'ClientDashboard/callUser', payload: '19546123577' }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(PhonePad);
