import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddUser.css";
import axios from "axios";
import { BsArrowLeftCircleFill } from "react-icons/bs";

interface AddUserProps {}

interface User {
  name: string;
  email: string;
  designation: string;
}

let addedusers: any = {};

export let AddUser: React.FC<AddUserProps> = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [users, setUserList] = useState<User[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [clicks, setClicks] = useState(0);


  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // })

    setClicks(clicks + 1);
    if (clicks >= 1) {
      setDisabled(true);
    }

    const employee: User = {
      name: name,
      email: email,
      designation: designation,
    };
    console.log("New user: ", employee);

    try {
      const response = await axios.post<User>(
        "http://localhost:5000/get/addemployee",
        employee
      );
      navigate("/");
      console.log("Response: ", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.put(
        `http://localhost:5000//upload/:id`,
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

  const handleBackClick = () => {
    console.log("Back button clicked");
    navigate("/");
  };

  const handleDocClick = () => {
    console.log("Back button clicked");
    navigate("/add-doc");
  };

  return (
    <>
      <div>
        <button className="back-btn" onClick={handleBackClick}>
          <div className="Back text">
            <BsArrowLeftCircleFill className="back" />
          </div>
        </button>
        <button className="Doc-btn" onClick={handleDocClick}>
          Documents
        </button>
      </div>

      <div className="login-box">
        <h2>ADD USER</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>
          <div className="user-box">
            <input
              type="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
            <label>Designation</label>
          </div>

          <button className="add-btn" onClick={handleClick} disabled={disabled} >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
