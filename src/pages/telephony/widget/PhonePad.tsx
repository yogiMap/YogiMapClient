import React from 'react';
import { get } from 'lodash';

export interface IProps {
  makeCall: (phoneNumber: string) => void;
  declineCall: () => void;
  digitClick: (value: number) => void;
}

function PhonePad(props: IProps) {
  const phoneNumber = get(props, 'phoneNumber', '');

  const digitClick = (value: number) => {
    props.digitClick(value);
  };

  return (
    <div>
      <div className="container-pad center-block">
        <div className="output">{phoneNumber}</div>

        <div className="row text-center">
          <div className="col digit-pad" id="one" onClick={() => digitClick(1)}>
            1
          </div>

          <div className="col digit-pad" id="two" onClick={() => digitClick(2)}>
            2
          </div>

          <div className="col digit-pad" id="three" onClick={() => digitClick(3)}>
            3
          </div>
        </div>

        <div className="row text-center">
          <div className="col digit-pad" id="four" onClick={() => digitClick(4)}>
            4
          </div>

          <div className="col digit-pad" id="five" onClick={() => digitClick(5)}>
            5
          </div>

          <div className="col digit-pad" id="six" onClick={() => digitClick(6)}>
            6
          </div>
        </div>
        <div className="row text-center">
          <div className="col digit-pad" id="seven" onClick={() => digitClick(7)}>
            7
          </div>
          <div className="col digit-pad" id="eight" onClick={() => digitClick(8)}>
            8
          </div>
          <div className="col digit-pad" id="nine" onClick={() => digitClick(9)}>
            9
          </div>
        </div>
        <div className="row text-center">
          <div className="col digit-pad">*</div>
          <div className="col digit-pad" onClick={() => digitClick(0)}>
            0
          </div>
          <div className="col digit-pad">#</div>
        </div>

        <div className="row text-center">
          <div className="col digit-pad"></div>

          <div className="col text-center">
            <button className="btn" onClick={props.makeCall}>
              {/*<img src={phoneCall} alt='' height='44' />*/}
              Call
            </button>

            <button className="btn btn-danger" onClick={props.declineCall}>
              Decline
            </button>
          </div>

          <div className="col digit-pad"></div>
        </div>
      </div>
    </div>
  );
}

export default PhonePad;
