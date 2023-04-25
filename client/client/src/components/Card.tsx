import React from "react";
import axios from "axios";
import { IEmployee } from "../types";
import "../styles/Card.scss"

import { useNavigate } from "react-router-dom";

interface Props {
  employee: IEmployee;
}

const Card = ({ employee }: Props) => {
  const { name, designation, email, Id ,image , gender} = employee;
  const navigate = useNavigate();

  if (!employee) {
    return <> loding...</>;
  }

  const handleView = () => {
    navigate(`/view-details/${Id}`);
  };

  return (
    <div className="card">
      {/* <img
        className="image"
        src={image}
        alt=""
      /> */}
      {image ? (
              <img src={`${image}`} alt="User Image" className="image" />
            ) : (
              <img  className="image-default"
                src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=2000"
                
              
                alt="" height="250px" width="250px"
              />
            )}
      <div className="name">
        <h2 className="name-text">{name}</h2>
        <h5>{email}</h5>
        <p>{designation}</p>
        <h4 className="gender">{gender}</h4>
      </div>
      <div className="actions">
        <div id="container">
  <button className="learn-more">
    <span className="circle" aria-hidden="true">
      <span className="icon arrow"></span>
    </span>
    <span className="button-text" onClick={handleView}>View More</span>
  </button>
</div>



      </div>
    </div>
  );
};

export default Card;
