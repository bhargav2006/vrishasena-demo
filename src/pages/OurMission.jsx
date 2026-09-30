import React from "react";
import { Link } from "react-router-dom";

export default function OurMission() {
  return (
    <div className="mission-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Our Mission
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border mb-5">
          <div className="text-center max-w-700 mx-auto mb-5" style={{ maxWidth: "720px" }}>
            <span className="badge bg-danger-subtle text-danger fw-bold px-3 py-2 rounded-pill mb-3">
              Compassion in Action
            </span>
            <h1 className="fw-bold fs-1 text-dark mb-3">Our Mission &amp; Core Vision</h1>
            <p className="text-secondary fs-5">
              To build a society where no individual goes to sleep hungry, every child has the freedom to learn, and dignity is restored to the most vulnerable lives.
            </p>
          </div>

          <div className="row g-4 align-items-center mb-5">
            <div className="col-12 col-lg-6">
              <h3 className="fw-bold text-dark fs-3 mb-3">Why Thaagam Was Founded</h3>
              <p className="text-secondary leading-relaxed mb-3">
                "Thaagam" is a Tamil word translating to an unquenchable thirst. For us, it signifies a relentless thirst to serve, a thirst for justice, and a thirst to ensure that basic human nourishment is available to all regardless of caste, creed, or background.
              </p>
              <p className="text-secondary leading-relaxed mb-3">
                Founded with grassroots volunteer drives distributing water packets to dehydrated day-laborers in the scorching heat of Chennai, Thaagam quickly evolved into an expansive relief organisation operating round-the-clock kitchens and nationwide relief missions.
              </p>
              <div className="d-flex align-items-center gap-3 mt-4">
                <Link to="/causes" className="btn btn-primary fw-bold px-4 py-2 rounded-3">
                  Support Our Mission
                </Link>
                <Link to="/volunteer" className="btn btn-outline-primary fw-bold px-4 py-2 rounded-3">
                  Become a Volunteer
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <img
                src="/static/website/assets/images/banner/birthday.webp"
                alt="Thaagam Foundation Mission"
                className="img-fluid rounded-4 shadow"
                onError={(e) => {
                  e.currentTarget.src = "/static/website/assets/images/nee.webp";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
