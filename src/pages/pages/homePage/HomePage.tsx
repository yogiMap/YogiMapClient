import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import body from '@/pages/pages/homePage/images/yogigirl.png';
// @ts-ignore
import mind from '@/pages/pages/homePage/images/crystals.jpeg';
// @ts-ignore
import soul from '@/pages/pages/homePage/images/monks.jpg';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');

  return (
    <>
      <div className="home-bg">
        <div className="home-bg-headers">
          <h1 className="pt-5">DISCOVER YOGA</h1>
          <h1 className="my-4">THE JOURNEY STARTS HERE</h1>
        </div>
      </div>

      <div className="home-stripe-under-bg">
        <div className="container">
          {!isUserAuth && (
            <div className="row d-flex justify-content-center">
              <div className="col-lg-4 my-lg-5 d-flex justify-content-center">
                <Link to="/user/register" className="home-button my-2">
                  JOIN US
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="home-description">
        <div className="container">
        <div className="row my-5">
          <div className="col">
            Yoga is the always changing conception. Online resources are the important way of teaching by individual
            yoga instructor for the last year. Our space helps you to find your own teacher for your body, mind and soul
            improvement. Also here you will be able find your community and all information you were interested about
            yoga.
          </div>
        </div>
        </div>

        <div className="home-bg-header-secondary">
          <h2>FIND YOUR GURU</h2>
        </div>
      </div>

      <div className="my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 d-flex justify-content-center">
            <div>
              <div className="img-container">
                <img src={body} alt="body" className="img-body-mind-soul" />
                <div className="home-stripe-body">
                  <Link to="" className="button-body-mind-soul">
                    BODY
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 d-flex justify-content-center">
            <div>
              <div className="img-container">
                <img src={mind} alt="mind" className="img-body-mind-soul" />
                <div className="home-stripe-mind">
                  <Link to="/teacherType/:teacherTypeId" className="button-body-mind-soul">
                    MIND
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 d-flex justify-content-center">
            <div>
              <div className="img-container">
                <img src={soul} alt="soul" className="img-body-mind-soul" />
                <div className="home-stripe-soul">
                  <Link to="" className="button-body-mind-soul">
                    SOUL
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blue-stripe"></div>

      <div className="home-bg-informational-block">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 d-flex justify-content-center">
            <div className="mt-5 mb-lg-5 px-5 home-informational-block">
              <h2 className="mb-lg-4">EDUCATION</h2>
              <ul>
                <li>Virtual professional development program delivered via 8 modules of content</li>
                <li>Yoga + Mindfulness activity videos for students, staff and families</li>
                <li>
                  Support for adapting practices for different ages, learning environments and classroom or home-based
                  needs
                </li>
                <li> Implementation guide</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 d-flex justify-content-center">
            <div className="my-lg-5 px-5 home-informational-block">
              <h2 className="mb-lg-4">INFORMATION</h2>
              <ul>
                <li> Livestream or recorded self-care practice videos</li>
                <li>Well-being circles (virtual or in-person where possible)</li>
                <li> Consultation</li>
                <li> Webinars and online courses</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 d-flex justify-content-center">
            <div className="my-lg-5 px-5 home-informational-block">
              <h2 className="mb-lg-4">COMMUNITY</h2>
              <ul>
                <li>
                  Community is when people begin to care about one another, and when they begin to share things that are
                  important to one another. Yoga is one of those things
                </li>
                <li>Find your Yoga Community here</li>
                <li>Moving Outside of the Classroom</li>
                <li> A Big Yoga Teachers Community </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 d-flex justify-content-center">
            <button className="button-primary">LEARN MORE</button>
          </div>
        </div>
      </div>

      <div className="green-stripe"></div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
