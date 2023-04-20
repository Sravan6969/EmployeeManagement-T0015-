import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddUser.css";
import axios from "axios";

interface AddUserProps {}

interface User {
  name: string;
  email: string;
  designation: string;
}

export const AddUser: React.FC<AddUserProps> = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [users, setUserList] = useState<User[]>([]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //working on this function
    e.preventDefault();

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
      <button className="back-btn" onClick={handleBackClick}>
        BACK
      </button>
      <button className="back-btn" onClick={handleDocClick}>
        Documents
      </button>

      <div className="add-user">
        <div className="add-image">
          <div className="image"></div>
          <h1 className="text-id"> {name} </h1>
        </div>
        <div className="add-details">
          <form>
            <div className="">
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="designation"
                placeholder="Enter Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              <br />
              <button className="add-btn" onClick={handleClick}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
