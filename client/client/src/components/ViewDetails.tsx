import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/ViewDetails.css'
import { IEmployee } from "../types";

interface User {
  id: number;
  name: string;
  email: string;
  designation: string;
}

const ViewDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/viewdetails/${id}`)
      .then((response) => {
        console.log(response?.data?.employee)
        setUser(response?.data?.employee);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/get/deleteEmployees/${id}`);
      navigate('/');
    } catch (error) {
      console.log("delete clicked");
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdate = () => {
    navigate(`/update`);
  };

  return (
    <div className="container2">
      <div className="left">
        <div className="imagecontainer">
          <img
            src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Customer-testimonial-page.jpg?width=893&height=600&name=Customer-testimonial-page.jpg"
            alt=""
            height="250px"
            width="250px"
          />
        </div>
      </div>
      <div className="right">
        <div className="title">
          Name: <span>{user?.name}</span>
        </div>
        <div className="email">
          Email: <span>{user?.email}</span>
        </div>
        <div className="designation">
          Designation: <span>{user?.designation}</span>
        </div>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn-update" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;
