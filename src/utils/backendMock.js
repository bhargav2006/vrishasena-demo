/**
 * backendMock.js
 * Handles backend calls with clear console logging and simulated responses.
 * As requested: "whereever we are using backend links simple add a console.log option for them"
 */

export const logBackendAction = (actionName, endpoint, payload = {}) => {
  const timestamp = new Date().toISOString();
  console.group(`%c🚀 [BACKEND ACTION] ${actionName}`, 'color: #009dff; font-weight: bold; font-size: 13px;');
  console.log('%cEndpoint:', 'color: #8b5cf6; font-weight: 600;', endpoint);
  console.log('%cTimestamp:', 'color: #64748b;', timestamp);
  console.log('%cPayload:', 'color: #10b981; font-weight: 600;', payload);
  console.groupEnd();

  return Promise.resolve({
    success: true,
    status: 200,
    message: `${actionName} processed successfully (Console Mock)`,
    timestamp,
    data: payload
  });
};

export const api = {
  // Donation submission
  submitDonation: (payload) => {
    return logBackendAction('Submit Donation Payment', '/api/donation/initiate/', payload);
  },

  // Monthly subscription payment
  submitSubscription: (payload) => {
    return logBackendAction('Create Monthly Subscription', '/subscription_payment/', payload);
  },

  // Quick contact form submission
  submitContactForm: (payload) => {
    return logBackendAction('Submit Quick Contact Form', '/contact/submit/', payload);
  },

  // Volunteer registration
  registerVolunteer: (payload) => {
    return logBackendAction('Register Volunteer', '/volunteer/register/', payload);
  },

  // Send OTP
  sendOtp: (contactInfo) => {
    return logBackendAction('Send Verification OTP', '/api/auth/send-otp/', { contactInfo });
  },

  // Verify OTP
  verifyOtp: (contactInfo, otp) => {
    return logBackendAction('Verify OTP', '/api/auth/verify-otp/', { contactInfo, otp });
  },

  // Report a bug
  reportBug: (payload) => {
    return logBackendAction('Report Website Bug', '/api/report-bug/', payload);
  },

  // Track donations
  trackDonation: (identifier) => {
    return logBackendAction('Track Donor Orders', '/api/donations/track/', { identifier });
  },

  // Fetch recent donations list
  getRecentDonations: () => {
    logBackendAction('Fetch Recent Donations', '/api/recent-donations/');
    return Promise.resolve([
      { name: "Rahul S.", amount: 1500, category: "Homeless Meals" },
      { name: "Priya M.", amount: 500, category: "Water Bottles" },
      { name: "Karthik R.", amount: 3000, category: "Educate a Child" },
      { name: "Ananya G.", amount: 200, category: "Egg & Milk" },
      { name: "Venkatesh N.", amount: 6500, category: "Bicycle for Student" },
      { name: "Divya K.", amount: 1600, category: "Birthday Cake" }
    ]);
  }
};

export default api;
