import React, { useState, useEffect, useRef, useMemo } from "react";
import "./AddBlog.css";
import { IoMdCloseCircle } from "react-icons/io";
import JoditEditor from "jodit-react";
import dummyimg from "../../Assets/upload-background.PNG";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../Components/Alert/AlertContext";
import { fetchBlogById, fetchcategorylist } from "../../DAL/fetch";
import { updateBlog } from "../../DAL/edit";
import { createBlog } from "../../DAL/create";
import { baseUrl } from "../../Config/Config";

const AddBlog = () => {
  const { id } = useParams();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [faqSchema, setFaqSchema] = useState({});
  const [faqSchemaText, setFaqSchemaText] = useState("{}");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(dummyimg);
  const [isVisible, setIsVisible] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      uploader: { insertImageAsBase64URI: true },
      placeholder: "Start typing...",
      imageExtensions: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"],
    }),
    []
  );

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetchBlogById(id);
          if (response.status === 200) {
            const blog = response.blog;
            setTitle(blog.title || "");
            setDescription(blog.description || "");
            setDetail(blog.detail || "");
            setAuthor(blog.author || "");
            setTags(blog.tags || "");
            setMetaDescription(blog.metaDescription || "");
            setSlug(blog.slug || "");
            setCategoryId(blog.category?._id || "");
            setImage(blog.thumbnail ? baseUrl + blog.thumbnail : dummyimg);
            const schema = blog.faqSchema ? JSON.parse(blog.faqSchema) : {};
            setFaqSchema(schema);
            setFaqSchemaText(JSON.stringify(schema, null, 2));
            setIsVisible(blog?.published);
            if (blog?.publishedDate) {
              const dateObj = new Date(blog.publishedDate);
              setSelectedDateTime(dateObj.toISOString().slice(0, 16));
            }
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchcategorylist();
        if (response && response.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorObj = {};
    if (!categoryId) errorObj.category = "Category is required.";
    if (!selectedDateTime) errorObj.date = "Published Date is required.";

    try {
      JSON.parse(faqSchemaText);
    } catch {
      errorObj.faqSchema = "Schema JSON is invalid.";
    }

    if (Object.keys(errorObj).length > 0) {
      setErrors(errorObj);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("detail", detail);
    formData.append("author", author);
    formData.append("tags", tags);
    formData.append("metaDescription", metaDescription);
    formData.append("slug", slug);
    formData.append("category", categoryId);
    formData.append("published", isVisible);
    formData.append("publishedDate", new Date(selectedDateTime).toISOString());
    formData.append("faqSchema", faqSchemaText);

    if (fileInputRef.current?.files[0]) {
      formData.append("thumbnail", fileInputRef.current.files[0]);
    }

    try {
      const response = id
        ? await updateBlog(id, formData)
        : await createBlog(formData);

      if (response.status === 200 || response.status === 201) {
        showAlert("success", response.message);
        navigate("/blogs");
      } else if (response.status === 400) {
        localStorage.removeItem("Token");
        navigate("");
      } else if (response.missingFields) {
        const newErrors = {};
        response.missingFields.forEach((field) => {
          newErrors[field.name] = field.message;
        });
        setErrors(newErrors);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AddPost">
      <form onSubmit={handleSubmit}>
        <h3>{id ? "Edit Blog" : "Add Blog"}</h3>
        <div className="upper-section">
          <div className="left">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>}

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="error">{errors.description}</p>}

            <textarea
              placeholder="Meta Description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
            {errors.metaDescription && <p className="error">{errors.metaDescription}</p>}

            <textarea
              placeholder="Schema (JSON)"
              value={faqSchemaText}
              onChange={(e) => {
                setFaqSchemaText(e.target.value);
                try {
                  const parsed = JSON.parse(e.target.value);
                  setFaqSchema(parsed);
                  setErrors((prev) => ({ ...prev, faqSchema: null }));
                } catch {
                  setErrors((prev) => ({
                    ...prev,
                    faqSchema: "Invalid JSON format",
                  }));
                }
              }}
            />
            {errors.faqSchema && <p className="error">{errors.faqSchema}</p>}
          </div>

          <div
            className="image-container"
            style={{ border: errors.thumbnail ? "2px solid red" : "" }}
          >
            <img
              src={image}
              alt="Thumbnail"
              onClick={() => fileInputRef.current?.click()}
            />
            <IoMdCloseCircle
              className="remove-icon"
              onClick={() => {
                setImage(dummyimg);
                fileInputRef.current.value = null;
              }}
            />
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        {errors.slug && <p className="error">{errors.slug}</p>}

        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <p className="error">{errors.author}</p>}

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {errors.tags && <p className="error">{errors.tags}</p>}

        <input
          type="datetime-local"
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)}
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <JoditEditor
          ref={editor}
          value={detail}
          config={config}
          tabIndex={1}
          onChange={(newContent) => setDetail(newContent)}
        />
        {errors.detail && <p className="error">{errors.detail}</p>}

        <div className="toggle-container">
          <span className="toggle-label">
            Blog Visibility:{" "}
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
          <button type="button" className="cancelbtn" onClick={() => navigate("/blogs")}>
            Cancel
          </button>
          <button className="published" type="submit" disabled={loading}>
            {loading ? "Saving..." : id ? "Update Blog" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
