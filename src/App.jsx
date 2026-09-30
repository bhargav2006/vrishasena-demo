import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DonationProvider } from './context/DonationContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Causes from './pages/Causes';
import CauseDetail from './pages/CauseDetail';
import Celebration from './pages/Celebration';
import PackagesForm from './pages/PackagesForm';
import About from './pages/About';
import OurMission from './pages/OurMission';
import OurTeam from './pages/OurTeam';
import CrowdFundEducation from './pages/CrowdFundEducation';
import CrowdFundHealthcare from './pages/CrowdFundHealthcare';
import Orphanage from './pages/Orphanage';
import Livelihood from './pages/Livelihood';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import NewBlog from './pages/NewBlog';
import Contact from './pages/Contact';
import Volunteer from './pages/Volunteer';
import Profile from './pages/Profile';
import Policies from './pages/Policies';
import CategoryView from './pages/CategoryView';
import NotFound from './pages/NotFound';

// Helper to scroll to top whenever route changes
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <DonationProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Home and aliases */}
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/packages_form.html" element={<Home />} />

            {/* Causes Catalog & Dynamic Details */}
            <Route path="/causes" element={<Causes />} />
            <Route path="/causes/" element={<Causes />} />
            <Route path="/causes/index.html" element={<Causes />} />
            <Route path="/causes-detail/:slug" element={<CauseDetail />} />
            <Route path="/causes-detail/:slug/" element={<CauseDetail />} />
            <Route path="/causes-detail/:slug/index.html" element={<CauseDetail />} />

            {/* Celebration & Packages */}
            <Route path="/celebration" element={<Celebration />} />
            <Route path="/celebration/" element={<Celebration />} />
            <Route path="/celebration/index.html" element={<Celebration />} />
            <Route path="/packages_form" element={<PackagesForm />} />
            <Route path="/packages_form/" element={<PackagesForm />} />

            {/* Dedicated Categories */}
            <Route path="/food" element={<CategoryView categoryKey="food" />} />
            <Route path="/food/" element={<CategoryView categoryKey="food" />} />
            <Route path="/food/index.html" element={<CategoryView categoryKey="food" />} />

            <Route path="/animal" element={<CategoryView categoryKey="animal" />} />
            <Route path="/animal/" element={<CategoryView categoryKey="animal" />} />
            <Route path="/animal/index.html" element={<CategoryView categoryKey="animal" />} />

            <Route path="/environment" element={<CategoryView categoryKey="environment" />} />
            <Route path="/environment/" element={<CategoryView categoryKey="environment" />} />
            <Route path="/environment/index.html" element={<CategoryView categoryKey="environment" />} />

            <Route path="/homeless" element={<CategoryView categoryKey="homeless" />} />
            <Route path="/homeless/" element={<CategoryView categoryKey="homeless" />} />
            <Route path="/homeless/index.html" element={<CategoryView categoryKey="homeless" />} />

            <Route path="/egg_milk" element={<CategoryView categoryKey="egg_milk" />} />
            <Route path="/egg_milk/" element={<CategoryView categoryKey="egg_milk" />} />
            <Route path="/egg_milk/index.html" element={<CategoryView categoryKey="egg_milk" />} />

            <Route path="/nepal_flood" element={<CategoryView categoryKey="nepal_flood" />} />
            <Route path="/nepal_flood/" element={<CategoryView categoryKey="nepal_flood" />} />
            <Route path="/nepal_flood/index.html" element={<CategoryView categoryKey="nepal_flood" />} />

            {/* About Us & Team */}
            <Route path="/about" element={<About />} />
            <Route path="/about/" element={<About />} />
            <Route path="/about/index.html" element={<About />} />

            <Route path="/our_mission" element={<OurMission />} />
            <Route path="/our_mission/" element={<OurMission />} />
            <Route path="/our_mission/index.html" element={<OurMission />} />

            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/our-team/" element={<OurTeam />} />
            <Route path="/our-team/index.html" element={<OurTeam />} />

            {/* Crowdfunding */}
            <Route path="/CrowdFundEducation" element={<CrowdFundEducation />} />
            <Route path="/CrowdFundEducation/" element={<CrowdFundEducation />} />
            <Route path="/CrowdFundEducation/index.html" element={<CrowdFundEducation />} />

            <Route path="/CrowdFundHealthcare" element={<CrowdFundHealthcare />} />
            <Route path="/CrowdFundHealthcare/" element={<CrowdFundHealthcare />} />
            <Route path="/CrowdFundHealthcare/index.html" element={<CrowdFundHealthcare />} />

            {/* Orphanage Sanctuary */}
            <Route path="/orphanage" element={<Orphanage />} />
            <Route path="/orphanage/" element={<Orphanage />} />
            <Route path="/orphanage/index.html" element={<Orphanage />} />

            {/* Livelihood */}
            <Route path="/livelihood" element={<Livelihood />} />
            <Route path="/livelihood/" element={<Livelihood />} />
            <Route path="/livelihood/index.html" element={<Livelihood />} />
            <Route path="/livelihood/campaign/:id" element={<Livelihood />} />
            <Route path="/livelihood/campaign/:id/" element={<Livelihood />} />
            <Route path="/livelihood/campaign/:id/index.html" element={<Livelihood />} />

            {/* Gallery */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/" element={<Gallery />} />
            <Route path="/gallery/index.html" element={<Gallery />} />

            {/* Blogs */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/" element={<Blog />} />
            <Route path="/blog/index.html" element={<Blog />} />

            <Route path="/new-blog" element={<NewBlog />} />
            <Route path="/new-blog/" element={<NewBlog />} />
            <Route path="/new-blog/index.html" element={<NewBlog />} />

            {/* Contact & Volunteer */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="/contact/index.html" element={<Contact />} />

            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/volunteer/" element={<Volunteer />} />
            <Route path="/volunteer/index.html" element={<Volunteer />} />
            <Route path="/volunteer/volunteer_logout/index.html" element={<Volunteer />} />
            <Route path="/volunteer/volunteer_login/index.html" element={<Volunteer />} />

            {/* Profile & Donor Tracker */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/profile/index.html" element={<Profile />} />
            <Route path="/donor" element={<Profile />} />
            <Route path="/donor/" element={<Profile />} />
            <Route path="/donor/index.html" element={<Profile />} />

            {/* Policies & Support */}
            <Route path="/privacy_policy" element={<Policies defaultTab="privacy" />} />
            <Route path="/privacy_policy/" element={<Policies defaultTab="privacy" />} />
            <Route path="/privacy_policy/index.html" element={<Policies defaultTab="privacy" />} />

            <Route path="/Refund_Policy" element={<Policies defaultTab="refund" />} />
            <Route path="/Refund_Policy/" element={<Policies defaultTab="refund" />} />
            <Route path="/Refund_Policy/index.html" element={<Policies defaultTab="refund" />} />

            <Route path="/terms_conditions" element={<Policies defaultTab="terms" />} />
            <Route path="/terms_conditions/" element={<Policies defaultTab="terms" />} />
            <Route path="/terms_conditions/index.html" element={<Policies defaultTab="terms" />} />

            <Route path="/Report_bugs" element={<Policies defaultTab="bugs" />} />
            <Route path="/Report_bugs/" element={<Policies defaultTab="bugs" />} />
            <Route path="/Report_bugs/index.html" element={<Policies defaultTab="bugs" />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </DonationProvider>
  );
}
