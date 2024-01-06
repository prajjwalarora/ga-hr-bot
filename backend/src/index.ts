import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { DBRunner } from "./services/dbReader";
import { DBReader } from "./services/dbReader/chain";
import Logger from "./services/logger/logger";
const app = express();
const dbRunner = new DBRunner();
const dbReader = new DBReader();
app.use(cors());
app.use(express.json());

const BUILDER_URL = process.env.BUILDER_URL || "";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/query", async (req: Request, res: Response) => {
  const query = req.body.query;

  const resp = await axios.post(BUILDER_URL, {
    query: query,
  });
  Logger.info(resp.data);
  res.json(resp.data);
});

app.post("/db", async (req: Request, res: Response) => {
  const resp = await dbRunner.run(req.body.query);
  console.log(resp);
  Logger.info(`HTTP Req body: ${req.body.query}`);
  res.json(resp);
});

app.post("/dbread", async (req: Request, res: Response) => {
  const resp = await dbReader.run(req.body.query);
  res.json({ message: resp });
});

const PORT = 7000;

app.listen(PORT, async () => {
  await dbRunner.init();
  await dbReader.init();
  console.log("listening on port", PORT);
});
