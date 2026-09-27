import { createRouter, publicQuery } from "./middleware";
import { rsvpRouter } from "./rsvpRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  rsvp: rsvpRouter,
});

export type AppRouter = typeof appRouter;
