import React from 'react';
import { Link } from 'umi';

const menu1 = [
  { link: '/faq', text: 'Help & FAQ' },
  { link: '/contact', text: 'ContactUs' },
  { link: '/sitemap', text: 'Site Map' },
];

const menu2 = [
  { link: '/teachers', text: 'Find Your Teacher' },
  { link: '/classes', text: 'Find Your Classes' },
];

const menu3 = [
  { link: '/library', text: 'Our Library' },
  { link: '/guide', text: 'Yoga Styles Guide' },
];

const Footer = () => {
  return (
    <div className="footer p-5">
      <div className="container">
        <div className="row d-flex justify-content-center">

          <div className="col-lg-3 info">
            <h6>YOGIMAP INFO</h6>
            <footer className="small pb-3">
              {menu1.map((el) => (
                <div key={el.link} className="m-2">
                  <a href=''> {el.text}</a>
                </div>
              ))}
            </footer>
          </div>

          <div className="col-lg-3  info">
            <h6>YOGIMAP CATEGORIES</h6>
            <footer className="small pb-3">
              {menu2.map((el) => (
             <div key={el.link} className="m-2">
               <a href=''> {el.text}</a>
             </div>
              ))}
            </footer>
          </div>

          <div className="col-lg-3  info">
            <h6>YOGIMAP RESOURCES</h6>
            <footer className="small">
              {menu3.map((el) => (
                <div key={el.link} className="m-2">
                  <a href=''> {el.text}</a>
                </div>
              ))}
            </footer>
          </div>

        </div>
      </div>

      <p className="copyright">Copyright ©2021 YogiMap. All rights reserved. YogiMap`s  <a href="">Terms & Conditions</a>.</p>
    </div>
  );
};

export default Footer;
