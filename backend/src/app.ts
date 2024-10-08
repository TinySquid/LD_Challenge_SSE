import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

import { errorHandler } from "./middleware";

import api from "./routes/api";

const app = express();

const whitelist = ["http://localhost:3000", "http://localhost:5173"];
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(morgan("combined"));

app.use(helmet());

app.use(bodyParser.json());

app.use("/api", api);

app.use(errorHandler);

export default app;
