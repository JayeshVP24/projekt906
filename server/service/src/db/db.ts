import sqlite from "better-sqlite3";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
export const db = sqlite("./hello.db");

db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);

export const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session"
});