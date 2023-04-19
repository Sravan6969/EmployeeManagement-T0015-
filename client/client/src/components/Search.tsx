import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Search.css";

type Props = {};

const Search = (props: Props) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAddUserClick = () => {
    console.log("Add Employee button clicked");
    navigate("/add-user");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="add-button" onClick={handleAddUserClick}>
        Add Employee
      </button>
    </div>
  );
};

export default Search;
