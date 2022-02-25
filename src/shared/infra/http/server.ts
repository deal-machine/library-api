import "reflect-metadata";

import express, { json, NextFunction, Response, Request } from "express";
import "express-async-errors";

import cors from "cors";

import config from "config";

import db from "@shared/infra/sequelize/models";

import "@shared/injections";

import { AppError } from "@shared/errors/AppError";

import { routes } from "./routes";

const app = express();

const apiVersion = config.get("api.version");
const port = config.get("api.port");

app.use(cors());
app.use(json());

app.use(`/api/${apiVersion}`, routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    const infos = [
      { version: apiVersion, success: false },
      {
        code: 500,
        message: `Internal Server error: ${err.message}`,
        field: err.name,
      },
    ];
    if (err instanceof AppError) {
      infos[1].code = err.statusCode;
      infos[1].message = err.message;
    }

    return response.status(infos[1].code).json(infos);
  }
);

app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection successfully - ${config.get("connection.database")}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  console.log(`Server is running on port ${config.get("api.port")}`);
});
