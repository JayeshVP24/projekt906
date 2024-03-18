import { Lucia } from "lucia";
import { adapter } from "./db/db.js"

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production"
    }
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}