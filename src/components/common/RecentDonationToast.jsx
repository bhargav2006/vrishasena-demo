import React, { useState, useEffect } from "react";
import api from "../../utils/backendMock";

export default function RecentDonationToast() {
  const [donations, setDonations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    api.getRecentDonations().then((data) => {
      if (data && data.length > 0) {
        setDonations(data);
      }
    });
  }, []);

  useEffect(() => {
    if (donations.length === 0) return;

    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setCurrentIndex((prev) => (prev + 1) % donations.length);
      }, 4500);
    }, 7500);

    return () => clearInterval(interval);
  }, [donations]);

  if (donations.length === 0 || !visible) return null;

  const current = donations[currentIndex];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "85px",
        left: "20px",
        zIndex: 1040,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "340px",
        animation: "slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          backgroundColor: "#e0f2fe",
          color: "#0284c7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        <i className="ri-heart-3-fill fs-5"></i>
      </div>
      <div>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>
          {current.name}
        </p>
        <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
          Donated <span style={{ color: "#009dff", fontWeight: "700" }}>₹{current.amount}</span> for {current.category}
        </p>
      </div>
    </div>
  );
}
