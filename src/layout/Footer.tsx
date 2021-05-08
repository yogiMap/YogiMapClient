import React from 'react';
import { Link } from 'umi';

const menu1 = [
  { link: '/faq', text: 'Help & FAQ' },
  { link: '/contact', text: 'ContactUs' },
  { link: '/sitemap', text: 'Site Map' },
];

const menu2 = [
  { link: '/teacherAccount', text: 'Find Your Teacher' },
  { link: '/classes', text: 'Find Your Classes' },
];

const menu3 = [
  { link: '/library', text: 'Our Library' },
  { link: '/styles', text: 'Yoga Styles Guide' },
  // { link: '/type', text: 'Class Type Guide' },
];

const Footer = () => {
  return (
    <div className="footer p-5">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-3 info">
            <h6 className="footer-headings">YOGIMAP INFO</h6>
            <footer className="small pb-3">
              {menu1.map((el) => (
                <div>
                  <Link key={el.link} to={el.link} className="me-2 small">
                    {el.text}
                  </Link>
                </div>
              ))}
            </footer>
          </div>

          <div className="col-lg-3  info">
            <h6 className="footer-headings">YOGIMAP CATEGORIES</h6>
            <footer className="small pb-3">
              {menu2.map((el) => (
                <div>
                  <Link key={el.link} to={el.link} className="me-2 small">
                    {el.text}
                  </Link>
                </div>
              ))}
            </footer>
          </div>

          <div className="col-lg-3  info">
            <h6 className="footer-headings">YOGIMAP RESOURCES</h6>
            <footer className="small">
              {menu3.map((el) => (
                <div>
                  <Link key={el.link} to={el.link} className="me-2 small">
                    {el.text}
                  </Link>
                </div>
              ))}
            </footer>
          </div>
        </div>
      </div>

      <p className="copyright">
        Copyright ©2021 YogiMap. All rights reserved. YogiMap`s <a href="">Terms & Conditions</a>.
      </p>
    </div>
  );
};

export default Footer;
