import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import { configData } from "./config/config.js";
import { logger } from "./middlewares/logger.js";
import cookieParser from "cookie-parser";

const PORT = configData.port || 4000;
const app = express();

app.use(cors({ origin: configData.origin, credentials: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Define application routes
app.use("/v1", routes);

// Error Handling Middleware
app.use((req, res, next) => {
  logger.error({ request: JSON.stringify(req.headers), message: res.data });
  res.status(400).json({
    StatusCode: 1,
    ErrorMessage: `Bad Request : Routes Connection error..!`,
  });
  return next();
});

// Start server on specified port
app.listen(PORT, () => {
  console.log(`Created server on port http://localhost:${PORT}/v1/`);
});
