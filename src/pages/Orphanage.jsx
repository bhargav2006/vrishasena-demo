import React from "react";
import { Link } from "react-router-dom";

export default function Orphanage() {
  const needs = [
    {
      title: "Daily Nutrition & Balanced Meals",
      desc: "Providing 3 wholesome hot meals daily along with fresh fruit, milk, and eggs for 120+ residential orphans.",
      icon: "ri-restaurant-2-line",
      color: "bg-primary"
    },
    {
      title: "Formal Schooling & Tuition",
      desc: "Covering school admission fees, science textbooks, notebooks, geometry sets, and evening tutors.",
      icon: "ri-book-read-line",
      color: "bg-success"
    },
    {
      title: "Medical Checkups & Pediatric Care",
      desc: "Regular dental camps, eye tests, seasonal vaccinations, and 24x7 emergency medical attention.",
      icon: "ri-nurse-line",
      color: "bg-danger"
    },
    {
      title: "Recreation & Vocational Skills",
      desc: "Music, sports equipment, computer literacy classes, and soft skill training preparing older youth for life.",
      icon: "ri-trophy-line",
      color: "bg-warning text-dark"
    }
  ];

  return (
    <div className="orphanage-page py-5" style={{ backgroundColor: "#f8fafc" }}>
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
              Support An Orphanage
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border mb-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
                A Loving Sanctuary
              </span>
              <h1 className="fw-bold fs-1 text-dark mb-3">Our Orphanage Homes</h1>
              <p className="text-secondary fs-5 leading-relaxed mb-4">
                Thaagam Foundation supports residential shelter homes where abandoned, orphaned, and single-parent children find not only food and shelter, but a family filled with love, protection, and boundless opportunities.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/celebration" className="btn btn-primary fw-bold px-4 py-3 rounded-3 shadow-sm">
                  <i className="ri-cake-2-line me-1"></i> Celebrate Birthday with Kids
                </Link>
                <Link to="/causes-detail/child_education/" className="btn btn-outline-primary fw-bold px-4 py-3 rounded-3">
                  Sponsor Education
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <img
                src="/static/website/assets/images/orph_card.webp"
                alt="Orphanage children"
                className="img-fluid rounded-4 shadow"
                onError={(e) => {
                  e.currentTarget.src = "/static/website/assets/images/Home_Gallery/gal_3.webp";
                }}
              />
            </div>
          </div>
        </div>

        {/* Pillars of Care */}
        <h3 className="fw-bold fs-3 text-dark text-center mb-4">How We Nurture Every Child</h3>
        <div className="row g-4 mb-5">
          {needs.map((item, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white text-center">
                <div className={`rounded-circle p-3 d-inline-flex mx-auto mb-3 text-white ${item.color}`}>
                  <i className={`${item.icon} fs-2`}></i>
                </div>
                <h5 className="fw-bold text-dark fs-6 mb-2">{item.title}</h5>
                <p className="text-secondary small leading-relaxed m-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visit Callout */}
        <div className="bg-primary text-white p-5 rounded-4 text-center shadow">
          <h2 className="fw-bold mb-2">Want to Visit Our Orphanage Center?</h2>
          <p className="text-white-50 fs-5 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            We welcome donors and volunteers to spend time with the children, share a meal, or teach a skill. Prior registration is required to ensure child safety.
          </p>
          <Link to="/contact" className="btn btn-light fw-bold px-4 py-3 rounded-3 text-dark fs-6">
            Book an Orphanage Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
