import React from "react";
import { useTable } from "../../Components/Models/useTable";

const Tickets = () => {
  const attributes = [
   
    { id: "ticketNO", label: "Ticket NO" },
    { id: "clientname", label: "Client Name" },
    { id: "subject", label: "Subject" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Created At" },
  ];

  
  const { tableUI } = useTable({  attributes, tableType: "Tickets" });

  return <>{tableUI}</>;
};

export default Tickets;
