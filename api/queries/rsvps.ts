import { getDb } from "./connection";
import { rsvps, type InsertRsvp } from "@db/schema";

export async function createRsvp(data: InsertRsvp) {
  const [{ id }] = await getDb().insert(rsvps).values(data).$returningId();
  return id;
}
