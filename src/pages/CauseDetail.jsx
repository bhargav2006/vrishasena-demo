import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCauseBySlug, causes } from "../data/causesData";
import { useDonation } from "../context/DonationContext";
import api from "../utils/backendMock";

export default function CauseDetail({ directSlug }) {
  const { slug } = useParams();
  const targetSlug = directSlug || slug || "water_bottle";
  const cause = getCauseBySlug(targetSlug);
  const { addRecentlyViewed } = useDonation();

  useEffect(() => {
    if (cause) {
      addRecentlyViewed(cause);
      window.scrollTo(0, 0);
    }
  }, [cause]);

  const [unitCount, setUnitCount] = useState(25);
  const [occasion, setOccasion] = useState("General Donation");
  const [celebrationDate, setCelebrationDate] = useState(new Date().toISOString().split("T")[0]);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [includeVideoWish, setIncludeVideoWish] = useState(false);
  const [includeBanner, setIncludeBanner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const chipOptions = [10, 25, 50, 100, 250, 500];

  const baseAmount = unitCount * cause.unitPrice;
  const videoAddonCost = includeVideoWish ? 1500 : 0;
  const bannerAddonCost = includeBanner ? 500 : 0;
  const totalAmount = baseAmount + videoAddonCost + bannerAddonCost;

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      causeSlug: cause.slug,
      causeName: cause.name,
      unitCount,
      unitPrice: cause.unitPrice,
      baseAmount,
      totalAmount,
      occasion,
      celebrationDate,
      donorName,
      donorPhone,
      donorEmail,
      donorPan,
      addons: {
        includeVideoWish,
        includeBanner
      }
    };

    api.submitDonation(payload).then((res) => {
      setIsSubmitting(false);
      setDonationSuccess(true);
    });
  };

  const percentRaised = Math.min(Math.round((cause.raisedAmount / cause.goalAmount) * 100), 100);

  return (
    <div className="cause-detail-page py-4" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/causes" className="text-decoration-none text-secondary">Causes</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              {cause.name}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Main Info Left Column */}
          <div className="col-12 col-lg-7">
            <div className="bg-white rounded-4 p-4 shadow-sm border mb-4">
              <div className="position-relative rounded-3 overflow-hidden mb-4 shadow-sm">
                <img
                  src={cause.cardImage}
                  alt={cause.name}
                  className="w-100"
                  style={{ maxHeight: "420px", objectFit: "cover" }}
                />
                <span
                  className="position-absolute top-0 end-0 bg-primary text-white fw-bold px-3 py-2 m-3 rounded-pill shadow-sm"
                  style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}
                >
                  {cause.category}
                </span>
              </div>

              <h1 className="fw-bold fs-2 text-dark mb-2">{cause.name}</h1>
              <p className="text-primary fw-bold fs-4 mb-4">{cause.amountTitle}</p>

              {/* Progress Goal */}
              <div className="bg-light p-3 rounded-3 mb-4 border">
                <div className="d-flex justify-content-between small fw-bold mb-2">
                  <span className="text-success">₹{cause.raisedAmount.toLocaleString()} Raised</span>
                  <span className="text-secondary">Goal: ₹{cause.goalAmount.toLocaleString()}</span>
                </div>
                <div className="progress" style={{ height: "10px", borderRadius: "999px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${percentRaised}%` }}
                    aria-valuenow={percentRaised}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="d-flex justify-content-between small text-muted mt-2">
                  <span>{percentRaised}% Completed</span>
                  <span>{cause.donorCount.toLocaleString()} Kind Donors</span>
                </div>
              </div>

              <h4 className="fw-bold fs-5 text-dark mb-3">About this Cause</h4>
              <p className="text-secondary leading-relaxed mb-4" style={{ fontSize: "16px", lineHeight: "1.7" }}>
                {cause.longDescription}
              </p>

              <div className="row g-3 text-center my-4">
                <div className="col-4">
                  <div className="p-3 bg-light rounded-3 border">
                    <i className="ri-shield-check-fill fs-3 text-primary d-block mb-1"></i>
                    <h6 className="fw-bold mb-0 small">80G Tax Benefit</h6>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded-3 border">
                    <i className="ri-camera-lens-fill fs-3 text-success d-block mb-1"></i>
                    <h6 className="fw-bold mb-0 small">Photo & Video Proof</h6>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded-3 border">
                    <i className="ri-heart-pulse-fill fs-3 text-danger d-block mb-1"></i>
                    <h6 className="fw-bold mb-0 small">100% Direct Aid</h6>
                  </div>
                </div>
              </div>

              {/* Related Causes Carousel / Suggestion */}
              <h5 className="fw-bold fs-5 text-dark mt-5 mb-3">Other Urgent Causes</h5>
              <div className="row g-3">
                {causes
                  .filter((c) => c.slug !== cause.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <div key={item.slug} className="col-12 col-md-4">
                      <Link to={item.detailUrl} className="text-decoration-none text-dark">
                        <div className="border rounded-3 p-2 bg-light hover-shadow transition h-100">
                          <img
                            src={item.cardImage}
                            alt={item.name}
                            className="w-100 rounded-2 mb-2"
                            style={{ height: "110px", objectFit: "cover" }}
                          />
                          <p className="fw-bold small mb-1 text-truncate">{item.name}</p>
                          <span className="text-primary fw-bold small">{item.amountTitle}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Donation Calculator Right Column */}
          <div className="col-12 col-lg-5">
            <div className="bg-white rounded-4 p-4 shadow-sm border position-sticky" style={{ top: "20px" }}>
              <div className="border-bottom pb-3 mb-3">
                <span className="badge bg-danger-subtle text-danger fw-bold px-2 py-1 mb-2">
                  <i className="ri-flashlight-line me-1"></i> Fast 1-Minute Checkout
                </span>
                <h3 className="fw-bold fs-4 text-dark m-0">Support {cause.name}</h3>
              </div>

              {donationSuccess ? (
                <div className="text-center py-5">
                  <div
                    className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3 shadow"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="ri-check-line fs-1"></i>
                  </div>
                  <h4 className="fw-bold text-dark">Thank You for Your Kindness!</h4>
                  <p className="text-secondary small mb-4">
                    Your contribution of <strong className="text-primary fs-5">₹{totalAmount.toLocaleString()}</strong> for{" "}
                    <strong>{unitCount} {cause.unitLabel}s</strong> has been safely recorded in our system. A verification log has been printed to the browser console.
                  </p>
                  <button
                    className="btn btn-primary fw-bold px-4 py-2 rounded-3"
                    onClick={() => setDonationSuccess(false)}
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDonationSubmit}>
                  {/* Select Units */}
                  <div className="mb-3">
                    <label className="fw-bold small text-secondary mb-2 d-flex justify-content-between">
                      <span>Select number of {cause.unitLabel}s to sponsor:</span>
                      <span className="text-primary fw-bold">₹{cause.unitPrice} each</span>
                    </label>

                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {chipOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`btn btn-sm fw-bold px-3 py-2 rounded-3 ${
                            unitCount === opt ? "btn-primary text-white" : "btn-light border text-dark"
                          }`}
                          onClick={() => setUnitCount(opt)}
                        >
                          +{opt}
                        </button>
                      ))}
                    </div>

                    <div className="input-group">
                      <span className="input-group-text bg-light fw-bold text-secondary">Custom Units:</span>
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        className="form-control fw-bold"
                        value={unitCount}
                        onChange={(e) => setUnitCount(Math.max(1, Number(e.target.value)))}
                      />
                    </div>
                  </div>

                  {/* Occasion & Date */}
                  <div className="row g-2 mb-3">
                    <div className="col-md-6">
                      <label className="fw-bold small text-secondary mb-1">Occasion:</label>
                      <select
                        className="form-select small"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        style={{ height: "42px" }}
                      >
                        <option value="General Donation">General Donation</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="In Memory Of">In Memory Of</option>
                        <option value="Special Festival">Special Festival</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="fw-bold small text-secondary mb-1">Celebration Date:</label>
                      <input
                        type="date"
                        className="form-control small"
                        value={celebrationDate}
                        onChange={(e) => setCelebrationDate(e.target.value)}
                        style={{ height: "42px" }}
                      />
                    </div>
                  </div>

                  {/* Add-ons Checkboxes */}
                  <div className="bg-light p-3 rounded-3 mb-3 border">
                    <p className="fw-bold small text-dark mb-2">Special Documentation Add-ons:</p>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="videoWishCheck"
                        checked={includeVideoWish}
                        onChange={(e) => setIncludeVideoWish(e.target.checked)}
                      />
                      <label className="form-check-label small d-flex justify-content-between cursor-pointer" htmlFor="videoWishCheck">
                        <span>Personalized Wishing Video from Children</span>
                        <strong className="text-primary">+₹1,500</strong>
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="bannerCheck"
                        checked={includeBanner}
                        onChange={(e) => setIncludeBanner(e.target.checked)}
                      />
                      <label className="form-check-label small d-flex justify-content-between cursor-pointer" htmlFor="bannerCheck">
                        <span>Printed Flex Banner with Donor Photo</span>
                        <strong className="text-primary">+₹500</strong>
                      </label>
                    </div>
                  </div>

                  {/* Donor Details */}
                  <div className="mb-3">
                    <label className="fw-bold small text-secondary mb-1">Donor Details:</label>
                    <div className="d-flex flex-column gap-2">
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        className="form-control"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                        style={{ height: "44px" }}
                      />
                      <input
                        type="tel"
                        placeholder="Mobile (for WhatsApp proof update) *"
                        maxLength="10"
                        className="form-control"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, ""))}
                        required
                        style={{ height: "44px" }}
                      />
                      <input
                        type="email"
                        placeholder="Email (for 80G tax receipt) *"
                        className="form-control"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                        style={{ height: "44px" }}
                      />
                      <input
                        type="text"
                        placeholder="PAN Number (Optional, for 80G tax exemption)"
                        className="form-control text-uppercase"
                        maxLength="10"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                        style={{ height: "44px" }}
                      />
                    </div>
                  </div>

                  {/* Total Summary & Checkout Button */}
                  <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded-3 mb-3 border">
                    <span className="fw-semibold text-secondary">Total Donation:</span>
                    <span className="fw-bold fs-4 text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-100 fw-bold py-3 fs-5 shadow rounded-3 border-0"
                    style={{ backgroundColor: "#009dff" }}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <span>
                        <i className="ri-heart-add-fill me-1"></i> Proceed to Donate ₹{totalAmount.toLocaleString()}
                      </span>
                    )}
                  </button>

                  <p className="text-center text-muted small mt-2 mb-0">
                    <i className="ri-lock-fill me-1"></i> 256-Bit Encrypted &amp; 100% Tax Exempt under Sec 80G
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
