import express from "express";
import morgan from "morgan";
import router from "./routes";
import path from "path";

const app = express();

//settings
app.set("port", process.env.PORT || 4000);

//middleware
app.use(morgan("dev"));
app.use("/api", router);
app.use(express.json());

//public files storage
app.use('/uploads', express.static(path.resolve("uploads")))

const PORT = app.get("port");

export { app, PORT };
