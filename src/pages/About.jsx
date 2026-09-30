import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-page-wrapper py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              About Us
            </li>
          </ol>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border mb-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-3">
                100% Transparent NGO
              </span>
              <h1 className="fw-bold fs-1 text-dark mb-3">
                Empowering Lives Through Food, Dignity & Compassion
              </h1>
              <p className="text-secondary fs-5 leading-relaxed mb-4">
                Thaagam Foundation is a Chennai-headquartered, registered non-governmental organisation dedicated to eradicating hunger, providing clean water, protecting animals, and giving orphaned children a life full of hope and dignity.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/causes" className="btn btn-primary fw-bold px-4 py-3 rounded-3 shadow-sm">
                  Explore Causes <i className="ri-arrow-right-line ms-1"></i>
                </Link>
                <Link to="/our-team" className="btn btn-outline-secondary fw-bold px-4 py-3 rounded-3">
                  Meet Our Team
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <img
                src="/static/website/assets/images/about/about-banner.webp"
                alt="Thaagam Foundation volunteers"
                className="img-fluid rounded-4 shadow"
                onError={(e) => {
                  e.currentTarget.src = "/static/website/assets/images/ne.webp";
                }}
              />
            </div>
          </div>
        </div>

        {/* Key Pillars */}
        <div className="row g-4 mb-5 text-center">
          <div className="col-12 col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm border h-100">
              <div className="rounded-circle bg-primary-subtle text-primary p-3 d-inline-flex mb-3">
                <i className="ri-bowl-line fs-2"></i>
              </div>
              <h4 className="fw-bold text-dark fs-5 mb-2">Zero Hunger Mission</h4>
              <p className="text-secondary small m-0">
                Operating high-capacity central kitchens preparing over 15,000 hot meals daily distributed to homeless individuals, hospital bystanders, and slum settlements.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm border h-100">
              <div className="rounded-circle bg-success-subtle text-success p-3 d-inline-flex mb-3">
                <i className="ri-camera-lens-fill fs-2"></i>
              </div>
              <h4 className="fw-bold text-dark fs-5 mb-2">100% Photographic Proof</h4>
              <p className="text-secondary small m-0">
                Every single donation is documented with photo or video confirmation featuring the donor's name, guaranteeing unquestioned accountability.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm border h-100">
              <div className="rounded-circle bg-info-subtle text-info p-3 d-inline-flex mb-3">
                <i className="ri-book-read-fill fs-2"></i>
              </div>
              <h4 className="fw-bold text-dark fs-5 mb-2">Holistic Welfare</h4>
              <p className="text-secondary small m-0">
                Beyond food, we equip students with bicycles, plant thousands of native trees, support pediatric patients, and rescue abandoned street animals.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone Numbers */}
        <div className="bg-primary text-white rounded-4 p-5 text-center mb-5 shadow">
          <h2 className="fw-bold mb-4">Our Growing Impact Across India</h2>
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <h3 className="fw-bold fs-1 mb-1">1.15 Cr+</h3>
              <p className="mb-0 text-white-50">Nutritious Meals Served</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold fs-1 mb-1">6.52 L+</h3>
              <p className="mb-0 text-white-50">Global Kind Donors</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold fs-1 mb-1">2,400+</h3>
              <p className="mb-0 text-white-50">Children Educated</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold fs-1 mb-1">50,000+</h3>
              <p className="mb-0 text-white-50">Trees Planted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
