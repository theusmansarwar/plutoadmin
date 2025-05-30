import { invokeApi } from "../Utils/InvokeApi";
export const createBlog = async (data) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: "/blog/create",
    method: "POST",
    headers: {
   'Content-Type': 'multipart/form-data',
   Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createnewCategory = async (data) => {

  const reqObj = {
    path: "/category/add",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createTestimonial = async (data) => {

  const reqObj = {
    path: "/testimonial/add",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createnewusertype = async (data) => {

  const reqObj = {
    path: "/usertype/add",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createTeamMember = async (data) => {

  const reqObj = {
    path: "/admin/register",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createnewticket = async (id) => {

  const reqObj = {
    path: "/ticket/add",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: id,
  };
  return invokeApi(reqObj);
};
export const createMessage = async (data) => {

  const reqObj = {
    path: "/chat/add",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    postData: data,
  };
  return invokeApi(reqObj);
};