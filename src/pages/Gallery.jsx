import React, { useState } from "react";
import { Link } from "react-router-dom";
import { galleryCategories, galleryItems } from "../data/galleryData";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Images");
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "All Images") return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="gallery-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Our Gallery
            </li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <h1 className="fw-bold fs-1 text-dark mb-2">Our Moments of Impact</h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Explore real photographs from our daily food distribution drives, education kits, birthday celebrations, and community projects.
          </p>
        </div>

        {/* Category Filter Badges */}
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-5">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm fw-bold px-3 py-2 rounded-pill transition ${
                activeCategory === cat ? "btn-primary text-white" : "btn-light border text-secondary"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="row g-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="gallery_container_page card border-0 rounded-4 overflow-hidden shadow-sm h-100 bg-white hover-shadow transition cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => setLightboxImg(item)}
              >
                <div className="overflow-hidden position-relative" style={{ height: "230px" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-100 h-100 transition"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src = "/static/website/assets/images/Home_Gallery/gal_1.webp";
                    }}
                  />
                  <span
                    className="position-absolute bottom-0 start-0 m-2 badge bg-primary"
                    style={{ fontSize: "11px" }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="card-body p-3">
                  <h6 className="card-title fw-bold text-dark fs-6 mb-0 line-clamp-2">
                    {item.title}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div
            className="lightbox-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", zIndex: 1060 }}
            onClick={() => setLightboxImg(null)}
          >
            <div className="position-relative max-w-700 bg-white rounded-4 overflow-hidden shadow-lg" onClick={(e) => e.stopPropagation()}>
              <button
                className="btn btn-sm btn-dark position-absolute top-0 end-0 m-3 rounded-circle shadow"
                onClick={() => setLightboxImg(null)}
              >
                ✕
              </button>
              <img
                src={lightboxImg.image}
                alt={lightboxImg.title}
                className="img-fluid"
                style={{ maxHeight: "75vh", width: "100%", objectFit: "contain" }}
              />
              <div className="p-3 text-center bg-white border-top">
                <span className="badge bg-primary mb-1">{lightboxImg.category}</span>
                <h5 className="fw-bold text-dark m-0 fs-6">{lightboxImg.title}</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
