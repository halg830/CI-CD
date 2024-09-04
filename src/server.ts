import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

class Server {
  app: express.Application;
  port: number;

  constructor() {
    this.app = express();
    this.port = (process.env.PORT as unknown as number) || 4200;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/api/v1/life", (req, res) => {
      res.json({ ok: true, msg: "Hola mundo" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto: " + this.port);
    });
  }
}

export { Server };
