import React, { useState } from "react";
import { Link } from "react-router-dom";
import { packages } from "../data/packagesData";
import api from "../utils/backendMock";

export default function Celebration() {
  const [selectedPackage, setSelectedPackage] = useState(packages[0].id);
  const [celebrantName, setCelebrantName] = useState("");
  const [celebrationDate, setCelebrationDate] = useState(new Date().toISOString().split("T")[0]);
  const [cakeFlavor, setCakeFlavor] = useState("Chocolate");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const activePkg = packages.find((p) => p.id === Number(selectedPackage)) || packages[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      packageId: activePkg.id,
      packageName: activePkg.title,
      amount: activePkg.amount,
      celebrantName,
      celebrationDate,
      cakeFlavor,
      donorPhone,
      donorEmail,
      specialMessage
    };

    api.submitDonation(payload).then(() => {
      setIsSubmitting(false);
      setBooked(true);
    });
  };

  return (
    <div className="celebration-page py-5" style={{ backgroundColor: "#fefbf6" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Birthday Celebration
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
            <i className="ri-cake-2-line me-1"></i> Spread Birthday Smiles
          </span>
          <h1 className="fw-bold fs-1 text-dark mb-2">
            Celebrate Your Birthday With Orphanage Children
          </h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Make your special day truly unforgettable by sharing happiness, delicious cake, personalized wishes, and hot meals with kids who cherish every moment.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="row g-4 mb-5">
          {packages.map((pkg) => (
            <div key={pkg.id} className="col-12 col-md-6 col-lg-4">
              <div
                className={`card h-100 border rounded-4 overflow-hidden shadow-sm transition p-3 bg-white ${
                  selectedPackage === pkg.id ? "border-primary ring-2" : ""
                }`}
                style={{
                  cursor: "pointer",
                  borderWidth: selectedPackage === pkg.id ? "2px" : "1px"
                }}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="rounded-3 w-100 mb-3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold text-dark m-0 fs-6">{pkg.title}</h5>
                  <span className="badge bg-primary fs-6 px-3 py-1">{pkg.amountTitle}</span>
                </div>
                <p className="text-secondary small mb-3">{pkg.description}</p>
                <ul className="list-unstyled small text-muted mb-3">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx} className="mb-1 d-flex align-items-center">
                      <i className="ri-check-line text-success me-2"></i> {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn w-100 fw-bold py-2 rounded-3 mt-auto ${
                    selectedPackage === pkg.id ? "btn-primary" : "btn-outline-primary"
                  }`}
                >
                  {selectedPackage === pkg.id ? "Selected" : "Select Package"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border max-w-700 mx-auto" style={{ maxWidth: "750px" }}>
          <h3 className="fw-bold fs-4 text-dark mb-4 text-center">
            Book Your Birthday Drive: <span className="text-primary">{activePkg.title} ({activePkg.amountTitle})</span>
          </h3>

          {booked ? (
            <div className="text-center py-5">
              <div className="rounded-circle bg-success text-white d-inline-flex p-3 mb-3 shadow">
                <i className="ri-cake-3-line fs-1"></i>
              </div>
              <h4 className="fw-bold text-dark">Celebration Booked!</h4>
              <p className="text-secondary small mb-4">
                Thank you, <strong>{celebrantName}</strong>! Your special celebration on{" "}
                <strong>{celebrationDate}</strong> has been scheduled with our shelter home coordinators. A detailed plan has been logged to the console, and our team will get in touch via WhatsApp.
              </p>
              <button className="btn btn-primary fw-bold px-4 py-2" onClick={() => setBooked(false)}>
                Book Another Celebration
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Celebrant Name (On Cake/Banner) *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Aarav / Dr. Ramesh"
                    value={celebrantName}
                    onChange={(e) => setCelebrantName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Celebration Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={celebrationDate}
                    onChange={(e) => setCelebrationDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Preferred Cake Flavor *</label>
                  <select
                    className="form-select"
                    value={cakeFlavor}
                    onChange={(e) => setCakeFlavor(e.target.value)}
                  >
                    <option value="Chocolate Truffle">Chocolate Truffle</option>
                    <option value="Black Forest">Black Forest</option>
                    <option value="Vanilla Strawberry">Vanilla Strawberry</option>
                    <option value="Butterscotch">Butterscotch</option>
                    <option value="Pineapple">Pineapple</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">WhatsApp Mobile Number (For Video Proof) *</label>
                  <input
                    type="tel"
                    maxLength="10"
                    className="form-control"
                    placeholder="10 digit mobile"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
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
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Special Message / Wishing Instructions</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Any particular words you want the children to say in the video?"
                  value={specialMessage}
                  onChange={(e) => setSpecialMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-4 border">
                <span className="fw-semibold text-secondary">Package Investment:</span>
                <span className="fw-bold fs-4 text-primary">{activePkg.amountTitle}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-100 fw-bold py-3 fs-5 shadow rounded-3 border-0"
                style={{ backgroundColor: "#009dff" }}
              >
                {isSubmitting ? "Processing..." : `Confirm Celebration (${activePkg.amountTitle})`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
