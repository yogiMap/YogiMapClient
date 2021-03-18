import React from 'react';
import { connect } from 'umi';
import yogigirl from '@/pages/pages/homePage/images/yogigirl.png';
import crystals from '@/pages/pages/homePage/images/crystals.png';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');

  return (
    <>
      <section id="product-overview">
        <div className="main-header">
          <h1>Here you will find your yoga teacher, studio and your yoga community.</h1>
          <h2 className="m-3">Descriptions, schedules, information, education in yoga.</h2>

          {!isUserAuth && (
            <div className="mt-3 mb-3 text-center">
              <a href="/user/register" className="btn btn-outline-primary fs-3 fw-bold text-white px-5 m-2 ">I am Teacher </a>
              <a href="/user/register" className="btn btn-outline-primary fs-3 fw-bold text-white px-5 m-2">I am Student</a>
            </div>
          )}
        </div>
      </section>

      <section id="product-description" className="container mt-5 mb-5 mx-auto">
        <div className="row">
          <div className="col-lg-6 p-2">
            <h3>All you need to know about yoga:</h3>
            <ul className="benefits">
              <li>Recommendations and ratings of teachers and studios.</li>
              <li>Description of different yoga schools and trainings.</li>
              <li>List, dates and raiting of yoga retreats.</li>
              <li>Resource of yoga knowledge (online library of yogic ancient work).</li>
              <li>
                Online school with freelancers - teaching Sanskrit, reading and explanation of ancient books (Bhagavat
                Gita, Ramayana…), studding and understanding different religions and mystical practices (Hinduism,
                Buddhism, Cabala, Dhaosism… ).
              </li>
              <li>Ayurvedic resource (library, lectures).</li>
            </ul>
            <a href="#contact">Discover More</a>
          </div>

          <div className="col-lg-6 p-2">
            <img
              src={yogigirl}
              className="align-content-center img-fluid img-thumbnail rounded"
              alt="YogiMap "
              title="YogiMap "
            />
          </div>
        </div>

        <div className="row m-2">
          <div className="col-lg-7 p-2">
            <img
              src={crystals}
              className="align-content-center img-fluid img-thumbnail rounded"
              alt="YogiMap "
              title="YogiMap "
            />
          </div>

          <div className="col-lg-5 p-2">
            <p>
              We are the group of human beings who are totally in love with yoga gathering here to help you in your
              spiritual journey. We had yoga studios in India (Mumbai, New Delhi, Haridvar). Our teachers had got the
              yoga education in ashrams also some of them studied yoga here in US in such places as Loyola Marymount
              University (LMU) on Yoga studies… We created this online yoga resourse because we had the systematic
              knowledge about history, philosophy, physical and psychological effects of mystical practices we want to
              share with you.
            </p>
            <p>
              We are collaborating with spiritual leaders and famous teachers to share the deep inner Knowledge. As well
              we have the space where general people can discuss their experiences, challenges, doubts, mistakes and
              obstacles on their spiritual way and to get an advices from an expert and to find a qualified mentor and
              even to find a right guru. It is especially important to us your physical and psychological health so we
              are strict with quality of our teachers and our recommendations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
