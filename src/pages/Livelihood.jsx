import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/backendMock';

export default function Livelihood() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [donationAmount, setDonationAmount] = useState(1000);
  const [donorDetails, setDonorDetails] = useState({ name: '', phone: '', email: '' });
  const [donateSuccess, setDonateSuccess] = useState(false);

  const trainees = [
    {
      id: '53',
      name: 'Yuvarajan S',
      category: 'engineering',
      course: 'Auto Mobiles Technology — Nicola Educational and Research Foundation',
      raised: 27205,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Yuvarajan_Photos.webp',
      completed: true,
    },
    {
      id: '41',
      name: 'Dinesh Karthick',
      category: 'engineering',
      course: 'Auto motive service technician — Nicola Educational and Research Foundation',
      raised: 110,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Dinesh_Karthick_G_-_Photo.webp',
      completed: false,
    },
    {
      id: '39',
      name: 'Mugundhan Kandhan',
      category: 'engineering',
      course: 'Auto motive service technician — Nicola Educational and Research Foundation',
      raised: 205,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Mugundhan_Kandhan_-_Photo.webp',
      completed: false,
    },
    {
      id: '37',
      name: 'N T Yuvaraj',
      category: 'engineering',
      course: 'Auto Mobiles — Nicola Educational and Research Foundation',
      raised: 1005,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Yuvaraj_N_T-_Photo.webp',
      completed: false,
    },
    {
      id: '57',
      name: 'K Ebenezer',
      category: 'engineering',
      course: 'Auto Mobiles Technology — Nicola Educational and Research Foundation',
      raised: 505,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Ebenzer_Photo_.webp',
      completed: false,
    },
    {
      id: '55',
      name: 'Nirmal kumar S',
      category: 'engineering',
      course: 'Auto motive service technician — Nicola Educational and Research Foundation',
      raised: 105,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Nirmalraj_Photos.webp',
      completed: false,
    },
    {
      id: '45',
      name: 'R Vishal',
      category: 'engineering',
      course: 'Auto Mobiles Technology — Nicola Educational and Research Foundation',
      raised: 105,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Vishal_R_-_Photo.webp',
      completed: false,
    },
    {
      id: '43',
      name: 'Vijayasarathi',
      category: 'engineering',
      course: 'Auto motive service technician — Nicola Educational and Research Foundation',
      raised: 255,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Vijayasarathi_A_-_Photo.webp',
      completed: false,
    },
    {
      id: '1',
      name: 'Thasthageer S',
      category: 'arts',
      course: 'Automobiles — Nicola Educational and Research Foundation',
      raised: 8722,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/thasthageer.webp',
      completed: false,
    },
    {
      id: '2',
      name: 'Gopi S',
      category: 'other',
      course: 'Automobiles — Nicola Educational and Research Foundation',
      raised: 110,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Gopi_S_PHOTO.webp',
      completed: false,
    },
    {
      id: '3',
      name: 'Santhosh kumar',
      category: 'other',
      course: 'Automotive service technician — Nicola Educational and Research Foundation',
      raised: 105,
      goal: 27000,
      image: 'https://media.thaagam.org/media/livelihood/images/Gemini_Generated_Image_gjqry8gjqry8gjqr.webp',
      completed: false,
    },
  ];

  const filtered = trainees.filter((t) => {
    const matchesCat =
      activeCategory === 'all' ||
      (activeCategory === 'completed' ? t.completed : t.category === activeCategory);
    const matchesQuery = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    await api.donateToCause({
      traineeId: selectedTrainee.id,
      traineeName: selectedTrainee.name,
      amount: donationAmount,
      donor: donorDetails,
    });
    setDonateSuccess(true);
    setTimeout(() => {
      setDonateSuccess(false);
      setSelectedTrainee(null);
    }, 2500);
  };

  return (
    <div className="livelihood-page">
      {/* Banner */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #009dff 0%, #0052cc 100%)',
          color: 'white',
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bolder" style={{ fontSize: '2.4rem' }}>
            Empower Youth with Vocational Livelihood
          </h1>
          <p className="mt-2 text-white-50" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Support aspiring technicians and youth from underprivileged backgrounds in receiving hands-on automotive and industrial engineering skills.
          </p>
          <nav aria-label="breadcrumb" className="breadcrumb-row mt-3">
            <ul className="breadcrumb justify-content-center" style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
              <li>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.6)' }}>/</li>
              <li style={{ color: 'white', fontWeight: 600 }}>Livelihood</li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Controls & Filter */}
      <div className="container py-4">
        <div className="row align-items-center justify-content-between g-3 mb-4">
          <div className="col-md-7">
            <div className="d-flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Campaigns' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'arts', label: 'Arts & Vocational' },
                { id: 'other', label: 'Other Skills' },
                { id: 'completed', label: 'Completed' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`btn btn-sm px-3 py-2 ${activeCategory === cat.id ? 'btn-primary' : 'btn-light border'}`}
                  style={{
                    borderRadius: '20px',
                    fontWeight: 600,
                    background: activeCategory === cat.id ? '#009dff' : '#f9fafb',
                    borderColor: activeCategory === cat.id ? '#009dff' : '#e5e7eb',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="ri-search-line text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by trainee name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: '0 8px 8px 0' }}
              />
            </div>
          </div>
        </div>

        {/* Trainees Grid */}
        <div className="row g-4">
          {filtered.map((t) => {
            const percent = Math.min(100, Math.round((t.raised / t.goal) * 100));
            return (
              <div key={t.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  style={{ borderRadius: '16px', transition: 'transform 0.2s', background: '#fff' }}
                >
                  <div className="position-relative">
                    <img
                      src={t.image}
                      alt={t.name}
                      style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://thaagamorg-eb-s3.s3.amazonaws.com/static/website/images/country/india.png';
                      }}
                    />
                    <span
                      className="badge position-absolute top-0 start-0 m-3 px-3 py-1"
                      style={{
                        backgroundColor: t.completed ? '#28a745' : '#0063fe',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                      }}
                    >
                      {t.completed ? 'Completed' : t.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="card-body p-3 d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-1" style={{ fontSize: '1.1rem' }}>
                      {t.name}
                    </h5>
                    <p className="card-text text-muted small mb-3 flex-grow-1" style={{ lineHeight: 1.4 }}>
                      {t.course}
                    </p>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="progress" style={{ height: '6px', borderRadius: '4px' }}>
                        <div
                          className={`progress-bar ${t.completed ? 'bg-success' : 'bg-primary'}`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1" style={{ fontSize: '0.8rem' }}>
                        <span className="fw-semibold text-dark">₹{t.raised.toLocaleString()} raised</span>
                        <span className="text-muted">Goal: ₹{t.goal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTrainee(t)}
                      className="btn btn-primary w-100 py-2 fw-semibold"
                      style={{
                        borderRadius: '8px',
                        background: t.completed ? '#28a745' : 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                        border: 'none',
                      }}
                    >
                      {t.completed ? 'Support Next Trainee' : 'Support Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trainee Support Modal */}
      {selectedTrainee && (
        <div
          className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px' }}
        >
          <div
            className="bg-white p-4 p-md-5 position-relative"
            style={{ maxWidth: '480px', width: '100%', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <button
              onClick={() => setSelectedTrainee(null)}
              className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle"
              style={{ width: '36px', height: '36px' }}
            >
              <i className="ri-close-line fs-5"></i>
            </button>

            {donateSuccess ? (
              <div className="text-center py-4">
                <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '64px' }}></i>
                <h4 className="fw-bold mt-2">Support Received!</h4>
                <p className="text-muted">Thank you for supporting {selectedTrainee.name}'s education and livelihood!</p>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={selectedTrainee.image}
                    alt={selectedTrainee.name}
                    style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="fw-bold m-0 text-dark">{selectedTrainee.name}</h5>
                    <span className="badge bg-primary-subtle text-primary">Vocational Training</span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">Choose Contribution Amount (₹)</label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {[500, 1000, 2500, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDonationAmount(amt)}
                        className={`btn btn-sm ${donationAmount === amt ? 'btn-primary' : 'btn-outline-secondary'}`}
                        style={{ borderRadius: '8px', fontWeight: 600 }}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    min="100"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">Your Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={donorDetails.name}
                    onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small">Mobile Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="10-digit mobile number"
                    value={donorDetails.phone}
                    onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #009dff 0%, #0066cc 100%)',
                    border: 'none',
                    borderRadius: '12px',
                  }}
                >
                  Confirm Contribution of ₹{donationAmount.toLocaleString()}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
