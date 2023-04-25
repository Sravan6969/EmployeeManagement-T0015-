import { Request, Response } from "express";

import { sp } from "@pnp/sp-commonjs";

const fs = require("fs");

import { SPFetchClient } from "@pnp/nodejs-commonjs";

// get all employees details

const getAllEmployees = async (req: Request, res: Response) => {
  console.log("test");

  try {
    const Response = await sp.web.lists.getByTitle("Employees").items.getAll();

    return res.send(Response);
  } catch (error) {}
};

const getAllEmployeesById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const Response = await sp.web.lists
      .getByTitle("Employees")
      .items.getById(Number(id))
      .get();

    return res.json(Response);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Add employees details

const AddEmployees = async (req: Request, res: Response) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      designation: req.body.designation,
      gender: req.body.gender
    };
    const Response = await sp.web.lists.getByTitle("Employees").items.add({
      name: newUser.name,
      email: newUser.email,
      designation: newUser.designation,
      gender: newUser.gender
    });

    const folderId = Response.data.Id;
    const newFolderName = `${folderId}`;
    const documentLibraryName = `EmployeeLibrary`;
    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders
      .addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder ${newFolderName} created successfully.`);
      });

    return res.send(Response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete employee details

const deleteEmployees = async (req: Request, res: Response) => {
  console.log("delete employee");

  let Id: number = Number.parseInt(req.params.id);

  console.log("id", Id);
  try {
    let user = await sp.web.lists.getByTitle("Employees").items.getById(Id);

    if (!user) {
      throw new Error("User not found");
    } else {
      await sp.web.lists.getByTitle("Employees").items.getById(Id).delete();
      const folderName = `${Id}`;
      const documentLibraryName = `EmployeeLibrary`;
      const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
      const folder = await documentLibrary.rootFolder.folders.getByName(
        folderName
      );
      await folder.delete();

      res.send({ message: "Deleted successfully" });
      res.send({ message: "Deleted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

//get employee view details

const getSingleEmployee = async (req: Request, res: Response) => {
  const { Id } = req.params;
  console.log(Id);

  const id = Number(Id);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid ID provided",
    });
    return;
  }
  const employee = await sp.web.lists
    .getByTitle("Employees")
    .items.getById(id)();

  res.status(200).json({
    success: true,
    message: "Fetched Single Employee",
    employee,
  });
};

const updateEmployee = async (req: Request, res: Response) => {
  const { Id } = req.params;
  const { name, email, designation } = req.body;
  console.log(Id);

  const id = Number(Id);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid ID provided",
    });
    return;
  }

  const updateEmployee = {
    name: name,
    email: email,
    designation: designation,
  };

  const employee = await sp.web.lists
    .getByTitle("Employees")
    .items.getById(id)
    .update(updateEmployee);

  res.status(200).json({
    success: true,
    message: " Succesfully Updated  Employee Details",
    employee,
  });
};

console.log(Response);

//upload Image API

export const uploadImage = async (req: Request, res: Response) => {
  const id: number = Number.parseInt(req.params.id);
  const image = req.file;

  const fileBuffer = fs.readFileSync(req.file?.path);
  console.log(req.file, "image file");
  console.log(fileBuffer);

  console.log(image);

  if (!image) {
    console.error("No file selected");
    console.log(req.files);
    return res.status(400).json({
      success: false,
      message: "No file selected",
    });
  }

  const documentLibraryName = `EmployeeLibrary/${id}`;
  const fileNamePath = `profilepic.png`;

  let result: any;
  if (image.size <= 10485760) {
    // small upload
    console.log("Starting small file upload");
    result = await sp.web
      .getFolderByServerRelativePath(documentLibraryName)
      .files.addUsingPath(fileNamePath, fileBuffer, { Overwrite: true });
  } else {
    // large upload
    console.log("Starting large file upload");
    result = await sp.web
      .getFolderByServerRelativePath(documentLibraryName)
      .files.addChunked(
        fileNamePath,
        new Blob([image.buffer]),
        () => {
          console.log(`Upload progress: `);
        },
        true
      );
  }

  console.log("Server relative URL:", result?.data?.ServerRelativeUrl);
  const url = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;

  const list = sp.web.lists.getByTitle("employees");

  try {
    await list.items.getById(id).update({
      image: url,
    });

    console.log("File upload successful");
    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    console.error("Error while updating employee item:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating employee item",
    });
  }
};


//upload Document API


export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const file = req.file;

    if (!file) {
      console.error("No file selected");
      return res.status(400).json({
        success: false,
        message: "No file selected",
      });
    }

    const documentLibraryName = `EmployeeLibrary/${id}`;
    const fileNamePath = `document.pdf`;

    let result: any;
    if (file.size <= 10485760) {
      // small upload
      console.log("Starting small file upload");
      result = await sp.web
        .getFolderByServerRelativePath(documentLibraryName)
        .files.addUsingPath(fileNamePath, file.buffer, { Overwrite: true });
    } else {
      // large upload
      console.log("Starting large file upload");
      result = await sp.web
        .getFolderByServerRelativePath(documentLibraryName)
        .files.addChunked(
          fileNamePath,
          new Blob([file.buffer]),
          () => {
            console.log(`Upload progress: `);
          },
          true
        );
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error uploading file",
    });
  }
};




export {
  AddEmployees,
  getAllEmployees,
  getAllEmployeesById,
  getSingleEmployee,
  deleteEmployees,
  updateEmployee,
};
