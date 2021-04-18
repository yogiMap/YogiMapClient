import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import body from '@/pages/pages/homePage/images/yogigirl.png';
import mind from '@/pages/pages/homePage/images/crystals.jpeg';
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
              <div className="col-lg-4 my-lg-5 my-2 d-flex justify-content-lg-start justify-content-center">
                <Link to="/user/register/teacher" className="home-button my-2">
                  I‘M A TEACHER
                </Link>
              </div>

              <div className="col-lg-4 my-lg-5 d-flex justify-content-lg-end justify-content-center">
                <Link to="/user/register" className="home-button my-2">
                  I’M A STUDENT
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="home-description">
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
                <img src={mind} alt="mind" className="img-body-mind-soul"/>
                <div className="home-stripe-mind">
                  <Link to="" className="button-body-mind-soul">
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
          <div className="col-lg-3 d-flex justify-content-center">
            <div className="mt-5 mb-lg-5 px-5 home-informational-block">
              <h2 className="mb-lg-4">EDUCATION</h2>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi
              </p>
            </div>
          </div>

          <div className="col-lg-3 d-flex justify-content-center">
            <div className="my-lg-5 px-5 home-informational-block">
              <h2 className="mb-lg-4">INFORMATION</h2>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi
              </p>
            </div>
          </div>

          <div className="col-lg-3 d-flex justify-content-center">
            <div className="my-lg-5 px-5 home-informational-block">
              <h2 className="mb-lg-4">COMMUNITY</h2>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi
              </p>
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
