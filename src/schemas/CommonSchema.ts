import { z } from "zod";

export const IndexSchema = z.number().int().nonnegative();
export type Index = z.infer<typeof IndexSchema>;
