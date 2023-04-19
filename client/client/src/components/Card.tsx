import React from "react";
import axios from "axios";
import { IEmployee } from "../types";
import "../styles/Card.css";

import { useNavigate } from "react-router-dom";

interface Props {
  employee: IEmployee;
}

const Card = ({ employee }: Props) => {
  const { name, designation, email } = employee;

  if (!employee) {
    return <> loding...</>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/get`);
      // Navigate to the home page after the request is completed
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="card">
      <div className="name">
        <h2>{name}</h2>
        <h5>{email}</h5>
        <p>{designation}</p>
      </div>
      <div className="actions">
        <button className="edit">Edit</button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
