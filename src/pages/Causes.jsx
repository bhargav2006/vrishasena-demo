import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { causes } from "../data/causesData";

export default function Causes() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const categories = [
    { key: "all", label: "All Causes" },
    { key: "food", label: "Food & Meals" },
    { key: "education", label: "Education" },
    { key: "animals", label: "Animal Care" },
    { key: "healthcare", label: "Healthcare" },
    { key: "birthday", label: "Celebration" },
    { key: "environment", label: "Environment" },
    { key: "livelihood", label: "Livelihood" },
    { key: "others", label: "Disaster Relief" }
  ];

  const filteredCauses = causes.filter((cause) => {
    const matchesCat = activeCategory === "all" || cause.category === activeCategory;
    const matchesQuery =
      cause.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cause.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="causes-overview-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold fs-1 text-dark mb-2">Support Our Causes</h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Every rupee you donate creates tangible, photo-verified change for children, the homeless, animals, and communities across India.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="bg-white p-4 rounded-4 shadow-sm border mb-5">
          <div className="row g-3 align-items-center mb-4">
            <div className="col-12 col-md-8 mx-auto">
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white border-end-0 text-secondary">
                  <i className="ri-search-line fs-5"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 fs-6"
                  placeholder="Search causes (e.g. food, biryani, dogs, trees, slippers)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary border-start-0"
                    type="button"
                    onClick={() => setSearchQuery("")}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`btn btn-sm fw-bold px-3 py-2 rounded-pill transition ${
                  activeCategory === cat.key ? "btn-primary text-white" : "btn-light border text-secondary"
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Causes Grid */}
        <div className="row g-4">
          {filteredCauses.length === 0 ? (
            <div className="col-12 text-center py-5 text-muted">
              <i className="ri-search-eye-line fs-1 d-block mb-3 text-secondary"></i>
              <h4>No causes found</h4>
              <p>Try resetting the search or selecting a different category.</p>
              <button
                className="btn btn-primary fw-bold mt-2"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredCauses.map((cause) => (
              <div key={cause.slug} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm hover-shadow transition d-flex flex-column bg-white">
                  <div className="position-relative">
                    <img
                      src={cause.cardImage}
                      alt={cause.name}
                      className="card-img-top"
                      style={{ height: "230px", objectFit: "cover" }}
                    />
                    <span
                      className="position-absolute top-0 start-0 m-2 badge bg-dark bg-opacity-75 text-white text-uppercase"
                      style={{ fontSize: "11px", letterSpacing: "0.5px" }}
                    >
                      {cause.category}
                    </span>
                  </div>

                  <div className="card-body p-3 d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <h5 className="card-title fw-bold fs-6 text-dark mb-1">
                        <Link to={cause.detailUrl} className="text-decoration-none text-dark">
                          {cause.name}
                        </Link>
                      </h5>
                      <span className="text-primary fw-bold fs-6 d-block mb-2">{cause.amountTitle}</span>
                      <p className="card-text text-secondary small line-clamp-2 mb-3">
                        {cause.shortDescription}
                      </p>
                    </div>

                    <Link
                      to={cause.detailUrl}
                      className="btn btn-primary w-100 fw-bold py-2 rounded-3 text-decoration-none"
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
