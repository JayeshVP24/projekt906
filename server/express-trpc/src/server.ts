// server.ts
import { createServer } from "http";
import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import {appRouter, createContext} from "./trpc"
import cors from "cors"

export const server = async () => {
  const app = express();


  app.use(cors())

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );


  const server = createServer(app);

  server.listen(4000, () => {
    console.log(`Server running in 4000`);
  });
};

