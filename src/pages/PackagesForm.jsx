import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { packages, getPackageById } from "../data/packagesData";
import api from "../utils/backendMock";

export default function PackagesForm() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");

  const [selectedPkg, setSelectedPkg] = useState(
    idParam ? getPackageById(idParam) : packages[0]
  );

  useEffect(() => {
    if (idParam) {
      setSelectedPkg(getPackageById(idParam));
    }
  }, [idParam]);

  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [celebrationDate, setCelebrationDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      packageId: selectedPkg.id,
      packageName: selectedPkg.title,
      amount: selectedPkg.amount,
      donorName,
      donorPhone,
      donorEmail,
      celebrationDate
    };

    api.submitDonation(payload).then(() => {
      setIsSubmitting(false);
      setIsDone(true);
    });
  };

  return (
    <div className="packages-form-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Donation Package
            </li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Selected Package Details Left */}
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded-4 p-4 shadow-sm border h-100">
              <div className="mb-4">
                <span className="badge bg-primary px-3 py-2 rounded-pill fw-bold mb-2">
                  Special Video Package
                </span>
                <h1 className="fw-bold fs-2 text-dark mb-1">{selectedPkg.title}</h1>
                <p className="text-primary fw-bold fs-3 mb-3">{selectedPkg.amountTitle}</p>
                <img
                  src={selectedPkg.image}
                  alt={selectedPkg.title}
                  className="rounded-3 w-100 shadow-sm mb-4"
                  style={{ maxHeight: "350px", objectFit: "cover" }}
                />
                <p className="text-secondary leading-relaxed mb-4">
                  {selectedPkg.description}
                </p>

                <h5 className="fw-bold fs-6 text-dark mb-3">What This Package Includes:</h5>
                <ul className="list-unstyled text-secondary">
                  {selectedPkg.includes.map((item, idx) => (
                    <li key={idx} className="mb-2 d-flex align-items-center">
                      <i className="ri-checkbox-circle-fill text-success fs-5 me-2"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Packages Quick Switch */}
              <div className="border-top pt-4">
                <h6 className="fw-bold text-secondary small mb-3">Switch Package:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      className={`btn btn-sm fw-bold rounded-pill px-3 py-2 ${
                        selectedPkg.id === pkg.id ? "btn-primary text-white" : "btn-light border"
                      }`}
                      onClick={() => setSelectedPkg(pkg)}
                    >
                      {pkg.name} ({pkg.amountTitle})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Right */}
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border position-sticky" style={{ top: "30px" }}>
              <h3 className="fw-bold fs-4 text-dark mb-3">Book This Package</h3>
              <p className="text-secondary small mb-4">
                Complete your booking details below. You will receive real-time updates and full HD video footage on WhatsApp.
              </p>

              {isDone ? (
                <div className="text-center py-5">
                  <i className="ri-checkbox-circle-fill fs-1 text-success d-block mb-2"></i>
                  <h4 className="fw-bold">Package Confirmed!</h4>
                  <p className="text-secondary small mb-4">
                    Your contribution for <strong>{selectedPkg.title}</strong> has been logged to the browser console.
                  </p>
                  <button className="btn btn-primary fw-bold" onClick={() => setIsDone(false)}>
                    Book Another Package
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Full Name (Donor / Celebrant) *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      style={{ height: "46px" }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      maxLength="10"
                      className="form-control"
                      placeholder="10-digit mobile number"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, ""))}
                      required
                      style={{ height: "46px" }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="For 80G tax receipt"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      style={{ height: "46px" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold">Preferred Distribution / Celebration Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={celebrationDate}
                      onChange={(e) => setCelebrationDate(e.target.value)}
                      required
                      style={{ height: "46px" }}
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-4 border">
                    <span className="fw-semibold text-secondary">Total Package Amount:</span>
                    <span className="fw-bold fs-4 text-primary">{selectedPkg.amountTitle}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-100 fw-bold py-3 fs-5 shadow rounded-3 border-0"
                  >
                    {isSubmitting ? "Processing..." : `Confirm Booking (${selectedPkg.amountTitle})`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
