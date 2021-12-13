import express from "express";
import morgan from "morgan";
import hotelRouter from "./routes/hotels";
import authRouter from "./routes/auth";
import { connect } from "mongoose";
import OAuth2Server from "oauth2-server";
import model from "./services/models/oauth";
import helmet from "helmet";
import logger from "./logger/logger";

const app = express();

if (process.env.NODE_ENV !== "test") {
  connect("mongodb://localhost/hotels");
}

class MyStream {
  write(text: string) {
    logger.info(text);
  }
}
const myStream = new MyStream();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: myStream,
  })
);

app.use(helmet());
(app as any).oauth = new OAuth2Server({
  model: model as any,
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true,
});

app.use("/api/hotels", hotelRouter);
app.use("/oauth", authRouter);

export default app;
