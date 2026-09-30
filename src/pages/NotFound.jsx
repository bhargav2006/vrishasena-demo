import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container py-5 text-center my-5">
      <div
        className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
          color: 'white',
          fontSize: '48px',
        }}
      >
        <i className="ri-compass-3-line"></i>
      </div>
      <h1 className="display-4 fw-bolder text-dark mb-2">404</h1>
      <h3 className="fw-bold text-dark mb-3">Page Not Found</h3>
      <p className="text-muted mx-auto mb-4" style={{ maxWidth: '500px', lineHeight: 1.6 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link
          to="/"
          className="btn btn-primary px-4 py-2 fw-semibold"
          style={{
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
            border: 'none',
          }}
        >
          Return Home
        </Link>
        <Link
          to="/causes"
          className="btn btn-outline-secondary px-4 py-2 fw-semibold"
          style={{ borderRadius: '10px' }}
        >
          View All Causes
        </Link>
      </div>
    </div>
  );
}
