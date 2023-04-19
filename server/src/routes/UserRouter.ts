import express from "express";

import {
  AddEmployees,
  getAllEmployees,
  getAllEmployeesById,
  deleteEmployees
  
} from "../controllers/UserController";

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/adduser/:id", getAllEmployeesById);

router.post("/addemployee", AddEmployees);

router.delete("/deleteEmployees/:id", deleteEmployees);


export default router;
