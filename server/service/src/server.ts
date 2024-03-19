// server.ts
import { createServer } from "http";
import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { expressHandler } from 'trpc-playground/handlers/express'
import {appRouter, createContext} from "./trpc.js"
import cors from "cors"

export const server = async () => {
  const app = express();

  const trpcApiEndpoint = '/trpc'
  const playgroundEndpoint = '/trpc-playground'

  app.use(cors())

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
    }),
  )

  const server = createServer(app);

  server.listen(4000, () => {
    console.log(`Server running in 4000`);
  });
};

