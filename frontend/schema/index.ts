import * as z from "zod";

const user = z.object({
  email: z.string()
});
