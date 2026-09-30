import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { causes } from "../data/causesData";
import { packages } from "../data/packagesData";
import { faqList } from "../data/faqData";
import { useDonation } from "../context/DonationContext";
import api from "../utils/backendMock";

export default function Home() {
  const { openSubscriptionModal } = useDonation();

  // Hero slider state
  const heroSlides = [
    {
      src: "/static/website/assets/images/slider.webp",
      alt: "Thaagam Foundation volunteers standing with Nepal",
      cta: "Donate to Nepal Flood Relief",
      link: "/nepal_flood"
    },
    {
      src: "/static/website/assets/images/ne.webp",
      alt: "Thaagam Foundation in Action",
      cta: "Support Emergency Relief",
      link: "/nepal_flood"
    },
    {
      src: "/static/website/assets/images/nee.webp",
      alt: "Thaagam Foundation in Nepal",
      cta: "Join Hands for Flood Victims",
      link: "/nepal_flood"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Categories filter
  const categories = [
    { key: "all", label: "All", icon: "/static/website/assets/images/categories/home.webp" },
    { key: "packages", label: "Packages", icon: "/static/website/assets/images/categories/packages.webp" },
    { key: "food", label: "Food", icon: "/static/website/assets/images/categories/food.webp" },
    { key: "birthday", label: "Birthday", icon: "/static/website/assets/images/categories/cake.webp" },
    { key: "environment", label: "Environment", icon: "/static/website/assets/images/categories/nature.webp" },
    { key: "animals", label: "Animals", icon: "/static/website/assets/images/categories/pets.webp" },
    { key: "education", label: "Education", icon: "/static/website/assets/images/categories/education.webp" },
    { key: "orphanage", label: "Orphanage", icon: "/static/website/assets/images/categories/orphanage.webp" },
    { key: "healthcare", label: "Healthcare", icon: "/static/website/assets/images/categories/hospital.webp" },
    { key: "livelihood", label: "Livelihood", icon: "/static/website/assets/images/categories/livelihood.webp" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [causeSearch, setCauseSearch] = useState("");

  const filteredCauses = causes.filter((cause) => {
    const matchesCategory =
      activeCategory === "all" ||
      cause.category === activeCategory ||
      (activeCategory === "education" && cause.category === "education") ||
      (activeCategory === "animals" && cause.category === "animals") ||
      (activeCategory === "environment" && cause.category === "environment");

    const matchesSearch =
      cause.name.toLowerCase().includes(causeSearch.toLowerCase()) ||
      cause.shortDescription.toLowerCase().includes(causeSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Contact Form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactNote, setContactNote] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    const payload = {
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      address: contactAddress,
      note: contactNote
    };

    api.submitContactForm(payload).then(() => {
      setIsSubmittingContact(false);
      setContactStatus("Thank you! Your message has been received. Our team will contact you shortly.");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactAddress("");
      setContactNote("");
      setTimeout(() => setContactStatus(""), 5000);
    });
  };

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="home-page-container">
      {/* Donate Monthly Floating Button */}
      <div className="desk_version">
        <button
          className="donate_monthly_btn donate-monthly-trigger"
          onClick={() => openSubscriptionModal("education", 1000)}
          aria-label="Donate Monthly"
        >
          Donate Monthly <i className="ri-heart-add-fill cstm-icon-color"></i>
        </button>
      </div>

      {/* Hero Slider Section */}
      <section className="hero-section">
        <div className="container-fluid p-0">
          <div className="video_container">
            <div id="video_background" className="hero_slider position-relative overflow-hidden" style={{ minHeight: "380px" }}>
              {heroSlides.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide.src}
                  alt={slide.alt}
                  className={`hero_slide ${idx === activeSlide ? "is-active" : ""}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: idx === activeSlide ? 1 : 0,
                    transition: "opacity 0.75s ease-in-out"
                  }}
                />
              ))}

              <Link
                to={heroSlides[activeSlide].link}
                className="hero_cta_overlay"
                aria-label="Donate to Nepal flood relief"
              ></Link>

              <Link to={heroSlides[activeSlide].link} className="hero_donate_btn">
                {heroSlides[activeSlide].cta} <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </Link>

              <div className="hero_dots" id="heroDots" role="tablist">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    className={idx === activeSlide ? "is-active" : ""}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Statistics Counter Section */}
      <section className="volunteer_section_campaign py-4">
        <div className="container-fluid">
          <div className="donation_count d-flex flex-wrap justify-content-around text-center gap-3">
            <div className="icon-collection d-flex align-items-center justify-content-center flex-column gap-1">
              <img
                src="/static/website/assets/images/donations/donors.webp"
                height="60"
                width="60"
                alt="Active Donors"
                className="volunteer_img"
              />
              <h3 className="fw-bold fs-3 text-dark mt-2 mb-0">6.52 L+</h3>
              <p className="text-secondary fw-semibold mb-0">Active Donors</p>
            </div>

            <div className="icon-collection d-flex align-items-center justify-content-center flex-column gap-1">
              <img
                src="/static/website/assets/images/donations/total-donations.webp"
                height="60"
                width="60"
                alt="Donation Raised"
                className="volunteer_img"
              />
              <h3 className="fw-bold fs-3 text-dark mt-2 mb-0">₹43.46 Cr+</h3>
              <p className="text-secondary fw-semibold mb-0">Donation Raised</p>
            </div>

            <div className="icon-collection d-flex align-items-center justify-content-center flex-column gap-1">
              <img
                src="/static/website/assets/images/donations/food.webp"
                height="60"
                width="60"
                alt="Meals Served"
                className="volunteer_img"
              />
              <h3 className="fw-bold fs-3 text-dark mt-2 mb-0">115.94 L+</h3>
              <p className="text-secondary fw-semibold mb-0">Meals Served</p>
            </div>

            <div className="icon-collection d-flex align-items-center justify-content-center flex-column gap-1">
              <img
                src="/static/website/assets/images/donations/rupee.svg"
                height="60"
                width="60"
                alt="Donations Made"
                className="volunteer_img"
              />
              <h3 className="fw-bold fs-3 text-dark mt-2 mb-0">6.73 L+</h3>
              <p className="text-secondary fw-semibold mb-0">Donations Made</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Causes Section with Categories & Cards */}
      <section className="card_section pb-5 pt-3">
        <div className="container">
          <h1 className="text-center mb-4 fw-bold">Our Causes</h1>

          {/* Causes Search Input */}
          <div className="cause_search_container mb-4">
            <input
              type="text"
              className="cause_search form-control py-3 px-4 shadow-sm"
              placeholder="Search and give to what matters most to you..."
              value={causeSearch}
              onChange={(e) => setCauseSearch(e.target.value)}
              style={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
            />
          </div>

          {/* Categories Horizontal Carousel */}
          <div className="head_text mb-4">
            <div className="card_category_new desk_icon_categories d-flex gap-3 overflow-auto py-2">
              {categories.map((cat) => (
                <span
                  key={cat.key}
                  className={`category_list text-center ${activeCategory === cat.key ? "acitve_category" : ""}`}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    cursor: "pointer",
                    minWidth: "100px",
                    borderRadius: "16px",
                    padding: "10px 14px",
                    transition: "all 0.3s ease"
                  }}
                >
                  <img src={cat.icon} alt={cat.label} width="52" height="52" className="mb-2" />
                  <div className="fw-bold small">{cat.label}</div>
                </span>
              ))}
            </div>
          </div>

          {/* Packages Tab Content */}
          {activeCategory === "packages" ? (
            <div className="desk_packages_grid mt-3">
              {packages.map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`/packages_form?id=${pkg.id}`}
                  className="desk_package_card text-decoration-none"
                  aria-label={pkg.title}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    width="200"
                    height="233"
                    className="package_img"
                    style={{ width: "100%", height: "260px", objectFit: "cover" }}
                  />
                  <div className="package_info p-3">
                    <h6 className="fw-bold text-dark mb-1">{pkg.title}</h6>
                    <p className="text-primary fw-bold mb-2">{pkg.amountTitle}</p>
                    <span className="package_donate_btn btn btn-primary w-100 fw-bold py-2">
                      Donate Now
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Causes Grid */
            <div className="row row_container mt-3">
              {filteredCauses.length === 0 ? (
                <div className="col-12 text-center py-5 text-muted">
                  <i className="ri-search-eye-line fs-1 d-block mb-2 text-secondary"></i>
                  <h5>No causes found matching your filter</h5>
                  <p>Try searching with another keyword or pick 'All'.</p>
                </div>
              ) : (
                filteredCauses.map((cause) => (
                  <div key={cause.slug} className="col-6 col-md-4 col-lg-3 category_card mb-4">
                    <div className="category_content h-100 d-flex flex-column border rounded-3 overflow-hidden bg-white shadow-sm hover-shadow transition">
                      <a
                        href={`https://wa.me/?text=Support%20${encodeURIComponent(cause.name)}%20via%20Thaagam%20Foundation:%20https://thaagam.org${cause.detailUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="whatsapp_container position-absolute p-2"
                        aria-label="Send this content on WhatsApp"
                        style={{ top: "10px", right: "10px", zIndex: 3 }}
                      >
                        <i className="ri-whatsapp-fill fs-4 text-success bg-white rounded-circle p-1 shadow-sm"></i>
                      </a>

                      <Link to={cause.detailUrl} className="category_image overflow-hidden" aria-label="category image">
                        <img
                          loading="lazy"
                          src={cause.cardImage}
                          alt={cause.name}
                          width="200"
                          height="240"
                          className="w-100"
                          style={{ height: "240px", objectFit: "cover" }}
                        />
                      </Link>

                      <div className="card_content p-3 d-flex flex-column flex-grow-1 justify-content-between">
                        <div>
                          <h5 className="title mb-1 fs-6">
                            <Link to={cause.detailUrl} className="causes_name text-decoration-none text-dark fw-bold">
                              {cause.name}
                            </Link>
                          </h5>
                          <span className="text-primary fw-bold fs-6 d-block mb-3">{cause.amountTitle}</span>
                        </div>

                        <Link to={cause.detailUrl} className="donate_btn btn btn-primary w-100 fw-bold py-2 text-center" aria-label="donate button">
                          Donate Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Birthday Celebration Section */}
      <section className="birthday_section py-5" style={{ backgroundColor: "#fef8f0" }}>
        <div className="container">
          <div className="birthday_content text-center mb-5">
            <h2 className="fw-bold fs-2 text-dark">
              Birthday Coming Up?{" "}
              <img
                loading="lazy"
                className="celebrate_img"
                src="/static/website/assets/images/birthday/cap_cd.png"
                alt="Birthday cap"
                style={{ height: "38px", verticalAlign: "middle" }}
              />
            </h2>
            <p className="birthday_para text-secondary fs-5">
              Celebrate with the poor and homeless kids and share your joy!
            </p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-6 col-md-6 col-lg-3 d-flex flex-column align-items-center">
              <div className="video_wrapper shadow-sm rounded-4 overflow-hidden bg-white p-2">
                <img
                  loading="lazy"
                  className="birthday_video rounded-3"
                  src="/static/website/assets/images/birthday/photo-proof.webp"
                  alt="Photo proof"
                  width="200"
                  height="200"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="mt-3 fw-bold text-dark small">Get Photo Proof Of Your Donation</p>
            </div>

            <div className="col-6 col-md-6 col-lg-3 d-flex flex-column align-items-center">
              <div className="video_wrapper shadow-sm rounded-4 overflow-hidden bg-white p-2 position-relative">
                <img
                  src="/static/website/assets/images/videos/bday_1.webp"
                  alt="Birthday video"
                  width="200"
                  height="200"
                  className="birthday_video rounded-3"
                  style={{ objectFit: "cover" }}
                />
                <div className="position-absolute top-50 start-50 translate-middle">
                  <span className="btn btn-danger btn-sm rounded-circle p-2 shadow">
                    <i className="ri-play-fill fs-5 text-white"></i>
                  </span>
                </div>
              </div>
              <p className="mt-3 fw-bold text-dark small">Get a Video of Your Birthday Celebration</p>
            </div>

            <div className="col-6 col-md-6 col-lg-3 d-flex flex-column align-items-center">
              <div className="video_wrapper shadow-sm rounded-4 overflow-hidden bg-white p-2 position-relative">
                <img
                  src="/static/website/assets/images/videos/bday_2.webp"
                  alt="Virtual celebration"
                  width="200"
                  height="200"
                  className="birthday_video rounded-3"
                  style={{ objectFit: "cover" }}
                />
                <div className="position-absolute top-50 start-50 translate-middle">
                  <span className="btn btn-danger btn-sm rounded-circle p-2 shadow">
                    <i className="ri-play-fill fs-5 text-white"></i>
                  </span>
                </div>
              </div>
              <p className="mt-3 fw-bold text-dark small">Virtual Celebration Available</p>
            </div>

            <div className="col-6 col-md-6 col-lg-3 d-flex flex-column align-items-center">
              <div className="video_wrapper shadow-sm rounded-4 overflow-hidden bg-white p-2">
                <img
                  loading="lazy"
                  className="birthday_video rounded-3"
                  src="/static/website/images/packages/collage_wyg1.jpg"
                  alt="Food Parcel Collage"
                  width="200"
                  height="200"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="mt-3 fw-bold text-dark small">Collage Image of Food Parcel</p>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              to="/celebration"
              className="volunteer_btn all_btn btn btn-primary px-5 py-3 fw-bold fs-5 shadow-sm text-decoration-none"
              style={{ borderRadius: "10px" }}
            >
              Celebrate With Us <i className="ri-cake-2-line ms-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Commitment to Transparency Section */}
      <section className="transparency-seciton py-5">
        <div className="container">
          <h2 className="text-center commitment mb-5 fw-bold fs-2">
            Our Commitment to <span className="transparency text-primary">Transparency</span>
          </h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border">
                <img
                  loading="lazy"
                  className="trans-img mb-3"
                  src="/static/website/assets/images/birthday/badge.png"
                  alt="Donor recognition badge"
                  style={{ height: "64px" }}
                />
                <h3 className="fs-5 fw-bold text-dark mb-2">Donor Recognition</h3>
                <p className="text-secondary small m-0">
                  Every donation is acknowledged with the donor's name, creating a transparent, verifiable record of contributions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border">
                <img
                  loading="lazy"
                  className="trans-img mb-3"
                  src="/static/website/assets/images/birthday/collage.png"
                  alt="Photo documentation"
                  style={{ height: "64px" }}
                />
                <h3 className="fs-5 fw-bold text-dark mb-2">Photo Documentation</h3>
                <p className="text-secondary small m-0">
                  Every donor's contribution is backed with photo proof, showing the real, verifiable impact of their support on the ground.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border">
                <img
                  loading="lazy"
                  className="trans-img mb-3"
                  src="/static/website/assets/images/birthday/video-doc.png"
                  alt="Video documentation"
                  style={{ height: "64px" }}
                />
                <h3 className="fs-5 fw-bold text-dark mb-2">Video Documentation</h3>
                <p className="text-secondary small m-0">
                  Transparency in every donor contribution is shown through video, highlighting the real difference their support creates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banners (Education & Healthcare) */}
      <section className="banner_container py-4">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div
                className="banner p-5 rounded-4 shadow-sm text-white position-relative overflow-hidden"
                style={{
                  background: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65)), url(/static/website/assets/images/banner-edu.webp) center/cover",
                  minHeight: "260px"
                }}
              >
                <div className="education_content position-relative" style={{ zIndex: 2 }}>
                  <h4 className="text-warning fw-bold mb-1">Education Campaign</h4>
                  <h2 className="fw-bold mb-3">Empowering Children in 2025</h2>
                  <Link to="/CrowdFundEducation" className="btn btn-light fw-bold px-4 py-2 rounded-3 text-dark">
                    Explore Now <i className="ri-arrow-right-line ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div
                className="banner p-5 rounded-4 shadow-sm text-white position-relative overflow-hidden"
                style={{
                  background: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65)), url(/static/website/assets/images/banner_health.webp) center/cover",
                  minHeight: "260px"
                }}
              >
                <div className="healthcare_content position-relative" style={{ zIndex: 2 }}>
                  <h4 className="text-info fw-bold mb-1">Healthcare Lifeline</h4>
                  <h2 className="fw-bold mb-3">Save Lives Through Kindness</h2>
                  <Link to="/CrowdFundHealthcare" className="btn btn-light fw-bold px-4 py-2 rounded-3 text-dark">
                    Explore Now <i className="ri-arrow-right-line ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Volunteer Callout */}
      <section className="volunteer_section py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="row align-items-center volunteer_row g-5">
            <div className="col-12 col-lg-4 text-center">
              <img
                loading="lazy"
                src="/static/website/assets/images/volunteer.webp"
                alt="Volunteer for Thaagam Foundation"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: "380px" }}
              />
            </div>
            <div className="col-12 col-lg-8">
              <div className="volunteer_heading mb-3">
                <h2 className="fw-bold fs-2 text-dark">Become a Volunteer</h2>
              </div>
              <p className="volunteer_description text-secondary fs-6 leading-relaxed mb-4">
                Welcome to THAAGAM FOUNDATION! We invite you to engage with us and support our mission to impact our community positively.
                Your involvement helps us provide nutritious meals to the homeless, distribute essential items like eggs and milk to needy families,
                support children's education, aid young hospital patients, donate blankets during cold weather, and organize tree-planting events for a greener future.
                Together, we can create a brighter future for everyone. Get involved today and make a difference!
              </p>
              <Link to="/volunteer" className="volunteer_btn all_btn btn btn-primary px-4 py-3 fw-bold fs-6 rounded-3 text-decoration-none shadow-sm">
                Join As Volunteer <i className="ri-hand-heart-line ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch & Quick Contact Form */}
      <section className="get_in_touch py-5" style={{ backgroundColor: "#f8fbff" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="get_in_touch_heading fw-bold fs-2 text-dark mb-2">Get In Touch</h2>
            <p className="get_in_touch_description text-secondary fs-5 mb-0">Reach out to us. We are here to help you.</p>
          </div>

          <div className="row g-5 align-items-center">
            {/* Quick Contact Links */}
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                <a
                  href="https://wa.me/+919790927575"
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 border text-decoration-none text-dark shadow-sm hover-shadow"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="bg-success text-white p-2 rounded-circle d-flex">
                      <i className="ri-whatsapp-fill fs-5"></i>
                    </span>
                    <span className="fw-semibold">Chat with us on WhatsApp</span>
                  </div>
                  <i className="ri-arrow-right-s-line text-secondary fs-5"></i>
                </a>

                <a
                  href="https://ig.me/m/thaagamfoundation"
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 border text-decoration-none text-dark shadow-sm hover-shadow"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="p-2 rounded-circle d-flex" style={{ backgroundColor: "#E1306C", color: "#fff" }}>
                      <i className="ri-instagram-fill fs-5"></i>
                    </span>
                    <span className="fw-semibold">Send Us A DM On Instagram</span>
                  </div>
                  <i className="ri-arrow-right-s-line text-secondary fs-5"></i>
                </a>

                <a
                  href="tel:+918069169691"
                  className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 border text-decoration-none text-dark shadow-sm hover-shadow"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="bg-primary text-white p-2 rounded-circle d-flex">
                      <i className="ri-phone-fill fs-5"></i>
                    </span>
                    <span className="fw-semibold">Get On Call With Us (+91 80 691 69691)</span>
                  </div>
                  <i className="ri-arrow-right-s-line text-secondary fs-5"></i>
                </a>

                <a
                  href="mailto:contact@thaagam.org"
                  className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 border text-decoration-none text-dark shadow-sm hover-shadow"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="bg-info text-white p-2 rounded-circle d-flex">
                      <i className="ri-mail-fill fs-5"></i>
                    </span>
                    <div>
                      <p className="m-0 fw-semibold">Send Us An Email</p>
                      <small className="text-secondary">contact@thaagam.org</small>
                    </div>
                  </div>
                  <i className="ri-arrow-right-s-line text-secondary fs-5"></i>
                </a>

                <a
                  href="https://maps.app.goo.gl/r8k4eQWY9zNC6Fwa6"
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 border text-decoration-none text-dark shadow-sm hover-shadow"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="bg-danger text-white p-2 rounded-circle d-flex">
                      <i className="ri-road-map-fill fs-5"></i>
                    </span>
                    <div>
                      <p className="m-0 fw-semibold">Registered Office Address</p>
                      <small className="text-secondary">No.6, Dhanammal street, Spurtank road, Chetpet, Chennai 600-031</small>
                    </div>
                  </div>
                  <i className="ri-arrow-right-s-line text-secondary fs-5"></i>
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="col-12 col-lg-6">
              <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm border">
                <h4 className="title text-center fw-bold mb-4">Quick Contact Form</h4>

                {contactStatus && (
                  <div className="alert alert-success py-2 px-3 mb-3 small" role="alert">
                    <i className="ri-checkbox-circle-fill me-1"></i> {contactStatus}
                  </div>
                )}

                <form onSubmit={handleContactSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        style={{ height: "46px", borderRadius: "8px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        style={{ height: "46px", borderRadius: "8px" }}
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Phone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="10 digit Mobile"
                        maxLength="10"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, ""))}
                        required
                        style={{ height: "46px", borderRadius: "8px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">City / Address *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your City"
                        value={contactAddress}
                        onChange={(e) => setContactAddress(e.target.value)}
                        required
                        style={{ height: "46px", borderRadius: "8px" }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold">Message / Case Description *</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="How can we assist you or collaborate?"
                      value={contactNote}
                      onChange={(e) => setContactNote(e.target.value)}
                      required
                      style={{ borderRadius: "8px" }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="btn btn-primary w-100 fw-bold py-3 shadow-sm"
                    style={{ borderRadius: "8px" }}
                  >
                    {isSubmittingContact ? "Sending..." : "Submit Message Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Gallery Strip */}
      <section className="home_gallery gallery_mobile py-0">
        <div className="container-fluid p-0">
          <div className="row g-0">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="col-4 col-md-2 p-0">
                <div className="gallery_container overflow-hidden" style={{ height: "180px" }}>
                  <img
                    loading="lazy"
                    src={`/static/website/assets/images/Home_Gallery/gal_${num}.webp`}
                    alt={`Thaagam gallery moment ${num}`}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq_section py-5 position-relative overflow-hidden">
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="faq_head_wrap text-center mb-5">
            <span className="faq_badge badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill fs-6 mb-3">
              <i className="ri-questionnaire-line me-1"></i> Got Questions?
            </span>
            <h2 className="faq_heading fw-bold fs-2 text-dark">
              Frequently Asked <span className="transparency text-primary">Questions</span>
            </h2>
            <p className="faq_subheading text-secondary fs-6">
              Everything you need to know about donating to Thaagam Foundation
            </p>
            <span className="faq_head_divider d-inline-block bg-primary rounded-pill mt-3" style={{ width: "60px", height: "4px" }}></span>
          </div>

          <div className="faq_list mx-auto" style={{ maxWidth: "800px" }}>
            {faqList.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className={`faq_item bg-white border rounded-4 mb-3 overflow-hidden shadow-sm transition ${
                    isOpen ? "border-primary" : ""
                  }`}
                >
                  <div
                    className="p-4 d-flex align-items-center justify-content-between cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="fw-bold text-dark fs-6 pe-3">{faq.question}</span>
                    <span
                      className={`btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-2 transition ${
                        isOpen ? "btn-primary text-white" : "btn-light text-secondary"
                      }`}
                      style={{ width: "32px", height: "32px", transform: isOpen ? "rotate(45deg)" : "none", transition: "all 0.25s ease" }}
                    >
                      <i className="ri-add-line fs-5"></i>
                    </span>
                  </div>

                  {isOpen && (
                    <div className="faq_answer px-4 pb-4 text-secondary leading-relaxed border-top pt-3">
                      {faq.answer}
                      <div className="mt-3">
                        <Link to="/causes" className="btn btn-sm btn-outline-primary fw-bold rounded-2">
                          <i className="ri-heart-add-fill me-1"></i> View All Causes
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
