import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { cloneDef } from "zod/v4/core/util.cjs";
import { envVars } from "./app/config/env";

let server: Server;

const startserver = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("connected to db ");

    server = app.listen(envVars.PORT, () => {
      console.log(`server is listening to port 5000 ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startserver();

process.on("unhandledRejection", () => {
  console.log("unhandled rejection detected... server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("i forgot to catch this promise "));
