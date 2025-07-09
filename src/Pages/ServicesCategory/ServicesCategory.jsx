import React from "react";
import { useTable } from "../../Components/Models/useTable";

const ServicesCategories = () => {
  const attributes = [
   
    { id: "name", label: "Services Category" },
    { id: "published", label: "Visibility" },
    { id: "createdAt", label: "Created At" },
  ];

  
  const { tableUI } = useTable({  attributes, tableType: "Services Categories" });

  return <>{tableUI}</>;
};

export default ServicesCategories;
