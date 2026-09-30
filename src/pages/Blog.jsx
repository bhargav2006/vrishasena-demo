import React from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  const csrArticles = [
    {
      title: "Corporate CSR Collaborations with Thaagam Foundation",
      date: "February 2025",
      readTime: "4 min read",
      image: "/static/website/images/recent-posts/education/edu_1.jpg",
      excerpt: "Partner with an 80G and CSR-1 certified entity to direct meaningful corporate social responsibility grants toward zero hunger and child education."
    },
    {
      title: "Sustainable Community Development: How CSR Multiplies Impact",
      date: "January 2025",
      readTime: "5 min read",
      image: "/static/website/assets/images/Home_Gallery/gal_2.webp",
      excerpt: "Explore how corporate employee volunteering and payroll giving are enabling consistent hot meal drives across suburban Chennai and Delhi NCR."
    },
    {
      title: "Transparent Reporting & Third-Party Audit Compliance",
      date: "December 2024",
      readTime: "3 min read",
      image: "/static/website/images/recent-posts/Homeless/CHILD_3.webp",
      excerpt: "Our stringent milestone tracking, photographic evidence, and utilization certificates ensure zero compliance hurdles for your corporate audit."
    }
  ];

  return (
    <div className="blog-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              CSR Partnerships
            </li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <span className="badge bg-primary px-3 py-2 rounded-pill fw-bold mb-2">
            Corporate Social Responsibility
          </span>
          <h1 className="fw-bold fs-1 text-dark mb-2">Partner with Thaagam for CSR</h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Align your organization’s ESG and CSR goals with high-impact hunger relief, clean water, education, and health drives.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {csrArticles.map((post, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm bg-white hover-shadow transition">
                <img
                  src={post.image}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between small text-muted mb-2">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h5 className="card-title fw-bold text-dark fs-5 mb-2">{post.title}</h5>
                    <p className="card-text text-secondary small leading-relaxed">{post.excerpt}</p>
                  </div>
                  <Link to="/contact" className="btn btn-outline-primary btn-sm fw-bold mt-3 align-self-start">
                    Inquire for CSR <i className="ri-arrow-right-line ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CSR Action Callout */}
        <div className="bg-primary text-white p-5 rounded-4 text-center shadow">
          <h2 className="fw-bold mb-2">Looking to Partner with Us for CSR Projects?</h2>
          <p className="text-white-50 fs-5 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            We provide audited utilization certificates, customized branding, employee engagement events, and live reporting.
          </p>
          <Link to="/contact" className="btn btn-light fw-bold px-4 py-3 rounded-3 text-dark fs-6 shadow">
            Contact CSR Relations Team
          </Link>
        </div>
      </div>
    </div>
  );
}
