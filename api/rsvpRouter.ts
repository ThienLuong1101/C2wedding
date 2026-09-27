import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "./lib/env";
import { appendRsvpToSheet, isGoogleSheetsConfigured } from "./lib/googleSheets";
import { createRouter, publicQuery } from "./middleware";
import { createRsvp } from "./queries/rsvps";

export const rsvpRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(1, "Please tell us your name").max(255),
        contact: z.string().trim().max(320).optional(),
        attending: z.enum(["yes", "no"]),
        guests: z.number().int().min(1).max(10).default(1),
        message: z.string().trim().max(2000).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const record = {
        name: input.name,
        contact: input.contact || null,
        attending: input.attending,
        guests: input.attending === "yes" ? input.guests : 0,
        message: input.message || null,
      };

      if (!isGoogleSheetsConfigured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "The RSVP spreadsheet is not connected yet.",
        });
      }

      try {
        await appendRsvpToSheet({
          name: record.name,
          contact: record.contact ?? "",
          attending: record.attending,
          guests: record.guests,
          message: record.message ?? "",
        });
      } catch (error) {
        console.error("Failed to append RSVP to Google Sheets.", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not save your RSVP. Please try again.",
        });
      }

      let id: number | null = null;
      if (env.databaseUrl) {
        try {
          id = await createRsvp(record);
        } catch (error) {
          console.error("RSVP is in Google Sheets, but the database copy failed.", error);
        }
      }

      return { id: id ?? 0 };
    }),
});
