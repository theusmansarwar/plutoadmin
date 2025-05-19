import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import plutoseclogo from "./Assets/logo4.png";
import AddBlog from "./Pages/Blogs/AddBlog";
import Blogs from "./Pages/Blogs/Blogs";
import Categories from "./Pages/Categories/Categories";
import Comments from "./Pages/Comments/Comments";
import Leads from "./Pages/Leads/Leads";
import ViewLead from "./Pages/Leads/ViewLead";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Testimonial from "./Pages/Testimonials/Testimonial";
import AddTestimonial from "./Pages/Testimonials/AddTestimonial";
import Applications from "./Pages/Applications/Applications";
import ViewApplication from "./Pages/Applications/ViewApplication";
const App = ({ onLogout, message }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeitems, setActiveitems] = useState(null);

  const items = useMemo(
    () => [
      { id: 1, name: "Dashboard", route: "/dashboard" },
      { id: 2, name: "Leads", route: "/leads" },
      { id: 3, name: "Applications", route: "/applications" },
      { id: 4, name: "Blogs", route: "/blogs" },
      { id: 5, name: "Categories", route: "/categories" },
      { id: 6, name: "Comments", route: "/comments" },
      { id: 7, name: "Testimonials", route: "/testimonials" },
    ],
    []
  );

  useEffect(() => {
    const currentItem = items.find((item) => item.route === location.pathname);
    setActiveitems(currentItem?.id || null);
  }, [location, items]);

  const handleitemsClick = (item) => {
    setActiveitems(item.id);
    navigate(item.route);
  };

  return (
    <div className="App">
      <div className="app-side-bar">
        <img
          src={plutoseclogo}
          className="home-plutosec-logo"
          alt="plutosec Logo"
        />

        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={
                activeitems === item.id ? "selected-item" : "unselected"
              }
              onClick={() => handleitemsClick(item)}
            >
              {item.name}
            </li>
          ))}
          <li className="unselected" onClick={onLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="app-right">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/add-categories" element={<AddBlog />} />
          <Route path="/edit-blog/:id" element={<AddBlog />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/add-testimonial" element={<AddTestimonial />} />
          <Route path="/edit-testimonial/:id" element={<AddTestimonial />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/view-lead/:id" element={<ViewLead />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/view-application/:id" element={<ViewApplication />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
