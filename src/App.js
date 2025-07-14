import React, { useState, useEffect, useMemo } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
import Tickets from "./Pages/Tickets/Tickets";
import ServicesCategories from "./Pages/ServicesCategory/ServicesCategory";
import Services from "./Pages/Services/Services";
import AddServices from "./Pages/Services/AddServices";
import FeaturedBlogs from "./Pages/FeaturedBlogs/FeaturedBlogs";
const App = ({ onLogout, message, userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeitems, setActiveitems] = useState(null);

  const allItems = [
    { id: 1, name: "Dashboard", route: "/dashboard" },
    { id: 2, name: "Leads", route: "/leads" },
    { id: 3, name: "Applications", route: "/applications" },
    { id: 4, name: "Blogs", route: "/blogs" },
    { id: 5, name: "Featured Blogs", route: "/blogs/featured" },
    { id: 6, name: "Categories", route: "/categories" },
   
    { id: 7, name: "Comments", route: "/comments" },
    { id: 8, name: "Testimonials", route: "/testimonials" },
    { id: 9, name: "Users", route: "/users" },
    { id: 10, name: "UsersType", route: "/usertype" },
    { id: 11, name: "Tickets", route: "/tickets" },
     { id: 12, name: "Services Categories", route: "/services-categories" }, ///////////////////////////
    { id: 13, name: "Services", route: "/services" }, ///////////////////////////
  ];

  const allowedRoutesForWriter = ["/blogs", "/categories", "/add-blog","/blogs/featured",];
  const isWriterRouteAllowed = () => {
    const pathname = location.pathname;
    return (
      allowedRoutesForWriter.includes(pathname) ||
      pathname.startsWith("/edit-blog/") || pathname.startsWith("/edit-featuredblog/")

    );
  };

  const filteredItems =
    userType === "Writer"
      ? allItems.filter((item) => allowedRoutesForWriter.includes(item.route))
      : allItems;

  useEffect(() => {
    const currentItem = filteredItems.find(
      (item) => item.route === location.pathname
    );
    setActiveitems(currentItem?.id || null);
  }, [location.pathname, filteredItems]);

  useEffect(() => {
    if (userType === "Writer" && !isWriterRouteAllowed()) {
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
          <Route path="/edit-featuredblog/:id" element={<AddBlog />} />
          <Route path="/blogs/featured" element={<FeaturedBlogs />} />

          {/* Admin-only routes */}
          {userType !== "Writer" && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/view-lead/:id" element={<ViewLead />} />
              <Route path="/applications" element={<Applications />} />
              <Route
                path="/view-application/:id"
                element={<ViewApplication />}
              />
              <Route path="/testimonials" element={<Testimonial />} />
              <Route path="/add-testimonial" element={<AddTestimonial />} />
              <Route
                path="/edit-testimonial/:id"
                element={<AddTestimonial />}
              />
              <Route path="/usertype" element={<UserType />} />
              <Route path="/users" element={<Users />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route
                path="/services-categories"
                element={<ServicesCategories />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/add-service" element={<AddServices />} />
              <Route path="/edit-service/:id" element={<AddServices />} />
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
