import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/backendMock';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
    optin_all: false,
  });

  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await api.submitContactForm(formData);
      if (response.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          note: '',
          optin_all: false,
        });
      } else {
        setStatus({ submitting: false, success: false, error: 'Submission failed. Please try again.' });
      }
    } catch (err) {
      console.error('[Contact Error]', err);
      setStatus({ submitting: false, success: false, error: 'Network error occurred. Check console.' });
    }
  };

  return (
    <div className="contact-page">
      {/* Breadcrumb banner */}
      <div className="container py-4">
        <div>
          <h1 className="contact_heading" style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>
            Need Assistance? Reach Out to Our Support Team
          </h1>
        </div>
        <nav aria-label="breadcrumb" className="breadcrumb-row mt-2">
          <ul className="breadcrumb" style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0 }}>
            <li className="breadcrumb-item">
              <Link to="/" style={{ color: '#009dff', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ color: '#6b7280' }}>/</li>
            <li className="breadcrumb-item-1" style={{ color: '#374151', fontWeight: 600 }}>Contact</li>
          </ul>
        </nav>
      </div>

      <div className="container py-4">
        <div className="section_head mb-4">
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937' }}>Our Contacts</h3>
        </div>

        <div className="row align-items-stretch justify-content-center g-4">
          {/* Contact Details Card */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div
              className="locations-box-inner p-4 h-100"
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #e5e7eb',
              }}
            >
              <div className="country_media d-flex align-items-center gap-3 mb-3">
                <img
                  src="https://thaagamorg-eb-s3.s3.amazonaws.com/static/website/images/country/india.png"
                  alt="India"
                  style={{ width: '36px', height: '24px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h6 className="title m-0" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>India</h6>
              </div>

              <div className="dz_content mb-4">
                <h4
                  className="title mb-3"
                  style={{ fontSize: '1rem', fontWeight: 500, color: '#4b5563', lineHeight: 1.6 }}
                >
                  No.6, Dhanammal street, Spurtank road, Chetpet, Chennai 600-031
                </h4>

                <div className="contact_info row g-3 mt-2">
                  <div className="col-sm-6">
                    <div style={{ background: '#f9fafb', padding: '12px 16px', borderRadius: '10px' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#009dff', marginBottom: '4px' }}>
                        <i className="ri-phone-fill me-1"></i> Call Us
                      </h4>
                      <p className="m-0">
                        <a
                          href="tel:+918069169691"
                          style={{ color: '#111827', textDecoration: 'none', fontWeight: 600 }}
                        >
                          +91 8069169691
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div style={{ background: '#f9fafb', padding: '12px 16px', borderRadius: '10px' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#009dff', marginBottom: '4px' }}>
                        <i className="ri-mail-fill me-1"></i> Email Us
                      </h4>
                      <p className="m-0">
                        <a
                          href="mailto:contact@thaagam.org"
                          style={{ color: '#111827', textDecoration: 'none', fontWeight: 600 }}
                        >
                          contact@thaagam.org
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="contact-map">
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                  <i className="ri-map-pin-fill text-danger me-1"></i> Our Location
                </h4>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #d1d5db' }}>
                  <iframe
                    title="Thaagam Foundation Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.420426658306!2d80.24402777580421!3d13.072520012656193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267a0180785f5%3A0x697a4d6c005381ce!2sThaagam%20Foundation!5e0!3m2!1sen!2sin!4v1697689901294!5m2!1sen!2sin"
                    width="100%"
                    height="240"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div
              className="contact-form p-4 h-100"
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #e5e7eb',
              }}
            >
              <h4 className="title mb-3" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827' }}>
                Quick Contact Form
              </h4>

              {status.success && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="alert">
                  <i className="ri-checkbox-circle-fill text-success fs-5"></i>
                  <div>
                    <strong>Thank you!</strong> Your message has been sent successfully. Our support team will get in touch with you shortly.
                  </div>
                </div>
              )}

              {status.error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
                  <i className="ri-error-warning-fill text-danger fs-5"></i>
                  <div>{status.error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} id="contactForm">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form_group">
                      <label htmlFor="name" className="form-label fw-semibold" style={{ fontSize: '0.9rem' }}>
                        Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        maxLength="30"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px', padding: '10px 14px' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form_group">
                      <label htmlFor="email" className="form-label fw-semibold" style={{ fontSize: '0.9rem' }}>
                        Email*
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        maxLength="40"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px', padding: '10px 14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form_group">
                      <label htmlFor="phone" className="form-label fw-semibold" style={{ fontSize: '0.9rem' }}>
                        Phone*
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Your Phone Number"
                        maxLength="11"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px', padding: '10px 14px' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form_group">
                      <label htmlFor="address" className="form-label fw-semibold" style={{ fontSize: '0.9rem' }}>
                        Address*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Your Address"
                        maxLength="120"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px', padding: '10px 14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form_group mb-3">
                  <label htmlFor="note" className="form-label fw-semibold" style={{ fontSize: '0.9rem' }}>
                    Case Description*
                  </label>
                  <textarea
                    className="form-control"
                    id="note"
                    name="note"
                    placeholder="Your Message or Case Description"
                    rows="4"
                    value={formData.note}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '8px', padding: '10px 14px' }}
                  ></textarea>
                </div>

                {/* Consent checkbox */}
                <div className="card border-primary-subtle bg-light mb-4" style={{ borderRadius: '10px' }}>
                  <div className="card-body p-3">
                    <div className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="consentCheck"
                        name="optin_all"
                        checked={formData.optin_all}
                        onChange={handleChange}
                        style={{ cursor: 'pointer' }}
                      />
                      <label className="form-check-label fw-medium" htmlFor="consentCheck" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                        I agree to receive updates via <strong>SMS, WhatsApp &amp; Email</strong>.
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submitBtn"
                  className="btn btn-primary w-100 py-3"
                  disabled={status.submitting}
                  style={{
                    background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  {status.submitting ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Now'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
