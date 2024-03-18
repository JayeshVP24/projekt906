import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC, TRPCError } from '@trpc/server';
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db } from './db/db.js';
import { lucia } from './lucia.js';
import { DatabaseUser } from './db/schema.js';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== 'secret') {
      return null;
    }
    return {
      name: 'alex',
    };
  };

  return {
    req,
    res,
    user: getUser(),
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return `hello ${input ?? ctx.user?.name ?? 'world'}`;
  }),

  register: publicProcedure.input(z.object({
    user: z.string(),
    pass: z.string()
  })).mutation(async ({ input, ctx }) => {
    const user = input.user;
    if (!user || typeof user !== "string") {
      return "Invalid user"
    }
    const password = input.pass;
    if (!password || typeof password !== "string" || password.length < 6) {
      return "Invalid password"
    }

    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    try {
      db.prepare('INSERT INTO user (id, username, password) VALUES (?, ?, ?)').run(userId, input.user, hashedPassword);

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      return "registered!"+sessionCookie.serialize()
    } catch {
      // db error, name taken, etc
      return "Name already used"
    }

  }),

  login: publicProcedure.input(z.object({
    user: z.string(),
    pass: z.string()
  })).mutation(async ({ input, ctx }) => {
    const user = input.user;
    if (!user || typeof user !== "string") {
      return "Invalid user"
    }
    const password = input.pass;
    if (!password || typeof password !== "string") {
      return "invalid password"
    }

    const dbuser = db.prepare("SELECT * FROM user WHERE username=?").get(input.user) as DatabaseUser;

    if (!dbuser) {
      console.log("dbuser")
      return "Invalid user or password";
    }
    const validPassword = await new Argon2id().verify(dbuser.password, password);
    
    if (!validPassword) {
      return "Invalid user or password"
    }

    const session = await lucia.createSession(dbuser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return sessionCookie.serialize();
  }),
  // or inline a router
  admin: router({
    secret: publicProcedure.query(({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      if (ctx.user?.name !== 'alex') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return {
        secret: 'sauce',
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;

export {
  appRouter,
  createContext,
}
