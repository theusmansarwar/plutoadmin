import React, { useState, useEffect, useMemo } from "react";
import "./AddServices.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../Components/Alert/AlertContext";
import {
  fetchallservicescategorylist,
  fetchservicebyid,
} from "../../DAL/fetch";
import { createNewService } from "../../DAL/create";
import { useTable1 } from "../../Components/Models/useTable1";
import { useTable2 } from "../../Components/Models/useTable2";
import { updateService } from "../../DAL/edit";

const AddServices = () => {
  const path = window.location.pathname;
  const segments = path.split("/");

  const route = segments[1];
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState("");
  const [cta, setCta] = useState("");
  const [description, setDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [offeringData, setOfferingData] = useState([]);
  const [storiesData, setStoriesData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        try {
          const response = await fetchservicebyid(id);
          if (response.status === 200) {
            const service = response.service;
            setTitle(service.title || "");
            setCta(service.cta || "");
            setDescription(service.description || "");
            setMetaDescription(service.metaDescription || "");
            setSlug(service.slug || "");
            setCategoryId(service.category?._id || "");
            setOfferingData(service.offerings || []);
            setStoriesData(service.successstories);
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };
      fetchService();
    }
  }, [id]);

  useEffect(() => {
    // Fetch service categories on mount
    const fetchCategories = async () => {
      try {
        const response = await fetchallservicescategorylist();

        if (response && response.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    const errorObj = {};
    if (!categoryId) errorObj.category = "Category is required.";
    if (!title) errorObj.title = "Title is required.";
    if (!cta) errorObj.cta = "Cta is required.";
    if (!description) errorObj.description = "Description is required.";
    if (!metaDescription)
      errorObj.metaDescription = "Meta Description is required.";
    if (!slug) errorObj.slug = "Slug is required.";

    if (Object.keys(errorObj).length > 0) {
      setErrors(errorObj);
      return;
    }

    setLoading(true);

    try {
      const newServiceData = {
        title,
        cta,
        description,
        metaDescription,
        slug,
        category: categoryId,
        published: isVisible,
      };
      console.log(newServiceData);
      const response = id
        ? await updateService(id, newServiceData)
        : await createNewService(newServiceData);

      if (response.status === 200 || response.status === 201) {
        showAlert("success", response.message);
        navigate("/services");
      } else if (response.missingFields) {
        const newErrors = {};
        response.missingFields.forEach((field) => {
          newErrors[field.name] = field.message;
        });
        setErrors(newErrors);
      } else {
        showAlert("error", response.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const attributes1 = [
    { id: "name", label: "Offering Title" },
    { id: "published", label: "Visibility" },
  ];

  const { tableUI1 } = useTable1({
    attributes1,
    tableType: "Offerings",
    data: offeringData,
  });
  const attributes2 = [
    { id: "name", label: "Success Story Title" },
    { id: "published", label: "Visibility" },
  ];

  const { tableUI2 } = useTable2({
    attributes2,
    tableType: "Success Stories",
    data: storiesData,
  });

  return (
    <div className="AddPost">
      <form onSubmit={handleSubmit}>
        <h3>{id ? "Edit Service" : "Add Service"}</h3>
        <div className="upper-section">
          <div className="left">
            <label htmlFor="title">Title</label>
            {errors.title && <p className="error">{errors.title}</p>}
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="metadescription">Meta Description</label>
            {errors.metaDescription && (
              <p className="error">{errors.metaDescription}</p>
            )}
            <textarea
              id="metadescription"
              placeholder="Meta Description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="cta">CTA</label>
            {errors.cta && <p className="error">{errors.cta}</p>}
            <input
              id="cta"
              type="text"
              placeholder="CTA"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
            />

            <label htmlFor="slug">Slug</label>
            {errors.slug && <p className="error">{errors.slug}</p>}
            <input
              id="slug"
              type="text"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="category">Service Category</label>
        {errors.category && <p className="error">{errors.category}</p>}
        <select
          value={categoryId}
          id="category"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {route === "edit-service" && (
          <>
            {tableUI1}
            {tableUI2}
          </>
        )}
        <div className="toggle-container">
          <span className="toggle-label">
            Service Visibility:{" "}
            <span className={isVisible ? "Public" : "Draft"}>
              {isVisible ? "Public" : "Draft"}
            </span>
          </span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="button-sections">
          <button
            type="button"
            className="cancelbtn"
            onClick={() => navigate("/services")}
          >
            Cancel
          </button>
          <button className="published" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
