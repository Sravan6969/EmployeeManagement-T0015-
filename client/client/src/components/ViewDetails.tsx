import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ViewDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";
// import { IEmployee } from "../types";

interface User {
  id: number;
  name: string;
  email: string;
  designation: string;
  gender:string;
  image: string;
}

const ViewDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/viewdetails/${id}`)
      .then((response) => {
        console.log(response?.data?.employee);
        setUser(response?.data?.employee);
        setName(response?.data.employee.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  //imageupload Axios call

  const handleFileUpload = async () => {
    console.log("button clicked");
    if (!selectedFile) {
      console.error("No file selected");

      return;
    }

    if (selectedFile) {
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(formData, "ffffffffffffffffff");

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
        toast.success("Profile pic uploaded successfully", {
          className: "toastify-success",
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",

        text: "You won't be able to add details!",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#3085d6",

        cancelButtonColor: "#d33",

        confirmButtonText: "Yes, Back to Home!",
      }).then((result) => {
        if (result.isConfirmed) {
          toast.success("User deleted successfully");

          navigate("/");
        }
      });
      await axios.delete(`http://localhost:5000/get/deleteEmployees/${id}`);
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

  const handleDocClick = () => {
    console.log("Back button clicked");
    navigate(`/add-doc/${id}`);
  };

  const handleUpdate = async () => {
    const updatedEmployee = {
      name: name,
      email: email,
      designation: designation,
      gender: gender,
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

  return (
    <>
      <button className="back-btn" onClick={handleBackClick}>
          <div className="Back text">
            <BsArrowLeftCircleFill className="back" />
          </div>
        </button>
        <button className="Doc-btn" onClick={handleDocClick}>
          Documents
        </button>
      <div className="container2">
        <div className="left">
          <div className="imagecontainer">
             
            {user?.image ? (
              <img src={`${user?.image}`} alt="User Image" className="imge" />
            ) : (
              <img
                src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=2000"
                
              
                alt="" height="250px" width="250px"
              />
            )}
            
          </div>
        </div>
        {isEditing ? (
          <div className="flex">
            <div className="form-container">
              <input
                type="text"
                id="name"
                value={name || user?.name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                // placeholder={user.name}
                disabled={false}
                readOnly={false}
              />

              <input
                type="text"
                id="emailInput"
                value={email || user?.email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                // placeholder={user.email}
                disabled={false}
                readOnly={false}
              />

              <input
                type="text"
                id="designation"
                value={designation || user?.designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="form-input"
                // placeholder={user.designation}
                disabled={false}
                readOnly={false}
              />
              <input
                type="text"
                id="designation"
                value={gender || user?.gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-input"
                // placeholder={user.designation}
                disabled={false}
                readOnly={false}
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
            <div className="designation">
              Gender: <span>{user?.gender}</span>
            </div>
            {/* <div className="designation">
              gender: <span>{user?.gender}</span>
            </div> */}

            <label>Profile Picture</label>
            <input
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files != null) {
                  setSelectedFile(files[0]);
                }
              }}
            />

            <button className="btn-upload" onClick={handleFileUpload}>
              Upload
            </button>

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
