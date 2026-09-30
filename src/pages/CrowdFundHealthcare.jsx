import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/backendMock";

export default function CrowdFundHealthcare() {
  const patients = [
    {
      id: 18,
      name: "Master Kavin (Age 4)",
      diagnosis: "Pediatric Leukemia Chemotherapy Support",
      hospital: "Institute of Child Health, Egmore, Chennai",
      raised: 145000,
      goal: 300000,
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/childcare.webp",
      urgent: true,
      story: "Little Kavin requires 6 critical cycles of life-saving chemotherapy. His father is an auto-driver who has exhausted all savings."
    },
    {
      id: 83,
      name: "Mrs. Meenakshi (Age 52)",
      diagnosis: "Post-Accident Orthopedic Knee Reconstruction",
      hospital: "Government General Hospital, Chennai",
      raised: 68000,
      goal: 120000,
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/wheelchair-1.webp",
      urgent: false,
      story: "Suffered complex fractures in a hit-and-run collision. Needs titanium implants and physiotherapy to walk again and care for her family."
    },
    {
      id: 95,
      name: "Baby Aradhana (Age 1)",
      diagnosis: "Congenital Heart Defect Surgery",
      hospital: "MGM Healthcare, Chennai",
      raised: 280000,
      goal: 350000,
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/mothercarekit.webp",
      urgent: true,
      story: "Born with a ventricular septal defect requiring urgent corrective cardiac surgery to ensure healthy oxygen circulation."
    }
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [donateAmount, setDonateAmount] = useState(1500);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleDonatePatient = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      amount: donateAmount,
      donorName,
      donorPhone,
      donorEmail,
      type: "healthcare_crowdfund"
    };

    api.submitDonation(payload).then(() => {
      setIsSubmitting(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setSelectedPatient(null);
      }, 3500);
    });
  };

  return (
    <div className="crowdfund-health-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/causes" className="text-decoration-none text-secondary">Causes</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Healthcare Lifeline
            </li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill mb-2">
            Medical Emergency Relief
          </span>
          <h1 className="fw-bold fs-1 text-dark mb-2">Save Lives Through Kindness</h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Help destitute patients afford life-saving surgeries, chemotherapy, and medicines across accredited government and trust hospitals.
          </p>
        </div>

        <div className="row g-4">
          {patients.map((p) => {
            const pct = Math.min(Math.round((p.raised / p.goal) * 100), 100);
            return (
              <div key={p.id} className="col-12 col-md-4">
                <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm bg-white hover-shadow transition">
                  <div className="position-relative" style={{ height: "230px" }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                    {p.urgent && (
                      <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
                        CRITICAL
                      </span>
                    )}
                  </div>

                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h4 className="fw-bold fs-5 text-dark mb-1">{p.name}</h4>
                      <p className="text-danger small fw-bold mb-1">{p.diagnosis}</p>
                      <p className="text-muted small mb-3">{p.hospital}</p>
                      <p className="text-secondary small leading-relaxed line-clamp-3 mb-3">
                        {p.story}
                      </p>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between small fw-bold mb-1">
                          <span className="text-success">Raised: ₹{p.raised.toLocaleString()}</span>
                          <span className="text-secondary">Goal: ₹{p.goal.toLocaleString()}</span>
                        </div>
                        <div className="progress" style={{ height: "8px", borderRadius: "999px" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${pct}%` }}
                            role="progressbar"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-success w-100 fw-bold py-2 rounded-3 shadow-sm border-0"
                      style={{ backgroundColor: "#21936a" }}
                      onClick={() => setSelectedPatient(p)}
                    >
                      <i className="ri-heart-pulse-fill me-1"></i> Support Patient
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Donate Modal */}
        {selectedPatient && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.65)", zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold m-0 fs-5">Support {selectedPatient.name}</h4>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedPatient(null)}
                  ></button>
                </div>

                {done ? (
                  <div className="text-center py-4">
                    <i className="ri-checkbox-circle-fill text-success fs-1 mb-2 d-block"></i>
                    <h5 className="fw-bold">Donation Processed!</h5>
                    <p className="text-secondary small">
                      Your life-saving support of ₹{donateAmount} for {selectedPatient.name} has been verified and logged to console.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDonatePatient}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Support Amount (₹):</label>
                      <div className="d-flex gap-2 mb-2">
                        {[1000, 2500, 5000, 10000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            className={`btn btn-sm fw-bold flex-fill ${
                              donateAmount === amt ? "btn-success" : "btn-light border"
                            }`}
                            onClick={() => setDonateAmount(amt)}
                          >
                            ₹{amt}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        min="100"
                        className="form-control"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(Number(e.target.value))}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        className="form-control mb-2"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                      />
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="Mobile Number *"
                        className="form-control mb-2"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, ""))}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        className="form-control"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-success w-100 fw-bold py-3 mt-3 rounded-3 border-0"
                      style={{ backgroundColor: "#21936a" }}
                    >
                      {isSubmitting ? "Logging..." : `Donate ₹${donateAmount} for Surgery`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
