import { z } from "zod";

export const FullTodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "入力が必須の項目です"),
  description: z.string().optional(),
  isCompleted: z.boolean().default(false),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const InputTodoSchema = z.object({
  title: z.string().min(1, "入力が必須の項目です"),
  description: z.string().optional(),
  dueDate: z.date(),
});

export type FullTodo = z.infer<typeof FullTodoSchema>;
export type InputTodo = z.infer<typeof InputTodoSchema>;
