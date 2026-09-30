import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer_top">
        <div className="container footer_cont">
          <div className="row">
            {/* Logo and Address */}
            <div className="col-xl-3 col-md-4 col-12 mb-5">
              <div className="footer_container">
                <div className="footer-head hide mb-3">
                  <Link to="/" aria-label="logo">
                    <img
                      src="/cdn-cgi/image/w=300,fit=scale-down,f=auto,q=70/static/website/assets/images/logo/logo.webp"
                      alt="Thaagam Foundation logo"
                    />
                  </Link>
                </div>
                <ul className="footer_address hide list-unstyled">
                  <li className="mb-2">
                    <p className="m-0">
                      <span>Address : </span>
                      <a
                        href="https://maps.app.goo.gl/r8k4eQWY9zNC6Fwa6"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="address"
                      >
                        No.6, Dhanammal street, Spurtank road, chetpet, Chennai 600-031
                      </a>
                    </p>
                  </li>

                  <li className="mb-2">
                    <p className="m-0">
                      <span>E-mail : </span>
                      <a href="mailto:contact@thaagam.org" aria-label="mail">
                        contact@thaagam.org
                      </a>
                    </p>
                  </li>

                  <li className="mb-2">
                    <p className="m-0">
                      <span>Phone : </span>
                      <a href="tel:+918069169691" aria-label="mobile-number">
                        +91 80 691 69691
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Support */}
            <div className="col-xl-3 col-md-4 col-6">
              <div className="footer_container">
                <div className="footer-head mb-3">
                  <h5>Our Support</h5>
                </div>
                <ul className="footer_address list-unstyled">
                  <li>
                    <a href="https://support.m7corporation.com/raise/thaagam-foundation/" target="_blank" rel="noreferrer" aria-label="help-desk">
                      Support
                    </a>
                  </li>
                  <li>
                    <Link to="/privacy_policy" aria-label="privacy-policy">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/Refund_Policy" aria-label="refund-policy">
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms_conditions" aria-label="terms-conditions">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/Report_bugs" aria-label="report-bugs">
                      Report bugs
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" aria-label="contact">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-xl-3 col-md-4 col-6">
              <div className="footer_container">
                <div className="footer-head mb-3">
                  <h5>Quick Links</h5>
                </div>
                <ul className="footer_address list-unstyled">
                  <li>
                    <Link to="/food" aria-label="about-us">
                      Fight Hunger Together
                    </Link>
                  </li>
                  <li>
                    <Link to="/environment" aria-label="about-us">
                      Creating a Better Environment
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" aria-label="about-us">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/homeless" aria-label="homeless-food">
                      Feed a Homeless Person
                    </Link>
                  </li>
                  <li>
                    <Link to="/egg_milk" aria-label="egg_milk">
                      Give Egg &amp; Milk
                    </Link>
                  </li>
                  <li>
                    <Link to="/causes" aria-label="causes">
                      All Causes
                    </Link>
                  </li>
                  <li>
                    <a href="https://hrms.m7corporation.com/register/D6KF0W/" target="_blank" rel="noreferrer" aria-label="hr-portal">
                      Careers
                    </a>
                  </li>
                  <li>
                    <Link to="/volunteer" aria-label="volunteer">
                      Volunteer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Connect With us */}
            <div className="col-xl-3 col-md-4 col-6">
              <div className="footer_container">
                <div className="footer-head mb-3">
                  <h5>Connect With us</h5>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <a
                    href="https://www.facebook.com/people/Thaagam-Foundation-NGO/100077294806563/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="facebook"
                  >
                    <i className="footer-icons facebook ri-facebook-circle-fill fs-3"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/thaagamfoundation/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="instagram"
                  >
                    <i className="footer-icons ri-instagram-fill fs-3"></i>
                  </a>
                  <a
                    href="https://twitter.com/thaagamngo"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="twitter"
                  >
                    <i className="footer-icons twitter ri-twitter-x-fill fs-3"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/thaagamfoundation/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="linked-in"
                  >
                    <i className="footer-icons linkedin ri-linkedin-box-fill fs-3"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@thaagamfoundation9777"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="youtube"
                  >
                    <i className="footer-icons youtube ri-youtube-fill fs-3"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer_bottom py-3" style={{ backgroundColor: "#0b1526" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 footer_bottom_container text-center">
              <p className="m-0 text-white-50 small">
                &copy; {new Date().getFullYear()}{" "}
                <Link to="/" className="text-white text-decoration-none fw-semibold">
                  Thaagam Foundation
                </Link>{" "}
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
