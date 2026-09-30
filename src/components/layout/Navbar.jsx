import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDonation } from "../../context/DonationContext";
import { causes } from "../../data/causesData";

export default function Navbar() {
  const {
    openSubscriptionModal,
    isSearchOpen,
    setIsSearchOpen,
    isRecentlyViewedOpen,
    setIsRecentlyViewedOpen,
    recentlyViewed
  } = useDonation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [causesMenuOpen, setCausesMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/causes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredSearchResults = searchQuery.trim()
    ? causes.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header>
        <div className="desk_version">
          <nav className="navbar_cstm">
            <div className="first_nav">
              <div className="logo_cstm">
                <Link to="/" aria-label="logo">
                  <img
                    src="/cdn-cgi/image/w=300,fit=scale-down,f=auto,q=70/static/website/assets/images/logo/logo.webp"
                    alt="Thaagam_logo"
                  />
                </Link>
              </div>

              <div className={`mobile_nav ${mobileMenuOpen ? "active" : ""}`}>
                <div className="dark_logo d-md-none p-3 d-flex justify-content-between align-items-center">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <img
                      src="/cdn-cgi/image/w=300,fit=scale-down,f=auto,q=70/static/website/assets/images/logo/logo.webp"
                      alt="logo"
                      style={{ maxHeight: "40px" }}
                    />
                  </Link>
                  <button
                    className="btn btn-sm btn-light border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="ri-close-line fs-4"></i>
                  </button>
                </div>

                <ul className="nav_links">
                  <li className="nav_li">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li className="nav_li">
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                      About Us
                    </Link>
                  </li>
                  <li
                    className="causes_list nav_li"
                    onMouseEnter={() => setCausesMenuOpen(true)}
                    onMouseLeave={() => setCausesMenuOpen(false)}
                  >
                    <p className="causes_list_special m-0">
                      <Link to="/causes" onClick={() => setMobileMenuOpen(false)}>
                        Causes
                      </Link>{" "}
                      <span className="causes_arrow">&gt;</span>
                    </p>

                    <div className={`mega_menu ${causesMenuOpen ? "d-block" : ""}`}>
                      <ul className="mega_menu_links">
                        {/* Food */}
                        <li>
                          <Link to="/food" className="menu-title" onClick={() => setMobileMenuOpen(false)}>
                            Food
                          </Link>
                          <ul>
                            <li>
                              <Link className="special_links" to="/causes-detail/water_bottle/" onClick={() => setMobileMenuOpen(false)}>
                                Fight Thirst. Share Water
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/homeless/" onClick={() => setMobileMenuOpen(false)}>
                                Feed a Homeless Person
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/chicken_briyani/" onClick={() => setMobileMenuOpen(false)}>
                                Chicken Biryani
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/stray_dog/" onClick={() => setMobileMenuOpen(false)}>
                                Feed a Stray Dog
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/egg_briyani/" onClick={() => setMobileMenuOpen(false)}>
                                Egg Biryani
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/veg_briyani/" onClick={() => setMobileMenuOpen(false)}>
                                Veg Biryani
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/thaali/" onClick={() => setMobileMenuOpen(false)}>
                                Thaali Meals
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/cow_feeding/" onClick={() => setMobileMenuOpen(false)}>
                                Cow Feeding
                              </Link>
                            </li>
                          </ul>
                        </li>

                        {/* Child */}
                        <li>
                          <Link to="/causes" className="menu-title" onClick={() => setMobileMenuOpen(false)}>
                            Child
                          </Link>
                          <ul>
                            <li>
                              <Link className="special_links" to="/egg_milk/" onClick={() => setMobileMenuOpen(false)}>
                                Egg &amp; Milk
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/hygiene_kit/" onClick={() => setMobileMenuOpen(false)}>
                                Hygiene Kit
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/childcare_kit/" onClick={() => setMobileMenuOpen(false)}>
                                Child Care Kit
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/child_gift/" onClick={() => setMobileMenuOpen(false)}>
                                Gift for Children
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/slipper/" onClick={() => setMobileMenuOpen(false)}>
                                A Pair of Slippers
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/mother_kit/" onClick={() => setMobileMenuOpen(false)}>
                                Mother Care Kit
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/bicycle/" onClick={() => setMobileMenuOpen(false)}>
                                Bicycle
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/banana_milk/" onClick={() => setMobileMenuOpen(false)}>
                                Banana &amp; Milk
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/mosquito_net/" onClick={() => setMobileMenuOpen(false)}>
                                Mosquito Net
                              </Link>
                            </li>
                          </ul>
                        </li>

                        {/* Education */}
                        <li>
                          <Link to="/CrowdFundEducation" className="menu-title" onClick={() => setMobileMenuOpen(false)}>
                            Education
                          </Link>
                          <ul>
                            <li>
                              <Link className="special_links" to="/causes-detail/school_bag/" onClick={() => setMobileMenuOpen(false)}>
                                School Bag
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/child_education/" onClick={() => setMobileMenuOpen(false)}>
                                Educate a Child
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/CrowdFundEducation" onClick={() => setMobileMenuOpen(false)}>
                                Stop Child Labour
                              </Link>
                            </li>
                          </ul>
                        </li>

                        {/* Special Events */}
                        <li>
                          <Link to="/celebration" className="menu-title" onClick={() => setMobileMenuOpen(false)}>
                            Special Events
                          </Link>
                          <ul>
                            <li>
                              <Link className="special_links" to="/causes-detail/birthday_cake/" onClick={() => setMobileMenuOpen(false)}>
                                Birthday Cake
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/virtual_birthday_cake/" onClick={() => setMobileMenuOpen(false)}>
                                Virtual Cake Cutting Celebration
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/water_bowl/" onClick={() => setMobileMenuOpen(false)}>
                                Water Bowl For Birds
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/bird_house/" onClick={() => setMobileMenuOpen(false)}>
                                Bird House
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/transgender_kit/" onClick={() => setMobileMenuOpen(false)}>
                                Transgender Kit
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/celebration" onClick={() => setMobileMenuOpen(false)}>
                                Birthday Celebration
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/CrowdFundHealthcare" onClick={() => setMobileMenuOpen(false)}>
                                Save Lives Through Kindness
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/livelihood" onClick={() => setMobileMenuOpen(false)}>
                                Empower Dreams Through Livelihood
                              </Link>
                            </li>
                          </ul>
                        </li>

                        {/* Others */}
                        <li>
                          <Link to="/causes" className="menu-title" onClick={() => setMobileMenuOpen(false)}>
                            Others
                          </Link>
                          <ul>
                            <li>
                              <Link className="special_links" to="/nepal_flood" onClick={() => setMobileMenuOpen(false)}>
                                Nepal Kit
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/bihar_kit/" onClick={() => setMobileMenuOpen(false)}>
                                Bihar Kit
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/Induction_Stove/" onClick={() => setMobileMenuOpen(false)}>
                                Nepal Flood Relief Induction Stove
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/nepal_house/" onClick={() => setMobileMenuOpen(false)}>
                                Nepal Flood Relief House
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/grocery_kit/" onClick={() => setMobileMenuOpen(false)}>
                                Grocery Kit
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/blanket/" onClick={() => setMobileMenuOpen(false)}>
                                Blanket
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/environment" onClick={() => setMobileMenuOpen(false)}>
                                Plant a Tree
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/wheel_chair/" onClick={() => setMobileMenuOpen(false)}>
                                Wheelchair
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/napkin/" onClick={() => setMobileMenuOpen(false)}>
                                Give a Napkin
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/tailoring_machine/" onClick={() => setMobileMenuOpen(false)}>
                                Tailoring Machine
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/hearing_aid/" onClick={() => setMobileMenuOpen(false)}>
                                Hearing Aid
                              </Link>
                            </li>
                            <li>
                              <Link className="special_links" to="/causes-detail/dog_collar/" onClick={() => setMobileMenuOpen(false)}>
                                Dog Collar
                              </Link>
                            </li>
                          </ul>
                        </li>

                        {/* Support An Orphanage */}
                        <li>
                          <Link to="/orphanage" className="menu-title" onClick={() => setMobileMenuOpen(false)}>
                            Support An Orphanage
                          </Link>
                          <ul>
                            <li>
                              <Link className="special_links" to="/orphanage" onClick={() => setMobileMenuOpen(false)}>
                                Our Orphanage
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav_li">
                    <Link to="/new-blog" onClick={() => setMobileMenuOpen(false)}>
                      Blog
                    </Link>
                  </li>
                  <li className="nav_li">
                    <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>
                      CSR
                    </Link>
                  </li>
                  <li className="nav_li">
                    <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>
                      Gallery
                    </Link>
                  </li>
                  <li className="nav_li">
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </li>
                </ul>

                <ul className="social_icons">
                  <li>
                    <a href="https://www.facebook.com/people/Thaagam-Foundation-NGO/100077294806563/" target="_blank" rel="noreferrer" aria-label="facebook">
                      <i className="ri-facebook-circle-fill"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/thaagamngo" target="_blank" rel="noreferrer" aria-label="twitter">
                      <i className="ri-twitter-x-fill"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/thaagamfoundation/" target="_blank" rel="noreferrer" aria-label="linkedin">
                      <i className="ri-linkedin-box-fill"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/thaagamfoundation/" target="_blank" rel="noreferrer" aria-label="instagram">
                      <i className="ri-instagram-fill"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@thaagamfoundation9777" target="_blank" rel="noreferrer" aria-label="youtube">
                      <i className="ri-youtube-fill"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="track_menu">
              <div>
                <button
                  className="donate_monthly_btn_2 donate-monthly-trigger"
                  aria-label="Donate monthly"
                  onClick={() => openSubscriptionModal("education", 1000)}
                >
                  <span className="text-monthly">Donate Monthly</span>{" "}
                  <i className="ri-heart-add-fill cstm-icon-color"></i>
                </button>
              </div>

              <div className="recent_nav">
                <div className="recent_nav_icons d-flex align-items-center gap-2">
                  <div
                    className="search_icon cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsSearchOpen(true)}
                    title="Search causes"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                    </svg>
                  </div>
                  <div
                    className="heart_icon cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsRecentlyViewedOpen(true)}
                    title="Recently viewed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <Link to="/profile" className="desk-login-btn" aria-label="Login">
                <i className="ri-login-box-line"></i> <span>Login</span>
              </Link>

              <div
                className="menubar cursor-pointer d-lg-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ cursor: "pointer" }}
              >
                <span className="top_menu_line menu_line"></span>
                <span className="middle_menu_line menu_line"></span>
                <span className="bottom_menu_line menu_line"></span>
              </div>
            </div>

            {/* Search overlay */}
            <div className={`search ${isSearchOpen ? "active d-block" : "d-none"}`}>
              <div className="search_close_container">
                <button className="search_close" onClick={() => setIsSearchOpen(false)}>
                  ✕
                </button>
              </div>
              <div className="container py-4">
                <form onSubmit={handleSearchSubmit} className="search_container mb-4">
                  <div className="search_content d-flex align-items-center">
                    <input
                      className="search_input form-control py-3 px-4 fs-5"
                      type="text"
                      placeholder="Search Causes (e.g. food, education, cake, blanket)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus={isSearchOpen}
                    />
                    <button className="search_btn btn btn-primary px-4 py-3" type="submit" aria-label="search button">
                      <i className="ri-search-line fs-5"></i>
                    </button>
                  </div>
                </form>

                {filteredSearchResults.length > 0 && (
                  <div className="search-results-list bg-white rounded-3 p-3 shadow-sm mb-4">
                    <h6 className="fw-bold mb-3 text-secondary">Matching Causes:</h6>
                    <div className="row g-3">
                      {filteredSearchResults.slice(0, 6).map((item) => (
                        <div key={item.slug} className="col-12 col-md-4">
                          <Link
                            to={item.detailUrl}
                            onClick={() => setIsSearchOpen(false)}
                            className="d-flex align-items-center gap-3 p-2 border rounded-2 text-decoration-none text-dark hover-shadow"
                          >
                            <img
                              src={item.cardImage}
                              alt={item.name}
                              style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                            />
                            <div>
                              <p className="m-0 fw-bold small">{item.name}</p>
                              <span className="text-primary fw-semibold small">{item.amountTitle}</span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="recent_tag d-flex flex-wrap gap-2 list-unstyled align-items-center mb-0">
                  <li className="fw-bold text-secondary me-2">Quick Search:</li>
                  <li>
                    <Link to="/causes-detail/water_bottle/" onClick={() => setIsSearchOpen(false)}>
                      Fight Thirst. Share Water
                    </Link>
                  </li>
                  <li>
                    <Link to="/homeless/" onClick={() => setIsSearchOpen(false)}>
                      Feed a Homeless Person
                    </Link>
                  </li>
                  <li>
                    <Link to="/causes-detail/chicken_briyani/" onClick={() => setIsSearchOpen(false)}>
                      Chicken Biryani
                    </Link>
                  </li>
                  <li>
                    <Link to="/egg_milk/" onClick={() => setIsSearchOpen(false)}>
                      Egg &amp; Milk
                    </Link>
                  </li>
                  <li>
                    <Link to="/causes-detail/child_education/" onClick={() => setIsSearchOpen(false)}>
                      Educate a Child
                    </Link>
                  </li>
                  <li>
                    <Link to="/celebration" onClick={() => setIsSearchOpen(false)}>
                      Birthday Cake
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recently Viewed Drawer */}
            <div className={`recently_view ${isRecentlyViewedOpen ? "active d-block" : "d-none"}`}>
              <div className="recently_view_container shadow-lg">
                <button className="recently_close border-0 bg-transparent" onClick={() => setIsRecentlyViewedOpen(false)}>
                  <i className="ri-close-line fs-3"></i>
                </button>
                <div className="recently_view_content p-4">
                  <h6 className="recently_view_heading fw-bold fs-5 mb-4 text-dark">Recently Viewed</h6>
                  <div className="recently_content d-flex flex-column gap-3">
                    {recentlyViewed.length === 0 ? (
                      <div className="no-causes text-muted text-center py-5">
                        <i className="ri-heart-line fs-1 d-block mb-2 text-secondary"></i>
                        <p>No recently viewed content available.</p>
                      </div>
                    ) : (
                      recentlyViewed.map((item, idx) => (
                        <div key={idx} className="recently_content_container d-flex align-items-center gap-3 p-2 border rounded-3 bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }}
                          />
                          <div className="recent_detail">
                            <h6 className="title m-0">
                              <Link
                                to={item.url}
                                onClick={() => setIsRecentlyViewedOpen(false)}
                                className="text-decoration-none fw-bold text-dark small"
                              >
                                {item.name}
                              </Link>
                            </h6>
                            <span className="text-primary fw-bold small">{item.price}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
