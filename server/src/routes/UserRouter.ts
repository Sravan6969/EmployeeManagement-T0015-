import express from "express";

import {
  AddEmployees,
  getAllEmployees,
  getAllEmployeesById,
  
} from "../controllers/UserController";

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/adduser/:id", getAllEmployeesById);

router.post("/addemployee", AddEmployees);


export default router;
