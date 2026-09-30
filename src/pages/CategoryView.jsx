import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { causes, categories } from '../data/causesData';

export default function CategoryView({ categoryKey, title, description, bannerBg }) {
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\/|\/$/g, '');

  // Detect category from prop or path
  const targetCategory = categoryKey || currentPath;

  // Filter causes matching this category
  const filteredCauses = causes.filter((c) => {
    if (targetCategory === 'food') return c.category === 'food';
    if (targetCategory === 'animal') return c.category === 'animals';
    if (targetCategory === 'environment') return c.category === 'environment';
    if (targetCategory === 'homeless') return c.slug.includes('homeless') || c.category === 'food';
    if (targetCategory === 'egg_milk') return c.slug.includes('egg') || c.slug.includes('milk') || c.category === 'food';
    if (targetCategory === 'nepal_flood') return c.slug.includes('flood') || c.category === 'food';
    return true;
  });

  const categoryTitles = {
    food: 'Fight Hunger Together — Nutritious Meal Drives',
    animal: 'Animal Welfare & Stray Care Mission',
    environment: 'Creating a Greener Tomorrow — Environmental Action',
    homeless: 'Feed a Homeless Person — Compassion on Streets',
    egg_milk: 'Give Egg & Milk — Daily Nutrition for Underprivileged Children',
    nepal_flood: 'Disaster & Emergency Humanitarian Relief',
  };

  const categoryDescriptions = {
    food: 'Join our daily food distribution drives across Chennai, Bengaluru, and tier-2 cities. Ensuring no one sleeps hungry.',
    animal: 'Every street dog, rescued cat, and injured animal deserves food, emergency medical assistance, and shelter.',
    environment: 'Plant native trees, clean public water bodies, and inspire young climate champions for sustainable green communities.',
    homeless: 'Providing warm daily meals, clean clothing, and basic medical care to destitute individuals surviving on pavements.',
    egg_milk: 'Enriching underprivileged children and growing kids with vital protein, calcium, and vitamins through daily eggs and milk.',
    nepal_flood: 'Rapid response relief camps supplying food packets, drinking water, medicines, and tarpaulin shelters to disaster victims.',
  };

  const displayTitle = title || categoryTitles[targetCategory] || 'Campaigns for Change';
  const displayDesc = description || categoryDescriptions[targetCategory] || 'Support our ongoing grassroots missions.';

  return (
    <div className="category-view-page">
      {/* Banner */}
      <section
        className="py-5"
        style={{
          background: bannerBg || 'linear-gradient(135deg, #009dff 0%, #0052cc 100%)',
          color: 'white',
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bolder" style={{ fontSize: '2.4rem' }}>{displayTitle}</h1>
          <p className="mt-2 text-white-50" style={{ maxWidth: '680px', margin: '0 auto' }}>
            {displayDesc}
          </p>
          <nav aria-label="breadcrumb" className="breadcrumb-row mt-3">
            <ul className="breadcrumb justify-content-center" style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
              <li>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.6)' }}>/</li>
              <li style={{ color: 'white', fontWeight: 600 }}>{targetCategory.replace(/_/g, ' ').toUpperCase()}</li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Causes Listing */}
      <div className="container py-5">
        <div className="row g-4">
          {filteredCauses.map((cause) => {
            const percent = Math.min(100, Math.round(((cause.raisedAmount || 0) / (cause.goalAmount || 1)) * 100));
            const img = cause.cardImage || cause.image;
            const desc = cause.shortDescription || cause.description || cause.longDescription;

            return (
              <div key={cause.slug} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  style={{ borderRadius: '16px', transition: 'transform 0.2s', background: '#fff' }}
                >
                  <div className="position-relative">
                    <img
                      src={img}
                      alt={cause.name}
                      style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://thaagamorg-eb-s3.s3.amazonaws.com/static/website/images/country/india.png';
                      }}
                    />
                    <span
                      className="badge position-absolute top-0 start-0 m-3 px-3 py-1"
                      style={{ backgroundColor: '#009dff', borderRadius: '20px', fontSize: '0.75rem' }}
                    >
                      {cause.amountTitle}
                    </span>
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-2" style={{ fontSize: '1.2rem' }}>
                      {cause.name}
                    </h5>
                    <p className="card-text text-muted small mb-4 flex-grow-1" style={{ lineHeight: 1.5 }}>
                      {desc}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${percent}%`,
                            background: 'linear-gradient(90deg, #009dff 0%, #00d2ff 100%)',
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-2" style={{ fontSize: '0.85rem' }}>
                        <span className="fw-bold text-dark">₹{(cause.raisedAmount || 0).toLocaleString()} raised</span>
                        <span className="text-muted">Goal: ₹{(cause.goalAmount || 0).toLocaleString()}</span>
                      </div>
                    </div>

                    <Link
                      to={`/causes-detail/${cause.slug}`}
                      className="btn btn-primary w-100 py-2 fw-semibold text-center text-decoration-none"
                      style={{
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                        border: 'none',
                      }}
                    >
                      Donate Now (₹{cause.unitPrice})
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
