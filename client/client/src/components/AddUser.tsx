import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddUser.css";
import axios from "axios";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AddUserProps {}

interface User {
  name: string;
  email: string;
  designation: string;
  gender: string;
  DOB: string;
}

let addedusers: any = {};

export let AddUser: React.FC<AddUserProps> = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
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
      gender: gender,
      DOB:date
    };
    console.log("New user: ", employee);

    try {
      const response = await axios.post<User>(
        "http://localhost:5000/get/addemployee",
        employee
        
      );
      toast.success("User added successfully")
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


  const handleBackClick = () => {
    console.log("Back button clicked");
    navigate("/");
  };

  const handleDocClick = () => {
    console.log("Back button clicked");
    navigate("/add-doc/id");
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
          <label className="gender1">Gender:</label>
            <div className="flex space-x-4">
              <label className="gender">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="gender"
                />
                <span className="gender">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  required
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio border-gray-300 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="gender">Female</span>
              </label>
              </div>
          <button className="add-btn" onClick={handleClick} disabled={disabled} >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
