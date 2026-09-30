import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../utils/backendMock';

export default function Policies({ defaultTab }) {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  // Determine active tab
  let initialTab = defaultTab || 'privacy';
  if (currentPath.includes('refund')) initialTab = 'refund';
  if (currentPath.includes('terms')) initialTab = 'terms';
  if (currentPath.includes('bug')) initialTab = 'bugs';

  const [activeTab, setActiveTab] = useState(initialTab);

  // Bug Report form state
  const [bugData, setBugData] = useState({
    name: '',
    email: '',
    phone: '',
    bug_title: '',
    description: '',
    file: null,
  });
  const [bugStatus, setBugStatus] = useState({ submitting: false, success: false, error: null });

  const handleBugSubmit = async (e) => {
    e.preventDefault();
    setBugStatus({ submitting: true, success: false, error: null });
    try {
      const res = await api.reportBug(bugData);
      if (res.success) {
        setBugStatus({ submitting: false, success: true, error: null });
        setBugData({ name: '', email: '', phone: '', bug_title: '', description: '', file: null });
      }
    } catch (err) {
      setBugStatus({ submitting: false, success: false, error: 'Failed to submit bug report.' });
    }
  };

  return (
    <div className="policies-page">
      {/* Banner */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: 'white',
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bolder" style={{ fontSize: '2.2rem' }}>
            {activeTab === 'privacy' && 'Privacy Policy'}
            {activeTab === 'refund' && 'Refund & Cancellation Policy'}
            {activeTab === 'terms' && 'Terms & Conditions'}
            {activeTab === 'bugs' && 'Report a Technical Bug'}
          </h1>
          <p className="mt-2 text-white-50" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Transparency, integrity, and accountability in every initiative and transaction at Thaagam Foundation.
          </p>
          <nav aria-label="breadcrumb" className="breadcrumb-row mt-3">
            <ul className="breadcrumb justify-content-center" style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
              <li>
                <Link to="/" style={{ color: '#009dff', textDecoration: 'none' }}>Home</Link>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.6)' }}>/</li>
              <li style={{ color: 'white', fontWeight: 600 }}>Policies &amp; Legal</li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Tabs navigation */}
      <div className="container py-4">
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`btn px-4 py-2 fw-semibold ${activeTab === 'privacy' ? 'btn-primary' : 'btn-light border'}`}
            style={{ borderRadius: '24px' }}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`btn px-4 py-2 fw-semibold ${activeTab === 'refund' ? 'btn-primary' : 'btn-light border'}`}
            style={{ borderRadius: '24px' }}
          >
            Refund Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`btn px-4 py-2 fw-semibold ${activeTab === 'terms' ? 'btn-primary' : 'btn-light border'}`}
            style={{ borderRadius: '24px' }}
          >
            Terms &amp; Conditions
          </button>
          <button
            onClick={() => setActiveTab('bugs')}
            className={`btn px-4 py-2 fw-semibold ${activeTab === 'bugs' ? 'btn-primary' : 'btn-light border'}`}
            style={{ borderRadius: '24px' }}
          >
            <i className="ri-bug-line me-1"></i> Report Bugs
          </button>
        </div>

        {/* Tab 1: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm" style={{ lineHeight: 1.8 }}>
            <h2 className="fw-bold mb-4 text-dark">Privacy Policy for Thaagam Foundation</h2>
            <p className="text-muted">Last updated: January 2025</p>

            <p>
              This Privacy Policy describes our policies and procedures regarding the collection, use, and disclosure
              of your information when you use our website (https://www.thaagam.org) and make donations to our campaigns.
            </p>

            <h4 className="fw-bold mt-4 text-dark">1. Interpretation and Definitions</h4>
            <p>
              <strong>Company:</strong> Refers to Thaagam Foundation, No.6, Dhanammal Street, Spurtank Road, Chetpet, Chennai 600031.
            </p>
            <p>
              <strong>Personal Data:</strong> Any information relating to an identified or identifiable individual, such as name, email address, phone number, PAN card number (required for 80G tax exemption certificates), and billing address.
            </p>

            <h4 className="fw-bold mt-4 text-dark">2. Collection of Personal Information</h4>
            <p>
              We collect your personal details when you contribute online, register as a volunteer, or subscribe to periodic updates. We utilize secure encrypted payment gateways and do not store sensitive payment card details or net banking credentials on our servers.
            </p>

            <h4 className="fw-bold mt-4 text-dark">3. Use of Your Personal Data</h4>
            <ul>
              <li>To issue verified 80G tax exemption certificates and donation receipts.</li>
              <li>To provide field updates, photographs, and video proofs of meal distribution drives.</li>
              <li>To respond to your inquiries, support requests, and volunteer applications.</li>
              <li>To comply with regulatory guidelines under Indian NGO laws and Income Tax Act guidelines.</li>
            </ul>

            <h4 className="fw-bold mt-4 text-dark">4. Contact Information</h4>
            <p>
              If you have any questions or data concerns, contact us at:{' '}
              <a href="mailto:contact@thaagam.org" className="text-primary fw-semibold">contact@thaagam.org</a> or call +91 8069169691.
            </p>
          </div>
        )}

        {/* Tab 2: Refund Policy */}
        {activeTab === 'refund' && (
          <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm" style={{ lineHeight: 1.8 }}>
            <h2 className="fw-bold mb-4 text-dark">Refund and Cancellation Policy</h2>
            <p className="text-muted">Last updated: November 21, 2022</p>

            <p>
              Thank you for contributing to the humanitarian missions of Thaagam Foundation. As a registered charitable trust, donations made to our programs are immediately deployed towards food procurement, medical assistance, and community drives.
            </p>

            <h4 className="fw-bold mt-4 text-dark">1. Erroneous or Duplicate Donations</h4>
            <p>
              If an erroneous or duplicate payment was made due to a technical glitch, network failure, or manual typo, you may request a refund within <strong>7 business days</strong> of the transaction date.
            </p>

            <h4 className="fw-bold mt-4 text-dark">2. How to Request a Refund</h4>
            <p>To request a refund, please send an email to <a href="mailto:contact@thaagam.org" className="text-primary fw-semibold">contact@thaagam.org</a> with:</p>
            <ul>
              <li>Transaction ID or Payment Reference Number</li>
              <li>Date of donation and exact amount deducted</li>
              <li>Donor full name, phone number, and email ID used during checkout</li>
              <li>Reason for requesting the refund</li>
            </ul>

            <h4 className="fw-bold mt-4 text-dark">3. Processing Time</h4>
            <p>
              Upon verification and approval, the refund will be credited back to the original source of payment within 5 to 7 working days, subject to the policies of your bank or card issuer.
            </p>
          </div>
        )}

        {/* Tab 3: Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm" style={{ lineHeight: 1.8 }}>
            <h2 className="fw-bold mb-4 text-dark">Terms and Conditions of Use</h2>
            <p className="text-muted">Effective Date: January 1, 2024</p>

            <h4 className="fw-bold mt-4 text-dark">1. Acceptance of Terms</h4>
            <p>
              By accessing and browsing https://www.thaagam.org, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>

            <h4 className="fw-bold mt-4 text-dark">2. 80G Tax Exemption</h4>
            <p>
              All eligible Indian donations receive 50% tax deduction under Section 80G of the Income Tax Act. Donors must provide a valid Indian PAN (Permanent Account Number) to enable electronic filing of Form 10BD with the Income Tax Department.
            </p>

            <h4 className="fw-bold mt-4 text-dark">3. Transparency &amp; Deployment</h4>
            <p>
              Thaagam Foundation reserves the right to allocate funds between programs where urgent humanitarian assistance is required, while making all reasonable efforts to fulfill the specific cause selected by the donor.
            </p>

            <h4 className="fw-bold mt-4 text-dark">4. Intellectual Property</h4>
            <p>
              All logos, campaign titles, photographs, video records, and text content published on this website are the intellectual property of Thaagam Foundation.
            </p>
          </div>
        )}

        {/* Tab 4: Report Bugs */}
        {activeTab === 'bugs' && (
          <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm mx-auto" style={{ maxWidth: '720px' }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: '54px',
                  height: '54px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                  color: 'white',
                  fontSize: '24px',
                }}
              >
                <i className="ri-bug-fill"></i>
              </div>
              <div>
                <h3 className="fw-bold m-0 text-dark">Found a Technical Bug?</h3>
                <p className="text-muted m-0 small">
                  Help us improve by reporting any glitches or display issues. Your feedback keeps our platform seamless.
                </p>
              </div>
            </div>

            {bugStatus.success && (
              <div className="alert alert-success d-flex align-items-center gap-3 p-3 mb-4">
                <i className="ri-checkbox-circle-fill text-success fs-4"></i>
                <div>
                  <strong>Bug report received!</strong> Thank you for helping us keep Thaagam Foundation fast and reliable.
                </div>
              </div>
            )}

            <form onSubmit={handleBugSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    value={bugData.name}
                    onChange={(e) => setBugData({ ...bugData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={bugData.email}
                    onChange={(e) => setBugData({ ...bugData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="10-digit mobile number"
                    value={bugData.phone}
                    onChange={(e) => setBugData({ ...bugData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Bug Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Short summary of the bug"
                    value={bugData.bug_title}
                    onChange={(e) => setBugData({ ...bugData, bug_title: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small">Screenshot / Image (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setBugData({ ...bugData, file: e.target.files[0]?.name })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small">Detailed Description *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Describe what occurred, steps to reproduce, or page URL..."
                  value={bugData.description}
                  onChange={(e) => setBugData({ ...bugData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={bugStatus.submitting}
                className="btn btn-primary w-100 py-3 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                  border: 'none',
                  borderRadius: '12px',
                }}
              >
                {bugStatus.submitting ? 'Submitting Report...' : 'Submit Bug Report'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
