import express, { Application, Request, Response } from "express";

require("@pnp/sp-commonjs/webs");

require("@pnp/sp-commonjs/items");

import { sp } from "@pnp/sp-commonjs";

import { SPFetchClient } from "@pnp/nodejs-commonjs";

import UserRouter from "./routes/UserRouter";

import cors from "cors";
import multer from "multer";

import morgan from "morgan";
import bodyParser from "body-parser";



const app: Application = express();

const port: number = 5000;

app.use(cors({ origin: "*" }));
app.use(morgan('tiny'))
app.use(bodyParser.json());

const SpfxConnection = () => {
  sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/Sravan",

          "bc448733-66dd-4b06-8c4f-a78e1aa3fbaa",

          "gnYWKTEF9DSnS73nFIwf5fCd+aXb3vjmBVib88kK8rg="
        ),
    },
  });
};

SpfxConnection();

app.use("/get", UserRouter);






app.listen(port, () => {
  console.log(`connected successfully on port ${port}`);
});
