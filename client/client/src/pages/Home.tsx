import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { IEmployee } from "../types";
import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Search from "../components/Search";
import "../styles/Home.css";

const Home = (): JSX.Element => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get");
        setEmployees(response.data);
      } catch (error) {}
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <Search />

      <div className="card-list">
        {employees?.map((employee) => (
          <Card employee={employee} />
        ))}
      </div>
    </>
  );
};

export default Home;
