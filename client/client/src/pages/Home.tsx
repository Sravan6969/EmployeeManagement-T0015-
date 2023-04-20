import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { IEmployee } from "../types";
import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Search from "../components/Search";
import "../styles/Home.css";
import Spinner from "../components/Spinner";

const Home = (): JSX.Element => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <Spinner/>
    ) : (
      <><Search /><div className="card-list">
            {employees?.map((employee) => (
              <Card employee={employee} />
            ))}
          </div></>
    )}
    </>
  );
};

export default Home;
