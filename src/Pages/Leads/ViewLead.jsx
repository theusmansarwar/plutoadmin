import React, { useEffect, useState } from 'react';
import './Viewleads.css';
import { fetchSingleLeads } from '../../DAL/fetch';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../Utils/Formatedate';
import { createnewticket } from '../../DAL/create';
import { useAlert } from '../../Components/Alert/AlertContext';

const ViewLead = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { showAlert } = useAlert();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetchSingleLeads(id);
    setData(response.lead);
  };
  const genarateticket= async()=>{
  
try{
 const res= await createnewticket({id:id});
  if (res.status === 200 || res.status === 201) {
        showAlert("success", res.message);
  }
  else{
    showAlert("error", "something went wrong");
  }
}
catch(err){
showAlert("error", "something went wrong");
}
   
  
}

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="email-container">
      <div className="email-header">
        <h2>New Lead Submission</h2>
        <p className="email-date">Received on: {formatDate(data.createdAt)}</p>
      </div>
      <div className="email-body">
        <div className='create-ticket-btn' onClick={genarateticket}>Create Ticket</div>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a></p>
        <p><strong>Phone:</strong> <a href={`tel:${data.phone}`}>{data.phone}</a></p>
        <p><strong>Subject:</strong> {data.subject}</p>
        <pre className='pretag'><strong>Query:</strong> {data.query}</pre>
      </div>
   
    </div>
  );
};

export default ViewLead;
