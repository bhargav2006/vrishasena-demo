import React, { useState } from "react";
import { useDonation } from "../../context/DonationContext";
import api from "../../utils/backendMock";

export default function SubscriptionModal() {
  const {
    isSubscriptionModalOpen,
    closeSubscriptionModal,
    subscriptionTab,
    setSubscriptionTab,
    selectedPlanAmount,
    setSelectedPlanAmount
  } = useDonation();

  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (!isSubscriptionModalOpen) return null;

  const amounts = [1000, 5000, 10000, 20000];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      category: subscriptionTab === "education" ? "crowdfund_education" : "crowdfund_healthcare",
      monthly_amount: selectedPlanAmount,
      plan_name: `${subscriptionTab === "education" ? "Education" : "Healthcare"}@${selectedPlanAmount}`,
      monthly_donor_name: donorName,
      monthly_donor_no: donorPhone,
      monthly_donor_mail: donorEmail,
      source: "website_react"
    };

    api.submitSubscription(payload).then((res) => {
      setIsSubmitting(false);
      setSuccessMessage(`Thank you ${donorName}! Your monthly pledge of ₹${selectedPlanAmount} for ${subscriptionTab} has been recorded.`);
      setTimeout(() => {
        setSuccessMessage("");
        closeSubscriptionModal();
      }, 3000);
    });
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", zIndex: 1055 }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg border-0" style={{ borderRadius: "16px", overflow: "hidden" }}>
          <div className="modal-header cstm_header p-4" style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <div>
              <h3 className="modal-title sub_title fs-4 fw-bold text-dark m-0">Monthly Subscriptions</h3>
              <p className="tax-benifits text-success fw-semibold small m-0 mt-1">
                <i className="ri-gift-line me-1"></i> Claim Tax Benefits (80G Eligible)
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeSubscriptionModal}
            ></button>
          </div>

          <div className="px-4 pt-3">
            <ul className="nav nav-pills justify-content-between type_btn" role="tablist">
              <li className="nav-item w-50 pe-1" role="presentation">
                <button
                  className={`nav-link w-100 fw-bold ${subscriptionTab === "education" ? "active" : ""}`}
                  type="button"
                  onClick={() => setSubscriptionTab("education")}
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    backgroundColor: subscriptionTab === "education" ? "#009dff" : "#f1f5f9",
                    color: subscriptionTab === "education" ? "#fff" : "#475569"
                  }}
                >
                  <i className="ri-book-read-line me-1"></i> Education
                </button>
              </li>
              <li className="nav-item w-50 ps-1" role="presentation">
                <button
                  className={`nav-link w-100 fw-bold ${subscriptionTab === "healthcare" ? "active" : ""}`}
                  type="button"
                  onClick={() => setSubscriptionTab("healthcare")}
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    backgroundColor: subscriptionTab === "healthcare" ? "#21936a" : "#f1f5f9",
                    color: subscriptionTab === "healthcare" ? "#fff" : "#475569"
                  }}
                >
                  <i className="ri-heart-pulse-line me-1"></i> Healthcare
                </button>
              </li>
            </ul>
          </div>

          <div className="modal-body p-4 pt-2">
            {successMessage ? (
              <div className="alert alert-success text-center py-4 my-3" style={{ borderRadius: "12px" }}>
                <i className="ri-checkbox-circle-fill fs-1 text-success d-block mb-2"></i>
                <h5 className="fw-bold">Pledge Successful</h5>
                <p className="mb-0">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mt-3">
                  <label className="fw-semibold text-secondary small mb-2">Select Monthly Support Amount:</label>
                  <div className="d-flex justify-content-between gap-2">
                    {amounts.map((amt) => (
                      <span
                        key={amt}
                        onClick={() => setSelectedPlanAmount(amt)}
                        className={`modal-amount flex-fill text-center py-2 px-1 border rounded-3 fw-bold cursor-pointer transition ${
                          selectedPlanAmount === amt ? "active bg-primary text-white border-primary" : "bg-light text-dark"
                        }`}
                        style={{ cursor: "pointer", fontSize: "14px" }}
                      >
                        ₹{amt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-amount-input mt-3 d-flex align-items-center bg-light px-3 py-2 border rounded-3">
                  <span className="fw-bold fs-5 text-secondary me-2">₹</span>
                  <input
                    type="number"
                    className="form-control border-0 bg-transparent fw-bold fs-5 p-0"
                    placeholder="Total amount"
                    value={selectedPlanAmount}
                    onChange={(e) => setSelectedPlanAmount(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="modal-donation mt-3 d-flex flex-column gap-3">
                  <div className="modal-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Full Name *"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      style={{ height: "46px", borderRadius: "10px" }}
                    />
                  </div>
                  <div className="modal-form">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number (10 digits) *"
                      maxLength="10"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, ""))}
                      required
                      style={{ height: "46px", borderRadius: "10px" }}
                    />
                  </div>
                  <div className="modal-form">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address (for 80G receipt) *"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      style={{ height: "46px", borderRadius: "10px" }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="all_btn modal_btn w-100 text-white fw-bold py-3 border-0 rounded-3 shadow-sm"
                    style={{
                      backgroundColor: subscriptionTab === "education" ? "#009dff" : "#21936a",
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <span>
                        <i className="ri-heart-add-fill me-1"></i> Confirm Monthly Donation of ₹{selectedPlanAmount}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
