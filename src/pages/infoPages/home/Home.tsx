import React, { useEffect } from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import body from '@/pages/infoPages/home/images/yogigirl.png';
// @ts-ignore
import mind from '@/pages/infoPages/home/images/crystals.jpeg';
// @ts-ignore
import soul from '@/pages/infoPages/home/images/monks.jpg';

interface IProps {
  User: IUser;
  closeMobileMenu: () => void;
}

function Home(props: IProps) {
  const isUserAuth = get(props, 'User._id');

  useEffect(() => {
    props.closeMobileMenu();
  }, []);
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
            <div className="row">
              <div className="col d-flex justify-content-center">
                <Link to="/user/register" className="home-button">
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
            <div className="col d-flex justify-content-center">
              <ul className="home-text-about">
                <li>Yoga is the always changing conception.</li>
                <li>
                  Online resources are the important way of teaching by individual yoga instructors for the last year.
                </li>
                <li> Our space helps you to find your own teacher for your body, mind and soul improvement.</li>
                <li>Also here you will find your community and all information about yoga.</li>
              </ul>
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

      <div className="blue-stripe">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="d-flex justify-content-center">
              <p className="home-blue-stripe-text">
                ???Yoga takes you into the present moment, the only place where life exists.??? ??? Pata??jali.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-bg-informational-block">
        <div className="container-fluid home-informational-block-white-bg">
          <div className="row">
            <div className="col-lg-4 d-flex justify-content-center">
              <div className="my-lg-5 ">
                <h2 className="education mb-lg-4 text-center">EDUCATION</h2>
                <p>
                  Yoga education helps in self discipline and sel-control, leading to immense amount of awareness,
                  concentration and higher level of consciousness. Yogamap offers you updated list of ongoing classes &
                  events, as well as online resources to study Science of Yoga in all aspects of this ancient study. We
                  offer resources for maintaining good health, menthal, hygiene, emotional stability and moral values.
                </p>
              </div>
            </div>

            <div className="col-lg-4 d-flex justify-content-center">
              <div className="my-lg-5">
                <h2 className="information mb-lg-4 text-center">INFORMATION</h2>
                <p>
                  In sanskrit, ???Guru??? refers to a spiritual teacher who leads a willing student to the realization of
                  their true nature. Whether your goals are spiritual, physical or emotional, you want to know that you
                  are getting somewhere. The perfect teacher for you is the one that helps guides you along your
                  journey. At Yoga map you would be able to find yours.
                </p>
              </div>
            </div>

            <div className="col-lg-4 d-flex justify-content-center">
              <div className="my-lg-5">
                <h2 className="community mb-lg-4 text-center">COMMUNITY</h2>
                <p>
                  Community is about union and connection. Building a yoga community is a beneficial step to bringing
                  every yogi together to increase positivity and health. YogiMap is the place to feel safe, unite with
                  like-minded yogies, be inspired for personal growth and stay motivated to become a better human.
                </p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 d-flex justify-content-center">
              <button className="button-primary">LEARN MORE</button>
            </div>
          </div>
        </div>
      </div>

      <div className="green-stripe"></div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  User: state.User,
  mobileMenu: state.mobileMenu,
});

const mapDispatchToProps = (dispatch: any) => ({
  closeMobileMenu: () => dispatch({ type: 'MobileMenu/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
