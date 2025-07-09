import { invokeApi } from "../Utils/InvokeApi";
export const updateBlog = async ( id,data) => {

  const reqObj = {
    path: `/blog/update/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateCategory = async (id,data) => {
 
  const reqObj = {
    path: `/category/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
//////////////////////////////////////////////
export const updateServicesCategory = async (id,data) => {
 
  const reqObj = {
    path: `/category/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
//////////////////////////////////////////////
export const updateusertype = async (id,data) => {
 
  const reqObj = {
    path: `/usertype/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateuser = async (id,data) => {
 
  const reqObj = {
    path: `/admin/users/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateService = async (id,data) => {
 
  const reqObj = {
    path: `/service/update/${id}`,
    method: "PUT",
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateSubService = async (data) => {
 
  const reqObj = {
    path: `/service/subdata/update`,
    method: "PUT",
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateProcess = async (data) => {
 
  const reqObj = {
    path: `/service/process/update`,
    method: "PUT",
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateBenifit = async (data) => {
 
  const reqObj = {
    path: `/service/benifit/update`,
    method: "PUT",
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updatePrice = async (data) => {
 
  const reqObj = {
    path: `/service/pricing/update/`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateRole = async (id,data) => {
 
  const reqObj = {
    path: `/role/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateComment = async (data) => {
 
  const reqObj = {
    path: `/comment/approve`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateTestimonial = async (id,data) => {
 
  const reqObj = {
    path: `/testimonial/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};