import React from "react";
import { Link } from "react-router-dom";

export default function NewBlog() {
  const blogs = [
    {
      id: 1,
      title: "How 1 Bottle of Clean Water Transforms a Scorching Afternoon in Chennai",
      date: "March 15, 2025",
      author: "Thaagam Editorial",
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/WATTER_BOTTLE.webp",
      content: "During heatwaves reaching 42°C, auto-drivers, pavement cleaners, and elders face severe dehydration. Here is how our water distribution points save lives daily."
    },
    {
      id: 2,
      title: "Why Celebrating Your Birthday With Orphanage Children Brings Pure Joy",
      date: "February 28, 2025",
      author: "Field Coordination Team",
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/cakecuttingcardimg.jpeg",
      content: "For kids in shelter homes, a birthday celebration is not just about cake—it's an emotional reminder that they are loved, valued, and remembered."
    },
    {
      id: 3,
      title: "The Ripple Effect of Bicycles in Rural Tamil Nadu Girl Education",
      date: "January 20, 2025",
      author: "Education Wing",
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/cycle.jpeg",
      content: "When girls receive a sturdy bicycle, high-school attendance jumps by 32%. Discover how two wheels can break the cycle of early marriage and poverty."
    },
    {
      id: 4,
      title: "Behind the Scenes at Our Midnight Homeless Feeding Drives",
      date: "December 12, 2024",
      author: "Kitchen Logistics Lead",
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/homeless5.webp",
      content: "From peeling 300kg of vegetables at 4 AM to packaging warm meals packed with sambar and rice, follow our kitchen team through their selfless midnight routine."
    }
  ];

  return (
    <div className="new-blog-page py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">
              Blog &amp; Stories
            </li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <h1 className="fw-bold fs-1 text-dark mb-2">Stories of Hope &amp; Compassion</h1>
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "680px" }}>
            Real accounts, field updates, and heartfelt stories from the ground where your donations bring smiles every single day.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {blogs.map((b) => (
            <div key={b.id} className="col-12 col-md-6">
              <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm bg-white hover-shadow transition">
                <img
                  src={b.image}
                  alt={b.title}
                  className="card-img-top"
                  style={{ height: "240px", objectFit: "cover" }}
                />
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between small text-muted mb-2">
                      <span>{b.date}</span>
                      <span>By {b.author}</span>
                    </div>
                    <h4 className="card-title fw-bold text-dark fs-5 mb-2">{b.title}</h4>
                    <p className="card-text text-secondary leading-relaxed small">{b.content}</p>
                  </div>
                  <Link to="/causes" className="btn btn-link text-primary fw-bold p-0 text-decoration-none mt-3">
                    Support this work &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
