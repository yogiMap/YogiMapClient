import React from 'react';
import { connect, Link } from 'umi';
import rishikesh from '@/pages/pages/homePage/images/rishikesh2.png';
import yogigirl from '@/pages/pages/homePage/images/yogigirl.png';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');

  return (

    <>

      <img src={rishikesh} className="align-content-center w-100" alt="YogiMap" title="YogiMap" />


    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-6">
          <h3>All you need to know about yoga:</h3>

          <ul className="benefits">
            <li>Recommendations and ratings of teachers and studios.</li>
            <li>Description of different yoga schools and trainings.</li>
            <li>List, dates and raiting of yoga retreats.</li>
            <li>Resource of yoga knowledge (online library of yogic ancient work).
            </li>
            <li>Online school with freelancers - teaching Sanskrit, reading and
              explanation of ancient books (Bhagavat Gita, Ramayana…), studding and understanding different
              religions and mystical practices (Hinduism, Buddhism, Cabala, Dhaosism… ).
            </li>
            <li>Ayurvedic resource (library, lectures).</li>
          </ul>

          <a href="#contact">Discover More</a>
        </div>

        <div className="col-lg-6">
          <img src={yogigirl} className="align-content-center w-100" alt="YogiMap " title="YogiMap " />
        </div>
      </div>

      <div className="row">
          <div className="col-lg-7">

            </div>


          <div className="col-lg-5">
            {/*<img src={img2} className="align-content-center w-100" alt="YogiMap " title="YogiMap " />*/}
          </div>
        </div>
    </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
