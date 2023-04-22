import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { IEmployee } from "../types";
import { useState, useEffect } from "react";
import axios from "axios";

import "../styles/Home.css";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const Home = (): JSX.Element => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredEmployees = employees.filter((employee) => {
    return employee?.name?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  const handleAddUserClick = () => {
    console.log("Add Employee button clicked");
    navigate("/add-user");
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get");
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {}
    };

    fetchEmployees();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* <input
                type="text"
                name="searchTerm"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-96 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              /> */}

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add-button" onClick={handleAddUserClick}>
              Add Employee
            </button>
          </div>
          <div className="card-list">
            {filteredEmployees.map((employee) => (
              <Card employee={employee} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
