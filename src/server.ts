import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startserver = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://todoapp:todoapp@cluster0.c3mzl.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0')"
    );

    console.log("connected to db ");

    server = app.listen(5000, () => {
      console.log("server is listening to port 5000");
    });
  } catch (error) {
    console.log(error);
  }
  
};

startserver();
