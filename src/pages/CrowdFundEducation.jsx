import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/backendMock";

export default function CrowdFundEducation() {
  const students = [
    {
      id: 496,
      name: "Santhosh M",
      category: "Low Income",
      raised: 50143,
      goal: 60000,
      image: "https://media.thaagam.org/media/crowdfund_education/images/santhosh.webp",
      isUrgent: true,
      standard: "Class 10 - Matriculation",
      story: "Santhosh is an ambitious student dreaming of becoming an engineer. His father works on daily wages and struggled to pay the board exam and lab fees."
    },
    {
      id: 725,
      name: "Hemalathea",
      category: "Single Parent",
      raised: 6833,
      goal: 45000,
      image: "https://media.thaagam.org/media/crowdfund_education/images/hemalathea_20260828_161349_832771.webp",
      isUrgent: true,
      standard: "Class 8 - High School",
      story: "Raised by a single mother working as a housemaid, Hemalathea's schooling was at risk until Thaagam stepped in to cover her textbooks, uniform, and tuition."
    },
    {
      id: 839,
      name: "Agathiya M",
      category: "Single Parent",
      raised: 12500,
      goal: 30000,
      image: "https://media.thaagam.org/media/crowdfund_education/images/agathiya_m_20260925_153254_098265.webp",
      isUrgent: true,
      standard: "Class 6 - Primary",
      story: "Agathiya excels in mathematics and science. Her mother's modest earnings from tailor work are insufficient to pay her annual educational fees."
    },
    {
      id: 830,
      name: "Dharshika Sri G",
      category: "Single Parent",
      raised: 18400,
      goal: 32000,
      image: "https://media.thaagam.org/media/crowdfund_education/images/dharshika_sri_g_20260925_104325_105214.webp",
      isUrgent: false,
      standard: "Class 7 - Middle School",
      story: "A bright young student aspiring to become a doctor. Financial hardship threatened her dream before our education support campaign intervened."
    },
    {
      id: 842,
      name: "Lalitha A",
      category: "Low Income",
      raised: 28000,
      goal: 35000,
      image: "https://media.thaagam.org/media/crowdfund_education/images/lalitha_a_20260925_181343_275521.webp",
      isUrgent: false,
      standard: "Class 9 - Secondary",
      story: "Lalitha's parents are agricultural day-laborers whose seasonal income plummeted. She needs scholarship support to continue attending school."
    }
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [donateAmount, setDonateAmount] = useState(1000);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const filteredStudents = students.filter((s) => {
    const matchesCat =
      activeTab === "all" ||
      s.category.toLowerCase().replace(/\s+/g, "") === activeTab.toLowerCase().replace(/\s+/g, "");
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDonateStudent = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      amount: donateAmount,
      donorName,
      donorPhone,
      donorEmail,
      type: "education_crowdfund"
    };

    api.submitDonation(payload).then(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedStudent(null);
      }, 3500);
    });
  };

  return (
    <div className="crowdfund-edu-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/causes" className="text-decoration-none text-secondary">Causes</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Crowdfund Education
            </li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <span className="badge bg-primary px-3 py-2 rounded-pill fw-bold mb-2">
            Child Education Sponsorship
          </span>
          <h1 className="fw-bold fs-1 text-dark mb-2">Support a Child’s Dream to Learn</h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Directly sponsor the school tuition, uniforms, and books for verified underprivileged and single-parent children in need.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-4 shadow-sm border mb-5">
          <div className="row g-3 align-items-center mb-4">
            <div className="col-12 col-md-6 mx-auto">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="ri-search-line text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search student by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {["all", "Single Parent", "Low Income", "Completed"].map((tab) => (
              <button
                key={tab}
                className={`btn btn-sm fw-bold px-3 py-2 rounded-pill ${
                  activeTab.toLowerCase() === tab.toLowerCase() ? "btn-primary text-white" : "btn-light border text-secondary"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "all" ? "All Students" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Student Cards */}
        <div className="row g-4">
          {filteredStudents.map((st) => {
            const pct = Math.min(Math.round((st.raised / st.goal) * 100), 100);
            return (
              <div key={st.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm bg-white hover-shadow transition">
                  <div className="position-relative" style={{ height: "240px" }}>
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.currentTarget.src = "/static/website/assets/images/edu_categories/checked.png";
                      }}
                    />
                    <span className="position-absolute top-0 start-0 m-2 badge bg-primary">
                      {st.category}
                    </span>
                    {st.isUrgent && (
                      <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
                        URGENT
                      </span>
                    )}
                  </div>

                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h4 className="fw-bold fs-5 text-dark mb-1">{st.name}</h4>
                      <p className="text-secondary small fw-semibold mb-3">{st.standard}</p>
                      <p className="text-secondary small leading-relaxed line-clamp-3 mb-3">
                        {st.story}
                      </p>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between small fw-bold mb-1">
                          <span className="text-success">Raised: ₹{st.raised.toLocaleString()}</span>
                          <span className="text-secondary">Goal: ₹{st.goal.toLocaleString()}</span>
                        </div>
                        <div className="progress" style={{ height: "8px", borderRadius: "999px" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${pct}%` }}
                            role="progressbar"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary w-100 fw-bold py-2 rounded-3 shadow-sm"
                      onClick={() => setSelectedStudent(st)}
                    >
                      <i className="ri-heart-add-fill me-1"></i> Sponsor {st.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sponsor Modal */}
        {selectedStudent && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.65)", zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold m-0 fs-5">Sponsor {selectedStudent.name}</h4>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedStudent(null)}
                  ></button>
                </div>

                {success ? (
                  <div className="text-center py-4">
                    <i className="ri-checkbox-circle-fill text-success fs-1 mb-2 d-block"></i>
                    <h5 className="fw-bold">Donation Logged!</h5>
                    <p className="text-secondary small">
                      Thank you! Your sponsorship of ₹{donateAmount} for {selectedStudent.name} has been processed in console.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDonateStudent}>
                    <p className="text-secondary small mb-3">
                      Remaining goal: <strong>₹{(selectedStudent.goal - selectedStudent.raised).toLocaleString()}</strong>
                    </p>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">Select Support Amount (₹):</label>
                      <div className="d-flex gap-2 mb-2">
                        {[500, 1000, 2500, 5000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            className={`btn btn-sm fw-bold flex-fill ${
                              donateAmount === amt ? "btn-primary" : "btn-light border"
                            }`}
                            onClick={() => setDonateAmount(amt)}
                          >
                            ₹{amt}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        min="100"
                        className="form-control"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(Number(e.target.value))}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        className="form-control mb-2"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                      />
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="Mobile Number *"
                        className="form-control mb-2"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, ""))}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        className="form-control"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-100 fw-bold py-3 mt-3 rounded-3"
                    >
                      {isSubmitting ? "Logging..." : `Confirm Sponsorship of ₹${donateAmount}`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
