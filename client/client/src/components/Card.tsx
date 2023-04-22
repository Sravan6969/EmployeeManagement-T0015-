import React from "react";
import axios from "axios";
import { IEmployee } from "../types";
import "../styles/Card.scss";

import { useNavigate } from "react-router-dom";

interface Props {
  employee: IEmployee;
}

const Card = ({ employee }: Props) => {
  const { name, designation, email, Id } = employee;
  const navigate = useNavigate();

  if (!employee) {
    return <> loding...</>;
  }

  const handleDelete = async () => {
    try {
      console.log(Id);
      await axios.delete(`http://localhost:5000/get/deleteEmployees/${Id}`);
      window.location.reload();
    } catch (error) {
      console.log("delete clicked");
      console.error("Error deleting employee:", error);
    }
  };

  const handleView = () => {
    navigate(`/view-details/${Id}`);
  };

  return (
    <div className="card">
      <img
        className="image"
        src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Customer-testimonial-page.jpg?width=893&height=600&name=Customer-testimonial-page.jpg"
        alt=""
      />
      <div className="name">
        <h2>{name}</h2>
        <h5>{email}</h5>
        <p>{designation}</p>
      </div>
      <div className="actions">
        {/* <button className="edit" onClick={handleView}>
          View
        </button> */}
        <div id="container">
  <button className="learn-more">
    <span className="circle" aria-hidden="true">
      <span className="icon arrow"></span>
    </span>
    <span className="button-text" onClick={handleView}>Learn More</span>
  </button>
</div>



      </div>
    </div>
  );
};

export default Card;
