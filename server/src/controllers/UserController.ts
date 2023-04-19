import { Request, Response } from "express";

import { sp } from "@pnp/sp-commonjs";

import { SPFetchClient } from "@pnp/nodejs-commonjs";

const getAllEmployees = async (req: Request, res: Response) => {
  console.log("test");

  try {
    const response = await sp.web.lists.getByTitle("Employees").items.getAll();

    console.log("logging response", response);

    return res.send(response);
  } catch (error) {
    console.log(error);
  }
};

export { getAllEmployees };

const getAllEmployeesById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const response = await sp.web.lists
      .getByTitle("Employees")
      .items.getById(Number(id))
      .get();

    return res.json(response);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllEmployeesById };

const AddEmployees = async (req: Request, res: Response) => {
  try {
    console.log("starting....");

    console.log(req.body, "req body log"); 

    const newUser = {
      name: req.body.name,

      email: req.body.email,

      gender: req.body.gender,

      designation: req.body.designation,
    };

    console.log("new user log", newUser);

    const response = await sp.web.lists.getByTitle("Employees").items.add({
      name: newUser.name,

      email: newUser.email,

      

      designation: newUser.designation,
    });

    console.log(response.data.Id);

    return res.send(response);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

export { AddEmployees };



//  export const test = async (req: Request, res: Response) => {
//   // const { id } = req.body;
//    console.log(req.body)
 
//   try {
    
//     console.log("trycatch")
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };

