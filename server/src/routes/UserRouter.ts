import express from "express";
import multer from "multer";

import {
  AddEmployees,
  getAllEmployees,
  getAllEmployeesById,
  deleteEmployees,
  getSingleEmployee,
  updateEmployee,
  uploadImage,
  uploadDocument,
  getFilesInDirectory
  
} from "../controllers/UserController";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/adduser/:id", getAllEmployeesById);

router.post("/addemployee", AddEmployees);

router.delete("/deleteEmployees/:id", deleteEmployees);

router.get("/viewdetails/:Id", getSingleEmployee);

router.route("/updateemployee/:Id").put(updateEmployee);

router.route("/uploadimage/:id").put(uploadImage);

router.put("/upload/:id", upload.single("image"), uploadImage);

router.put("/document/:id", upload.single("file"), uploadDocument);

router.route("/documentView/:id").get(getFilesInDirectory);
export default router;
