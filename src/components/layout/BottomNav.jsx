import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDonation } from "../../context/DonationContext";

export default function BottomNav() {
  const location = useLocation();
  const { openSubscriptionModal } = useDonation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bottom-nav d-md-none" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1030 }}>
      <div className="nav-container d-flex align-items-center justify-content-around py-2 bg-white border-top shadow-lg">
        <Link
          to="/"
          className={`nav-item text-center text-decoration-none ${isActive("/") ? "text-primary fw-bold" : "text-secondary"}`}
          style={{ fontSize: "11px" }}
        >
          <i className="ri-home-5-fill fs-5 d-block"></i>
          <span>Home</span>
        </Link>

        <Link
          to="/causes"
          className={`nav-item text-center text-decoration-none ${isActive("/causes") ? "text-primary fw-bold" : "text-secondary"}`}
          style={{ fontSize: "11px" }}
        >
          <i className="ri-gift-fill fs-5 d-block"></i>
          <span>Campaigns</span>
        </Link>

        <div className="heart_container position-relative" style={{ marginTop: "-20px" }}>
          <button
            onClick={() => openSubscriptionModal("education", 1000)}
            className="nav-item heart-btn btn btn-primary rounded-circle shadow p-0 d-flex align-items-center justify-content-center border-0"
            style={{ width: "52px", height: "52px", backgroundColor: "#009dff" }}
            aria-label="Donate"
          >
            <i className="ri-heart-3-fill fs-4 text-white"></i>
          </button>
        </div>

        <Link
          to="/volunteer"
          className={`nav-item text-center text-decoration-none ${isActive("/volunteer") ? "text-primary fw-bold" : "text-secondary"}`}
          style={{ fontSize: "11px" }}
        >
          <i className="ri-hand-heart-fill fs-5 d-block"></i>
          <span>Volunteer</span>
        </Link>

        <Link
          to="/profile"
          className={`nav-item text-center text-decoration-none ${isActive("/profile") ? "text-primary fw-bold" : "text-secondary"}`}
          style={{ fontSize: "11px" }}
        >
          <i className="ri-user-3-fill fs-5 d-block"></i>
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
