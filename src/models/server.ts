import express, { Express, json } from "express";
import cors from "cors";
import { dbConnection } from "../config/config";
import authRoute from "../routes/auth";

export class Server {
  app: Express;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.connectToDB();
    this.middlewares();
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Running in port: ${this.port}`);
    });
  }

  async connectToDB(): Promise<void> {
    await dbConnection();
  }

  routes(): void {
    this.app.use("/auth", authRoute);
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(json());
  }
}
