import express, { Express, json } from "express";
import cors from "cors";
import { dbConnection } from "../config/config";
import authRoute from "../routes/auth";
import productRoute from "../routes/product";

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
    this.app.use("/product", productRoute);
  }

  middlewares(): void {
    this.app.use(
      cors({ origin: "https://nucba-fullstack-frontend.vercel.app" })
    );
    // this.app.use(cors({ origin: "http://localhost:5173" }));
    this.app.use(json());
  }
}
