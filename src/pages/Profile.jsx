import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/backendMock';

export default function Profile() {
  const [loginType, setLoginType] = useState('phone'); // 'phone' | 'email'
  const [contactInput, setContactInput] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [donorData, setDonorData] = useState(null);

  // Sample donation history for demonstration
  const sampleDonations = [
    {
      id: 'TG-DON-849201',
      cause: 'Feed A Hungry Child — Hot Nutritious Meal',
      amount: 1500,
      units: '30 Meals',
      date: '2025-01-14',
      status: 'Completed',
      certificateUrl: '#',
    },
    {
      id: 'TG-DON-792104',
      cause: 'Elderly Sanctuary — Nutritious Diet & Healthcare',
      amount: 3000,
      units: 'Monthly Support',
      date: '2024-11-28',
      status: 'Completed',
      certificateUrl: '#',
    },
    {
      id: 'TG-DON-641920',
      cause: 'Feed Stray Animals — Daily Food & Care',
      amount: 1000,
      units: '20 Meals',
      date: '2024-09-15',
      status: 'Completed',
      certificateUrl: '#',
    },
  ];

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    setOtpLoading(true);
    setOtpError(null);
    try {
      await api.sendOtp(contactInput);
      setOtpLoading(false);
      setShowOtpModal(true);
    } catch (err) {
      setOtpLoading(false);
      setOtpError('Failed to send OTP. Please check console.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`profile-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = otpValues.join('');
    if (otp.length < 6) {
      setOtpError('Please enter a 6-digit OTP.');
      return;
    }

    setOtpLoading(true);
    setOtpError(null);
    try {
      const res = await api.verifyOtp(contactInput, otp);
      setOtpLoading(false);
      if (res.success) {
        setIsAuthenticated(true);
        setShowOtpModal(false);
        setDonorData({
          name: 'Generous Donor',
          contact: contactInput,
          joined: '2024',
          totalDonated: 5500,
          donationsCount: 3,
        });
      } else {
        setOtpError('Invalid OTP code. Please use 123456 or check console.');
      }
    } catch (err) {
      setOtpLoading(false);
      setOtpError('Verification failed.');
    }
  };

  const handleGoogleLogin = () => {
    console.group('[BACKEND ACTION] Google Sign-In Initiated');
    console.log('Provider: Firebase / Google OAuth');
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();

    // Mock Google sign in
    setIsAuthenticated(true);
    setDonorData({
      name: 'Google Supporter',
      contact: 'supporter@gmail.com',
      joined: '2024',
      totalDonated: 5500,
      donationsCount: 3,
    });
  };

  const handleDownloadReceipt = (id) => {
    console.group('[BACKEND ACTION] Download 80G Tax Receipt');
    console.log('Donation ID:', id);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();
    alert(`Downloading official 80G Tax Exemption Receipt for Order: ${id}`);
  };

  return (
    <div className="profile-page">
      {!isAuthenticated ? (
        <section className="donor_signin_section">
          <div className="donor_login_wrapper d-flex flex-column flex-lg-row min-vh-100">
            {/* LEFT SIDE: Organization Brand & Impact (Desktop Only) */}
            <div
              className="donor_login_left flex-grow-1 p-5 d-none d-lg-flex flex-column justify-content-center"
              style={{
                background: 'linear-gradient(160deg, #f0f8ff 0%, #e6f3ff 40%, #d9edff 100%)',
                color: '#1a1a1a',
                position: 'relative',
              }}
            >
              <div className="org_brand d-flex align-items-center gap-3 mb-4">
                <div
                  className="org_brand_icon d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                    color: 'white',
                    fontSize: '24px',
                  }}
                >
                  <i className="ri-heart-fill"></i>
                </div>
                <div>
                  <h2 className="org_brand_name m-0 fw-bold" style={{ fontSize: '1.4rem' }}>
                    Thaagam Foundation
                  </h2>
                  <p className="org_brand_tagline m-0 text-muted" style={{ fontSize: '0.85rem' }}>
                    Compassion in Action
                  </p>
                </div>
              </div>

              <h1 className="org_headline fw-bolder mb-3" style={{ fontSize: '2.4rem', lineHeight: 1.2 }}>
                Together, We Can <span style={{ color: '#009dff' }}>Make a Difference</span>
              </h1>

              <p className="org_description mb-4 text-secondary" style={{ fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px' }}>
                At Thaagam Foundation, every individual deserves dignity, care, and an opportunity to thrive.
                Through humanitarian aid and community empowerment, we stand beside vulnerable individuals
                and families — addressing urgent needs while nurturing pathways toward long-term stability.
              </p>

              {/* Stats Grid */}
              <div className="org_stats_grid row g-3 mb-4" style={{ maxWidth: '540px' }}>
                <div className="col-6">
                  <div className="p-3 bg-white bg-opacity-75 rounded-3 border text-center">
                    <span className="fs-4 text-primary d-block mb-1"><i className="ri-hand-coin-fill"></i></span>
                    <strong className="fs-5 d-block text-dark">₹43.46 Cr+</strong>
                    <span className="text-muted small">Donations Raised</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-white bg-opacity-75 rounded-3 border text-center">
                    <span className="fs-4 text-primary d-block mb-1"><i className="ri-bowl-fill"></i></span>
                    <strong className="fs-5 d-block text-dark">115.94 L+</strong>
                    <span className="text-muted small">Meals Served</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-white bg-opacity-75 rounded-3 border text-center">
                    <span className="fs-4 text-primary d-block mb-1"><i className="ri-group-fill"></i></span>
                    <strong className="fs-5 d-block text-dark">6.52 L+</strong>
                    <span className="text-muted small">Active Donors</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-white bg-opacity-75 rounded-3 border text-center">
                    <span className="fs-4 text-primary d-block mb-1"><i className="ri-heart-3-fill"></i></span>
                    <strong className="fs-5 d-block text-dark">6.73 L+</strong>
                    <span className="text-muted small">Donations Made</span>
                  </div>
                </div>
              </div>

              {/* Vision Block */}
              <div className="p-3 rounded-3 bg-white bg-opacity-50 border mb-4" style={{ maxWidth: '540px' }}>
                <span className="fw-bold small text-primary text-uppercase tracking-wider">Our Vision</span>
                <p className="small text-muted m-0 mt-1">
                  We envision a world where compassion drives action. By prioritizing the needs of our donors
                  and beneficiaries, we ensure transparency, accountability, and measurable impact.
                </p>
              </div>

              {/* Partners */}
              <div className="org_partners" style={{ maxWidth: '540px' }}>
                <span className="small text-muted fw-semibold d-block mb-2">Trusted by Corporate Partners:</span>
                <div className="d-flex flex-wrap gap-2">
                  {['Hyundai Glovis', 'Conga (Salesforce)', 'Zee Group', 'H&M', 'Flex Foundation', 'One Step Global'].map((p, idx) => (
                    <span key={idx} className="badge bg-white text-dark border px-2 py-1 small">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="donor_login_right flex-grow-1 d-flex align-items-center justify-content-center p-4">
              <div
                className="signin_container bg-white p-4 p-md-5 rounded-4 shadow-lg w-100"
                style={{ maxWidth: '440px', border: '1px solid #f3f4f6' }}
              >
                <div className="signin_header text-center mb-4">
                  <div
                    className="signin_icon mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #009dff 0%, #4db8ff 100%)',
                      color: 'white',
                      fontSize: '32px',
                    }}
                  >
                    <i className="ri-heart-fill"></i>
                  </div>
                  <h2 className="signin_title fw-bold text-dark m-0" style={{ fontSize: '1.75rem' }}>Welcome Back!</h2>
                  <p className="signin_subtitle text-muted mt-1 small">
                    Sign in to view your donation history and track your impact
                  </p>
                </div>

                {/* Google Sign-in */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google_signin_button btn btn-light border w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3 fw-semibold"
                  style={{ borderRadius: '12px' }}
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>Sign in with Google</span>
                </button>

                {/* Divider */}
                <div className="d-flex align-items-center my-3 gap-2">
                  <div className="flex-grow-1 border-top"></div>
                  <span className="small text-muted text-uppercase fw-bold">OR</span>
                  <div className="flex-grow-1 border-top"></div>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSendOtp}>
                  <div className="d-flex justify-content-center gap-4 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="loginType"
                        id="donorPhone"
                        value="phone"
                        checked={loginType === 'phone'}
                        onChange={() => setLoginType('phone')}
                      />
                      <label className="form-check-label small fw-semibold" htmlFor="donorPhone">
                        Phone Number
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="loginType"
                        id="donorEmail"
                        value="email"
                        checked={loginType === 'email'}
                        onChange={() => setLoginType('email')}
                      />
                      <label className="form-check-label small fw-semibold" htmlFor="donorEmail">
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type={loginType === 'phone' ? 'tel' : 'email'}
                      className="form-control"
                      placeholder={loginType === 'phone' ? 'Enter 10-digit mobile number' : 'Enter registered email'}
                      value={contactInput}
                      onChange={(e) => setContactInput(e.target.value)}
                      required
                      style={{ borderRadius: '10px', padding: '12px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="btn btn-primary w-100 py-3 fw-bold"
                    style={{
                      background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                      border: 'none',
                      borderRadius: '12px',
                    }}
                  >
                    {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </form>

                {/* Need Help */}
                <div className="text-center mt-4 pt-3 border-top">
                  <span className="small text-muted d-block mb-2">Need help tracking donations?</span>
                  <div className="d-flex justify-content-center gap-3">
                    <a
                      href="https://wa.me/919790927575"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="small text-decoration-none d-flex align-items-center gap-1 text-success fw-semibold"
                    >
                      <i className="ri-whatsapp-fill"></i> WhatsApp Support
                    </a>
                    <a
                      href="mailto:contact@thaagam.org"
                      className="small text-decoration-none d-flex align-items-center gap-1 text-primary fw-semibold"
                    >
                      <i className="ri-mail-fill"></i> Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Authenticated Donor Dashboard */
        <section className="container py-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <h2 className="fw-bolder text-dark m-0">Welcome, {donorData?.name}!</h2>
              <p className="text-muted m-0">Track your donations, download tax exemption certificates, and view your impact.</p>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setDonorData(null);
              }}
              className="btn btn-outline-danger btn-sm px-3"
            >
              <i className="ri-logout-box-r-line me-1"></i> Sign Out
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 border shadow-sm">
                <span className="text-muted small">Total Contribution</span>
                <h3 className="fw-bolder text-primary mt-1">₹{donorData?.totalDonated?.toLocaleString()}</h3>
                <span className="badge bg-success-subtle text-success">100% Tax Deductible</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 border shadow-sm">
                <span className="text-muted small">Causes Supported</span>
                <h3 className="fw-bolder text-dark mt-1">{donorData?.donationsCount} Campaigns</h3>
                <span className="text-muted small">Children, Stray Animals &amp; Elderly</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 border shadow-sm">
                <span className="text-muted small">80G Tax Exemption Status</span>
                <h4 className="fw-bolder text-success mt-1">Eligible (50% Deduction)</h4>
                <span className="text-muted small">Unique Reg: AABTT1122K</span>
              </div>
            </div>
          </div>

          {/* Donations Table */}
          <div className="bg-white rounded-4 border shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0 text-dark">Donation History &amp; 80G Receipts</h4>
              <button
                onClick={() => handleDownloadReceipt('ALL')}
                className="btn btn-primary btn-sm px-3"
                style={{ borderRadius: '8px' }}
              >
                <i className="ri-file-download-line me-1"></i> Download Consolidated Statement
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Receipt No.</th>
                    <th>Campaign / Cause</th>
                    <th>Impact / Units</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-end">80G Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleDonations.map((don) => (
                    <tr key={don.id}>
                      <td className="fw-semibold text-primary">{don.id}</td>
                      <td>{don.cause}</td>
                      <td><span className="badge bg-light text-dark">{don.units}</span></td>
                      <td className="fw-bold text-dark">₹{don.amount.toLocaleString()}</td>
                      <td className="text-muted small">{don.date}</td>
                      <td><span className="badge bg-success">{don.status}</span></td>
                      <td className="text-end">
                        <button
                          onClick={() => handleDownloadReceipt(don.id)}
                          className="btn btn-outline-primary btn-sm"
                          style={{ borderRadius: '6px' }}
                        >
                          <i className="ri-download-2-line me-1"></i> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div
          className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px' }}
        >
          <div
            className="bg-white p-4 p-md-5 position-relative"
            style={{ maxWidth: '440px', width: '100%', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <button
              onClick={() => setShowOtpModal(false)}
              className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle"
              style={{ width: '36px', height: '36px' }}
            >
              <i className="ri-close-line fs-5"></i>
            </button>

            <div className="text-center mb-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '28px',
                }}
              >
                <i className="ri-key-2-fill"></i>
              </div>
              <h4 className="fw-bold m-0">Enter Verification Code</h4>
              <p className="text-muted mt-1 small">
                We sent a 6-digit OTP to <strong>{contactInput}</strong>
              </p>
            </div>

            {otpError && (
              <div className="alert alert-danger py-2 text-center small mb-3">
                {otpError}
              </div>
            )}

            <form onSubmit={handleVerifyOtp}>
              <div className="d-flex justify-content-between gap-2 mb-4">
                {otpValues.map((val, i) => (
                  <input
                    key={i}
                    id={`profile-otp-${i}`}
                    type="text"
                    maxLength="1"
                    className="form-control text-center fw-bold"
                    value={val}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    style={{
                      width: '45px',
                      height: '52px',
                      fontSize: '1.25rem',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                    }}
                  />
                ))}
              </div>

              <div className="text-center mb-4">
                <span className="small text-muted">
                  Didn't receive OTP?{' '}
                  <button
                    type="button"
                    onClick={() => api.sendOtp(contactInput)}
                    className="btn btn-link p-0 small fw-semibold text-decoration-none"
                    style={{ color: '#009dff' }}
                  >
                    Resend OTP
                  </button>
                </span>
              </div>

              <button
                type="submit"
                disabled={otpLoading}
                className="btn btn-primary w-100 py-3 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                  border: 'none',
                  borderRadius: '12px',
                }}
              >
                {otpLoading ? 'Verifying...' : 'Verify and Sign In'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
