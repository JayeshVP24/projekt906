import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC, TRPCError } from '@trpc/server';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // const getUser = () => {
  //   if (req.headers.authorization !== 'secret') {
  //     return null;
  //   }
  //   return {
  //     name: 'alex',
  //   };
  // };

  return {
    req,
    res,
    // user: getUser(),
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

const router = t.router;
const procedure = t.procedure;

const appRouter = router({
  hello: procedure.input(z.string().nullish()).query(({ input }) => {
    return `hello ${input ?? 'world'}`;
  }),
});

export type AppRouter = typeof appRouter;

export {
  appRouter,
  createContext,
}
