import React from "react";
import { useTable } from "../../Components/Models/useTable";

const Services = () => {
  const attributes = [
   
    { id: "title", label: "Service Title" },
    { id: "category.name", label: "Category" },
    { id: "published", label: "Visibility" },
    { id: "publishedDate", label: "Published At" },
    { id: "createdAt", label: "Created At" },
  ];

 

  const { tableUI } = useTable({  attributes, tableType: "Services" });

  return <>{tableUI}</>;
};

export default Services;
