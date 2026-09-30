import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/backendMock';

export default function Volunteer() {
  // Desktop form state
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    gender: '',
    dob: '',
    blood_group: '',
    area: '',
    city: '',
    active_blood_donor: '1',
    password: '',
    confirm_password: '',
    volunteer_type: '',
  });

  const [regStatus, setRegStatus] = useState({ submitting: false, success: false, error: null });

  // Mobile / Quick OTP Signup state
  const [quickLoginType, setQuickLoginType] = useState('phone'); // 'phone' | 'email'
  const [quickContact, setQuickContact] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpStatus, setOtpStatus] = useState({ sending: false, verifying: false, success: false, error: null });
  const [resendTimer, setResendTimer] = useState(60);

  // Sign In modal state
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInData, setSignInData] = useState({ identifier: '', password: '' });
  const [signInStatus, setSignInStatus] = useState({ submitting: false, success: false, error: null });

  // Password visibility
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirm_password) {
      setRegStatus({ submitting: false, success: false, error: 'Passwords do not match!' });
      return;
    }

    setRegStatus({ submitting: true, success: false, error: null });
    try {
      const res = await api.registerVolunteer(formData);
      if (res.success) {
        setRegStatus({ submitting: false, success: true, error: null });
        setFormData({
          name: '',
          mobile_number: '',
          email: '',
          gender: '',
          dob: '',
          blood_group: '',
          area: '',
          city: '',
          active_blood_donor: '1',
          password: '',
          confirm_password: '',
          volunteer_type: '',
        });
      } else {
        setRegStatus({ submitting: false, success: false, error: res.message || 'Registration failed.' });
      }
    } catch (err) {
      console.error('[Volunteer Registration Error]', err);
      setRegStatus({ submitting: false, success: false, error: 'Registration error. Check console.' });
    }
  };

  // Quick OTP flow
  const handleQuickSignup = async (e) => {
    e.preventDefault();
    if (!quickContact) return;
    setOtpStatus({ sending: true, verifying: false, success: false, error: null });

    try {
      const res = await api.sendOtp(quickContact);
      setOtpStatus({ sending: false, verifying: false, success: false, error: null });
      setShowOtpModal(true);
      setResendTimer(60);
    } catch (err) {
      setOtpStatus({ sending: false, verifying: false, success: false, error: 'Could not send OTP.' });
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otpValues.join('');
    if (enteredOtp.length < 6) {
      setOtpStatus((prev) => ({ ...prev, error: 'Please enter all 6 digits of OTP.' }));
      return;
    }

    setOtpStatus((prev) => ({ ...prev, verifying: true, error: null }));
    try {
      const res = await api.verifyOtp(quickContact, enteredOtp);
      if (res.success) {
        setOtpStatus({ sending: false, verifying: false, success: true, error: null });
      } else {
        setOtpStatus({ sending: false, verifying: false, success: false, error: 'Invalid OTP. Please check console or try 123456.' });
      }
    } catch (err) {
      setOtpStatus({ sending: false, verifying: false, success: false, error: 'Verification failed.' });
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setSignInStatus({ submitting: true, success: false, error: null });
    console.log('[BACKEND ACTION] Volunteer Sign In Attempt', signInData);

    setTimeout(() => {
      setSignInStatus({ submitting: false, success: true, error: null });
    }, 1000);
  };

  return (
    <div className="volunteer-page">
      {/* Breadcrumb banner */}
      <div className="container py-4">
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827' }}>Become a Volunteer</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row mt-2">
          <ul className="breadcrumb" style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0 }}>
            <li className="breadcrumb-item">
              <Link to="/" style={{ color: '#009dff', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ color: '#6b7280' }}>/</li>
            <li className="breadcrumb-item-1" style={{ color: '#374151', fontWeight: 600 }}>Become a Volunteer</li>
          </ul>
        </nav>
      </div>

      <section className="pb-5">
        <div className="container">
          {/* Desktop Version Form */}
          <div
            className="p-4 p-md-5 mb-5"
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb',
            }}
          >
            <div className="text-center mb-5">
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1f2937' }}>
                Join the Movement of Change
              </h2>
              <p style={{ color: '#6b7280', maxWidth: '600px', margin: '8px auto 0' }}>
                Empower vulnerable communities, deliver urgent humanitarian relief, and create a lasting social impact with Thaagam Foundation.
              </p>
            </div>

            {regStatus.success && (
              <div className="alert alert-success d-flex align-items-center gap-3 p-4 mb-4" role="alert">
                <i className="ri-checkbox-circle-fill text-success fs-3"></i>
                <div>
                  <h5 className="m-0 fw-bold">Volunteer Registration Successful!</h5>
                  <p className="m-0 text-muted">
                    Welcome to Thaagam Foundation! Our volunteer team will review your application and contact you soon.
                  </p>
                </div>
              </div>
            )}

            {regStatus.error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
                <i className="ri-error-warning-fill text-danger fs-5"></i>
                <div>{regStatus.error}</div>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="donation-form form-1 causes_form">
              <div className="row g-4">
                {/* Full Name */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Phone *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light" style={{ borderRadius: '10px 0 0 10px', fontWeight: 600 }}>+91</span>
                    <input
                      type="tel"
                      name="mobile_number"
                      className="form-control"
                      placeholder="WhatsApp Number"
                      maxLength="10"
                      value={formData.mobile_number}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '0 10px 10px 0', padding: '12px' }}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Email address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Gmail address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  />
                </div>

                {/* Gender */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Gender *</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  >
                    <option value="">Select your gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>

                {/* DOB */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>DOB *</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  />
                </div>

                {/* Blood Group */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Blood Group</label>
                  <select
                    className="form-select"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  >
                    <option value="">Select your blood group</option>
                    <option value="1">A+</option>
                    <option value="2">A-</option>
                    <option value="3">B+</option>
                    <option value="4">B-</option>
                    <option value="5">AB+</option>
                    <option value="6">AB-</option>
                    <option value="7">O+</option>
                    <option value="8">O-</option>
                  </select>
                </div>

                {/* Street address */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Street address *</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    placeholder="House number and street name"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  />
                </div>

                {/* Town / City */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Town / City *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="Town / City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  />
                </div>

                {/* Active Blood Donor */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>
                    Would you like to be an active blood donor?
                  </label>
                  <select
                    className="form-select"
                    name="active_blood_donor"
                    value={formData.active_blood_donor}
                    onChange={handleInputChange}
                    style={{ borderRadius: '10px', padding: '12px' }}
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                {/* Password */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Password *</label>
                  <div className="position-relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '10px', padding: '12px 40px 12px 12px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="btn position-absolute top-50 end-0 translate-middle-y text-muted border-0"
                    >
                      <i className={showPass ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Confirm Password *</label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      name="confirm_password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '10px', padding: '12px 40px 12px 12px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="btn position-absolute top-50 end-0 translate-middle-y text-muted border-0"
                    >
                      <i className={showConfirmPass ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                    </button>
                  </div>
                </div>

                {/* Volunteer Type */}
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: '0.9rem' }}>Volunteer Type *</label>
                  <select
                    className="form-select"
                    name="volunteer_type"
                    value={formData.volunteer_type}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  >
                    <option value="">Select Volunteer Type</option>
                    <option value="Individual Volunteer">Individual Volunteer</option>
                    <option value="Ngo">NGO Partner</option>
                    <option value="Institution">Academic / Corporate Institution</option>
                  </select>
                </div>
              </div>

              <div className="text-center mt-5">
                <button
                  type="submit"
                  disabled={regStatus.submitting}
                  className="btn btn-primary px-5 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(0, 157, 255, 0.3)',
                  }}
                >
                  {regStatus.submitting ? 'Registering...' : 'Join Now as Volunteer'}
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted m-0">
                  Already have a Volunteer account?{' '}
                  <button
                    type="button"
                    onClick={() => setShowSignInModal(true)}
                    className="btn btn-link p-0 fw-bold text-decoration-none"
                    style={{ color: '#009dff' }}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Quick Mobile Signup Card */}
          <div
            className="p-4 mx-auto"
            style={{
              maxWidth: '460px',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb',
            }}
          >
            <div className="text-center mb-4">
              <h4 style={{ fontWeight: 800, color: '#111827' }}>Quick Volunteer Signup</h4>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Sign up with one tap via OTP</p>
            </div>

            <form onSubmit={handleQuickSignup}>
              <div className="d-flex justify-content-center gap-4 mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="quickLoginType"
                    id="quickPhone"
                    value="phone"
                    checked={quickLoginType === 'phone'}
                    onChange={() => setQuickLoginType('phone')}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="quickPhone">
                    Phone Number
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="quickLoginType"
                    id="quickEmail"
                    value="email"
                    checked={quickLoginType === 'email'}
                    onChange={() => setQuickLoginType('email')}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="quickEmail">
                    Email
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type={quickLoginType === 'phone' ? 'tel' : 'email'}
                  className="form-control"
                  placeholder={quickLoginType === 'phone' ? '10-digit WhatsApp Number' : 'Your Gmail address'}
                  value={quickContact}
                  onChange={(e) => setQuickContact(e.target.value)}
                  required
                  style={{ borderRadius: '10px', padding: '12px' }}
                />
              </div>

              <button
                type="submit"
                disabled={otpStatus.sending}
                className="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                }}
              >
                <span>{otpStatus.sending ? 'Sending OTP...' : 'Sign Up with OTP'}</span>
                <i className="ri-arrow-right-line"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

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
                <i className="ri-shield-check-fill"></i>
              </div>
              <h4 className="fw-bold m-0">Verify OTP</h4>
              <p className="text-muted mt-1" style={{ fontSize: '0.88rem' }}>
                Enter the 6-digit code sent to <strong style={{ color: '#111827' }}>{quickContact}</strong>
              </p>
            </div>

            {otpStatus.success ? (
              <div className="text-center py-4">
                <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '64px' }}></i>
                <h5 className="fw-bold mt-2">Verified Successfully!</h5>
                <p className="text-muted">Your volunteer account has been created. Welcome to Thaagam Foundation!</p>
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="btn btn-primary px-4 py-2 mt-2"
                  style={{ borderRadius: '10px' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                {otpStatus.error && (
                  <div className="alert alert-danger py-2 text-center" style={{ fontSize: '0.85rem' }}>
                    {otpStatus.error}
                  </div>
                )}

                <div className="d-flex justify-content-between gap-2 mb-4">
                  {otpValues.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      maxLength="1"
                      className="form-control text-center fw-bold"
                      value={digit}
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
                  <p className="text-muted m-0" style={{ fontSize: '0.85rem' }}>
                    Didn't receive code?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        api.sendOtp(quickContact);
                        setResendTimer(60);
                      }}
                      className="btn btn-link p-0 fw-semibold text-decoration-none"
                      style={{ color: '#009dff' }}
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={otpStatus.verifying}
                  className="btn btn-primary w-100 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  {otpStatus.verifying ? 'Verifying...' : 'Verify & Join'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Volunteer Sign In Modal */}
      {showSignInModal && (
        <div
          className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px' }}
        >
          <div
            className="bg-white p-4 p-md-5 position-relative"
            style={{ maxWidth: '440px', width: '100%', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <button
              onClick={() => setShowSignInModal(false)}
              className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle"
              style={{ width: '36px', height: '36px' }}
            >
              <i className="ri-close-line fs-5"></i>
            </button>

            <div className="text-center mb-4">
              <h4 className="fw-bold m-0">Volunteer Sign In</h4>
              <p className="text-muted mt-1" style={{ fontSize: '0.88rem' }}>
                Enter your credentials to access your volunteer dashboard
              </p>
            </div>

            {signInStatus.success ? (
              <div className="text-center py-3">
                <i className="ri-checkbox-circle-fill text-success fs-1"></i>
                <h5 className="fw-bold mt-2">Signed In Successfully!</h5>
                <p className="text-muted">Welcome back to your volunteer account.</p>
                <button onClick={() => setShowSignInModal(false)} className="btn btn-primary px-4 py-2 mt-2">
                  Continue
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignInSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.88rem' }}>
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email or phone"
                    value={signInData.identifier}
                    onChange={(e) => setSignInData({ ...signInData, identifier: e.target.value })}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.88rem' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    required
                    style={{ borderRadius: '10px', padding: '12px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={signInStatus.submitting}
                  className="btn btn-primary w-100 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  {signInStatus.submitting ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
