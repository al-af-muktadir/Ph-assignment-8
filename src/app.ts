import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "../src/app/routes/index";
import os from "os";
import sendResponse from "./utilities/sendResponse";
import { handleErrors } from "./utilities/handleErrors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();
  res.send({
    success: true,
    message: "Hello",
    version: "1.0.0",
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60
      )} minutes`,
    },
    developerContact: {
      email: "izemidas@gmail.com",
    },
  });
});

app.use("/api", router);

app.use((req: Request, res: Response, next: Function) => {
  sendResponse(res, false, "API not found");
});

app.use(handleErrors);
export default app;
