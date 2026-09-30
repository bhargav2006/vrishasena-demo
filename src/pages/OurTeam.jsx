import React from "react";
import { Link } from "react-router-dom";
import { teamMembers, branchTeams } from "../data/teamData";

export default function OurTeam() {
  return (
    <div className="team-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Our Team
            </li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
            The Hearts Behind Thaagam
          </span>
          <h1 className="fw-bold fs-1 text-dark mb-2">Meet Our Leadership &amp; Teams</h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Passionate humanitarians, community organizers, cooks, drivers, and field volunteers working 24x7 to uplift underprivileged families.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="row g-4 justify-content-center mb-5">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-5">
              <div className="card h-100 border-0 rounded-4 shadow-sm p-4 text-center bg-white">
                <div className="mx-auto mb-3" style={{ width: "160px", height: "160px" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle w-100 h-100 border p-1 shadow-sm"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src = "/static/website/assets/images/about/ceo_bg.png";
                    }}
                  />
                </div>
                <h4 className="fw-bold text-dark fs-4 mb-1">{member.name}</h4>
                <p className="text-primary fw-bold small text-uppercase mb-3">{member.role}</p>
                <p className="text-secondary small leading-relaxed m-0">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Regional Branch Teams */}
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border mb-5">
          <h3 className="fw-bold fs-3 text-dark text-center mb-4">Regional Branches &amp; Kitchen Centers</h3>
          <div className="row g-4">
            {branchTeams.map((team, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="border rounded-3 overflow-hidden shadow-sm h-100 bg-light">
                  <img
                    src={team.image}
                    alt={team.location}
                    className="w-100"
                    style={{ height: "190px", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src = "/static/website/assets/images/about/team_1.webp";
                    }}
                  />
                  <div className="p-3 text-center">
                    <h6 className="fw-bold text-dark mb-1">{team.location}</h6>
                    <small className="text-secondary">{team.title}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Follow banner */}
        <div className="linkedin-card bg-primary text-white rounded-4 p-4 p-md-5 text-center shadow">
          <h3 className="fw-bold mb-2">Connect With Our Team On Social Media</h3>
          <p className="mb-4 text-white-50">
            We post daily videos, distribution photos, and live field reports. Follow us to stay updated with our ground impact!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="https://www.instagram.com/thaagamfoundation/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-light fw-bold text-dark px-4 py-2 rounded-3"
            >
              <i className="ri-instagram-fill text-danger me-1"></i> Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/thaagamfoundation/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-light fw-bold text-dark px-4 py-2 rounded-3"
            >
              <i className="ri-linkedin-box-fill text-primary me-1"></i> LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@thaagamfoundation9777"
              target="_blank"
              rel="noreferrer"
              className="btn btn-light fw-bold text-dark px-4 py-2 rounded-3"
            >
              <i className="ri-youtube-fill text-danger me-1"></i> YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
