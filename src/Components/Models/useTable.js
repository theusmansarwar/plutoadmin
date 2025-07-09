import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchallApplication,
  fetchallBloglist,
  fetchallcategorylist,
  fetchallCommentlist,
  fetchallLeads,
  fetchallTestimonialslist,
  fetchallTickets,
  fetchallUserlist,
  fetchallUserTypelist,
  fetchBloglistofwritter,
  fetchFeaturedBloglist,
} from "../../DAL/fetch";
import { formatDate } from "../../Utils/Formatedate";
import truncateText from "../../truncateText";
import { useNavigate } from "react-router-dom";
import AddCategories from "./addcategorie";
import {
  deleteAllApplications,
  deleteAllBlogs,
  deleteAllCategories,
  deleteAllComments,
  deleteAllFeaturedBlogs,
  deleteAllLeads,
  deleteAllTestimonials,
  deleteAllUsers,
  deleteAllUsersType,
} from "../../DAL/delete";
import { useAlert } from "../Alert/AlertContext";
import ApproveComment from "./approveComment";
import DeleteModal from "./confirmDeleteModel";
import UserType from "../../Pages/Users/UserType";
import AddUsertype from "./addUsertype";
import AddUser from "./addUser";
import AddServicesCategories from "./addServicesCategories";

export function useTable({ attributes, tableType, limitPerPage = 10 }) {
  const { showAlert } = useAlert(); // Since you created a custom hook

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(limitPerPage);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openServicesCategoryModal, setOpenServicesCategoryModal] =
    useState(false);
  const [openUserTypeModal, setOpenUserTypeModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [modeltype, setModeltype] = useState("Add");
  const [modelData, setModelData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user?.type?.name || "";
    const userName = user?.name || "";
    let response;
    if (tableType === "Categories") {
      response = await fetchallcategorylist(page, rowsPerPage);
      setData(response.categories);
      setTotalRecords(response.categories.length);
    } else if (tableType === "Services Categories") {
      ///////////////////////////
      response = await fetchallcategorylist(page, rowsPerPage);
      setData(response.categories);
      setTotalRecords(response.categories.length);
    } else if (tableType === "Services") {
      ///////////////////////////
      response = await fetchallcategorylist(page, rowsPerPage);
      setData(response.categories);
      setTotalRecords(response.categories.length);
    } else if (tableType === "Blogs") {
      if (userType === "Writer") {
        response = await fetchBloglistofwritter(page, rowsPerPage, userName);
        console.log("Response:", response);

        setData(response.blogs);
        setPage(response.currentPage);
        setTotalRecords(response.totalBlogs);
      } else {
        response = await fetchallBloglist(page, rowsPerPage);
        console.log("Response:", response);

        setData(response.blogs);
        setPage(response.currentPage);
        setTotalRecords(response.totalBlogs);
      }
    } else if (tableType === "Featured Blogs") {
      response = await fetchFeaturedBloglist(page, rowsPerPage);
      console.log("featured blog Response:", response);

      setData(response.blogs);
      setPage(response.currentPage);
      setTotalRecords(response.totalBlogs);
    } else if (tableType === "UserType") {
      response = await fetchallUserTypelist(page, rowsPerPage);
      console.log("Response:", response);

      setData(response.userType);
      setPage(response.currentPage);
      setTotalRecords(response.totalUserType);
    } else if (tableType === "Tickets") {
      response = await fetchallTickets(page, rowsPerPage);
      console.log("Response:", response);

      setData(response.ticketslist);
      setPage(response.currentPage);

      setTotalRecords(response.totalTickets);
    } else if (tableType === "Users") {
      response = await fetchallUserlist(page, rowsPerPage);
      console.log("Response:", response);

      setData(response.data);
      setPage(response.currentPage);
      setTotalRecords(response.totalUsers);
    } else if (tableType === "Comments") {
      response = await fetchallCommentlist(page, rowsPerPage);
      setData(response.comments);
      setTotalRecords(response.totalComments || 0);
    } else if (tableType === "Applications") {
      response = await fetchallApplication(page, rowsPerPage);
      setData(response.applications);
      setTotalRecords(response.totalApplication || 0);
    } else if (tableType === "Testimonial") {
      response = await fetchallTestimonialslist(page, rowsPerPage);
      setData(response.testimonials);
      setTotalRecords(response.totalTestimonials || 0);
    } else if (tableType === "Lead") {
      response = await fetchallLeads(page, rowsPerPage);
      setData(response.leads);
      setTotalRecords(response?.totalLeads || 0);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      }
    }
  };

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((row) => row._id) : []);
  };

  const isSelected = (id) => selected.includes(id);

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1); // ✅ Adjust for API's 1-based pagination
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (category) => {
    if (tableType === "Categories") {
      setModelData(category);
      setModeltype("Update");
      setOpenCategoryModal(true);
    } else if (tableType === "Services Categories") {
      ///////////////////////////
      setModelData(category);
      setModeltype("Update");
      setOpenServicesCategoryModal(true);
    } else if (tableType === "Services") {
      ///////////////////////////
      navigate(`/edit-service/${category._id}`);
    } else if (tableType === "UserType") {
      setModelData(category);
      setModeltype("Update");
      setOpenUserTypeModal(true);
    } else if (tableType === "Users") {
      setModelData(category);
      setModeltype("Update");
      setOpenUserModal(true);
    } else if (tableType === "Blogs") {
      navigate(`/edit-blog/${category._id}`);

    }else if (tableType === "Featured Blogs") {
      navigate(`/edit-featuredblog/${category._id}`);} 
    else if (tableType === "Tickets") {
      window.open(
        `https://crm.plutosec.ca/ticketviewbyadmin/${category._id}`,
        "_blank"
      );
    } else if (tableType === "Testimonial") {
      navigate(`/edit-testimonial/${category._id}`);
    } else if (tableType === "Lead") {
      navigate(`/view-lead/${category._id}`);
    } else if (tableType === "Applications") {
      navigate(`/view-application/${category._id}`);
    } else if (tableType === "Comments") {
      setModelData(category);
      setModeltype("Update");
      setOpenCommentModal(true);
    }
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      showAlert("warning", "No items selected for deletion");
      return;
    }

    console.log("Attempting to delete IDs:", selected);

    try {
      let response;
      if (tableType === "Blogs") {
        response = await deleteAllBlogs({ ids: selected });
      }
      else if (tableType === "Featured Blogs") {
        response = await deleteAllFeaturedBlogs({ ids: selected });}
      else if (tableType === "Categories") {
        response = await deleteAllCategories({ ids: selected });
      } else if (tableType === "Comments") {
        response = await deleteAllComments({ ids: selected });
      } else if (tableType === "Lead") {
        response = await deleteAllLeads({ ids: selected });
      } else if (tableType === "Testimonial") {
        response = await deleteAllTestimonials({ ids: selected });
      } else if (tableType === "Applications") {
        response = await deleteAllApplications({ ids: selected });
      } else if (tableType === "UserType") {
        response = await deleteAllUsersType({ ids: selected });
      } else if (tableType === "Users") {
        response = await deleteAllUsers({ ids: selected });
      }

      if (response.status === 200) {
        showAlert("success", response.message || "Deleted successfully");
        fetchData();
        setSelected([]);
      } else {
        showAlert("error", response.message || "Failed to delete items");
      }
    } catch (error) {
      console.error("Error in delete request:", error);
      showAlert("error", "Something went wrong. Try again later.");
    }
  };

  const handleAddButton = () => {
    if (tableType === "Categories") {
      setOpenCategoryModal(true);
      setModeltype("Add");
      setModelData();
    }
    if (tableType === "Services Categories") {
      ///////////////////////////
      setOpenServicesCategoryModal(true);
      setModeltype("Add");
      setModelData();
    } else if (tableType === "Services") {
      navigate("/add-service");
    } else if (tableType === "UserType") {
      setOpenUserTypeModal(true);
      setModeltype("Add");
      setModelData();
    } else if (tableType === "Users") {
      setOpenUserModal(true);
      setModeltype("Add");
      setModelData();
    } else if (tableType === "Blogs") {
      navigate("/add-blog");
    } 
    else if (tableType === "Featured Blogs") {
      navigate("/add-blog");}
    else if (tableType === "Testimonial") {
      navigate("/add-testimonial");
    }
  };

  const getNestedValue = (obj, path) => {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : "N/A"),
        obj
      );
  };

  const handleResponse = (response) => {
    showAlert(response.messageType, response.message);
    fetchData();
  };
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  return {
    tableUI: (
      <>
        <AddCategories
          open={openCategoryModal}
          setOpen={setOpenCategoryModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddServicesCategories ///////////////////////////
          open={openServicesCategoryModal}
          setOpen={setOpenServicesCategoryModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddUsertype
          open={openUserTypeModal}
          setOpen={setOpenUserTypeModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <AddUser
          open={openUserModal}
          setOpen={setOpenUserModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <ApproveComment
          open={openCommentModal}
          setOpen={setOpenCommentModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />

        <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDelete}
        />

        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", maxHeight: "95vh", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h5"
                sx={{ color: "var(--background-color)" }}
              >
                {tableType} List
              </Typography>

              {selected.length > 0 ? (
                <IconButton onClick={handleDeleteClick} sx={{ color: "red" }}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                tableType !== "Comments" &&
                tableType !== "Lead" &&
                tableType !== "Applications" &&
                tableType !== "Tickets" && (
                  <Button
                    sx={{
                      background: "var(--background-color)",
                      color: "var(--text-color)",
                      borderRadius: "var(--default-border-radius)",
                      "&:hover": { background: "var(--shadow-low3)" },
                    }}
                    onClick={handleAddButton}
                  >
                    Add {tableType}
                  </Button>
                )
              )}
            </Toolbar>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          color: "var(--background-color)",
                          "&.Mui-checked": { color: "var(--background-color)" },
                          "&.MuiCheckbox-indeterminate": {
                            color: "var(--background-color)",
                          },
                        }}
                        indeterminate={
                          selected.length > 0 && selected.length < data.length
                        }
                        checked={
                          data.length > 0 && selected.length === data.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {attributes.map((attr) => (
                      <TableCell
                        key={attr._id}
                        sx={{ color: "var(--background-color)" }}
                      >
                        {attr.label}
                      </TableCell>
                    ))}
                    <TableCell sx={{ color: "var(--background-color)" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => {
                    const isItemSelected = isSelected(row._id);
                    return (
                      <TableRow key={row._id} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            sx={{
                              color: "var(--background-color)",
                              "&.Mui-checked": {
                                color: "var(--background-color)",
                              },
                            }}
                            checked={isItemSelected}
                            onChange={() => {
                              setSelected((prev) =>
                                isItemSelected
                                  ? prev.filter((id) => id !== row._id)
                                  : [...prev, row._id]
                              );
                            }}
                          />
                        </TableCell>

                        {attributes.map((attr) => (
                          <TableCell
                            key={attr.id}
                            sx={{ color: "var(--black-color)" }}
                          >
                            {attr.id === "createdAt" ||
                            attr.id === "publishedDate" ? (
                              formatDate(row[attr.id])
                            ) : attr.id === "published" ? (
                              <span
                                style={{
                                  color: row[attr.id]
                                    ? "var(--success-color)"
                                    : "var(--warning-color)",
                                  background: row[attr.id]
                                    ? "var(--success-bgcolor)"
                                    : "var(--warning-bgcolor)",
                                  padding: "5px",
                                  minWidth: "200px",
                                  borderRadius: "var(--default-border-radius)",
                                }}
                              >
                                {row[attr.id] ? "Public" : "Private"}
                              </span>
                            ) : attr.id === "status" ? (
                              <span
                                style={{
                                  color: row[attr.id] ? "green" : "orange",
                                  background: row[attr.id]
                                    ? "#d4edda"
                                    : "#fff3cd",
                                  padding: "5px",
                                  minWidth: "100px",
                                  borderRadius: "var(--default-border-radius)",
                                }}
                              >
                                {row[attr.id] ? "Answered" : "Pending"}
                              </span>
                            ) : row[attr.id] === 0 ? (
                              0
                            ) : typeof getNestedValue(row, attr.id) ===
                              "string" ? (
                              truncateText(getNestedValue(row, attr.id), 30)
                            ) : (
                              getNestedValue(row, attr.id)
                            )}
                          </TableCell>
                        ))}

                        <TableCell>
                          <span
                            onClick={() => handleViewClick(row)}
                            style={{
                              color: "var(--background-color)",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            View
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRecords} // ✅ Correct count from API
              rowsPerPage={rowsPerPage}
              page={page - 1} // ✅ Convert to 0-based index for Material-UI
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </>
    ),
  };
}
