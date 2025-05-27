import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import plutoseclogo from "./Assets/logo4.png";

// Pages
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
import UserType from "./Pages/Users/UserType";
import Users from "./Pages/Users/Users";

const App = ({ onLogout, message, userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeitems, setActiveitems] = useState(null);

  const allItems = [
    { id: 1, name: "Dashboard", route: "/dashboard" },
    { id: 2, name: "Leads", route: "/leads" },
    { id: 3, name: "Applications", route: "/applications" },
    { id: 4, name: "Blogs", route: "/blogs" },
    { id: 5, name: "Categories", route: "/categories" },
    { id: 6, name: "Comments", route: "/comments" },
    { id: 7, name: "Testimonials", route: "/testimonials" },
    { id: 8, name: "Users", route: "/users" },
    { id: 9, name: "UsersType", route: "/usertype" },
  ];

  const allowedRoutesForWriter = ["/blogs", "/categories", "/add-blog"];
  const isWriterRouteAllowed = () => {
    const pathname = location.pathname;
    return (
      allowedRoutesForWriter.includes(pathname) ||
      pathname.startsWith("/edit-blog/")
    );
  };

  const filteredItems =
    userType === "Writter"
      ? allItems.filter((item) =>
          allowedRoutesForWriter.includes(item.route)
        )
      : allItems;

  useEffect(() => {
    const currentItem = filteredItems.find(
      (item) => item.route === location.pathname
    );
    setActiveitems(currentItem?.id || null);
  }, [location.pathname, filteredItems]);

  useEffect(() => {
    if (userType === "Writter" && !isWriterRouteAllowed()) {
      navigate("/blogs");
    }
  }, [location.pathname, userType, navigate]);

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
          {filteredItems.map((item) => (
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
          {/* Writer & Admin routes */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/edit-blog/:id" element={<AddBlog />} />

          {/* Admin-only routes */}
          {userType !== "Writter" && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/view-lead/:id" element={<ViewLead />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/view-application/:id" element={<ViewApplication />} />
              <Route path="/testimonials" element={<Testimonial />} />
              <Route path="/add-testimonial" element={<AddTestimonial />} />
              <Route path="/edit-testimonial/:id" element={<AddTestimonial />} />
              <Route path="/usertype" element={<UserType />} />
              <Route path="/users" element={<Users />} />
            </>
          )}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/blogs" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
