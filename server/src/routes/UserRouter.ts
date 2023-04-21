import express from "express";

import {
  AddEmployees,
  getAllEmployees,
  getAllEmployeesById,
  deleteEmployees,
  getSingleEmployee,
  updateSingleEmployee
  
} from "../controllers/UserController";

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/adduser/:id", getAllEmployeesById);

router.post("/addemployee", AddEmployees);

router.delete("/deleteEmployees/:id", deleteEmployees);

router.get("/viewdetails/:Id", getSingleEmployee);

router.route("/updateemployee/:id").put(updateSingleEmployee);

export default router;
