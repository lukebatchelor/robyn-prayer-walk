import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const responsesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async (opts) => {
    return opts.ctx.db.response.findMany({
      select: { createdAt: true, name: true, country: true, message: true },
    });
  }),
  postResponse: publicProcedure
    .input(
      z.object({
        name: z.string(),
        country: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { name, country, message } = opts.input;
      console.log("input", opts.input);
      await opts.ctx.db.response.create({
        data: { name, country, message },
      });
      return { success: true };
    }),
});
