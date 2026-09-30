import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import SubscriptionModal from "../common/SubscriptionModal";
import RecentDonationToast from "../common/RecentDonationToast";

export default function Layout({ children }) {
  return (
    <div className="thaagam-app-wrapper d-flex flex-column min-vh-100">
      <Navbar />

      <main className="main_section flex-grow-1">
        {children}
      </main>

      <Footer />
      <BottomNav />
      <SubscriptionModal />
      <RecentDonationToast />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/+919790927575?text=Hello%20Thaagam%20Foundation,%20I%20would%20like%20to%20know%20more%20about%20your%20causes"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float-btn shadow-lg"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "25px",
          width: "56px",
          height: "56px",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "30px",
          zIndex: 1020,
          textDecoration: "none",
          transition: "transform 0.25s ease, box-shadow 0.25s ease"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <i className="ri-whatsapp-fill"></i>
      </a>
    </div>
  );
}
