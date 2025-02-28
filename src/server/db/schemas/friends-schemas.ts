import {
  pgTable,
  timestamp,
  text,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";
import { userProfiles } from "./user-profiles";

export const friendRequests = pgTable("friend_requests", {
  id: serial("id").primaryKey(),
  senderId: text("sender_id")
    .notNull()
    .references(() => userProfiles.userId, { onDelete: "cascade" }),
  receiverId: text("receiver_id")
    .notNull()
    .references(() => userProfiles.userId, { onDelete: "cascade" }),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const friends = pgTable(
  "friends",
  {
    userId1: text("user_id_1")
      .notNull()
      .references(() => userProfiles.userId, { onDelete: "cascade" }),
    userId2: text("user_id_2")
      .notNull()
      .references(() => userProfiles.userId, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId1, table.userId2] })],
);
