import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ViewDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowLeftCircleFill } from "react-icons/bs";

// import { IEmployee } from "../types";

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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/viewdetails/${id}`)
      .then((response) => {
        console.log(response?.data?.employee);
        setUser(response?.data?.employee);
        setName(response?.data.employee.name)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/get/deleteEmployees/${id}`);
      toast.success("User deleted successfully")
      navigate("/");
    } catch (error) {
      console.log("delete clicked");
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
    navigate("/");
  };

  const handleUpdate = async () => {
    const updatedEmployee = {
      name: name,
      email: email,
      designation: designation,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/get/updateemployee/${id}`,
        updatedEmployee
      );
      console.log(`response ${response}`);
      // toast.success('Employee details Updated Successfully', { className: 'toastify-success' });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.put(
        `http://localhost:5000/get/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button className="back-btn" onClick={handleBackClick}>
        <div className="Back text">
          <BsArrowLeftCircleFill className="back" />
        </div>
      </button>
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
        {isEditing ? (
          <div className="flex">
            <div className="form-container">
              <input
                type="text"
                id="name"
                // value={user?.name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder={user?.name}
              />

              <input
                type="text"
                id="emailInput"
                // value={user?.email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder={user?.email}
              />

              <input
                type="text"
                id="designation"
                // value={user?.designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="form-input"
                placeholder={user?.designation}
              />
            </div>

            <button className="btn-update1" onClick={handleUpdate}>
              Update
            </button>
          </div>
        ) : (
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

          

            <button className="btn-update" onClick={handleEdit}>
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewDetails;
