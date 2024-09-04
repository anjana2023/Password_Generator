import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import userRoute from "./routes/userRoute";
import errorHandlingMidleware from "./middlewares/errorHandlerMiddleware";
import CustomError from "./utils/customError";
import ENV from "./config/ENV";
import connectDb from "./config/connection";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", userRoute);
app.use(errorHandlingMidleware);

app.get("/test", (req, res) => {
  res.send("Haiiiiii");
});

app.all("*", (req, res, next) => {
  next(new CustomError(`Not found ${req.url}`, 404));
});

const port = ENV.PORT || 3000;

app.listen(port, () => {
  connectDb();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
