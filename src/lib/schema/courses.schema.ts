import { z } from "zod";

export const courseLevel = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Design",
  "IT & Software",
  "Health & Fitness",
  "Music",
  "Photography",
  "Sports",
  "Travel",
] as const;

// Form schema for client-side validation (handles string inputs from form)
export const courseFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  fileKey: z.string().min(3, {
    message: "FileKey is required.",
  }),
  price: z.number().min(1, {
    message: "Price must be at least 1.",
  }),
  duration: z.number().min(1, {
    message: "Duration must be at least 1.",
  }),
  level: z.enum(courseLevel),
  category: z.enum(courseCategories, {
    message: "Category is required.",
  }),
  smallDescription: z.string().min(3, {
    message: "SmallDescription must be at least 3 characters.",
  }),
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters.",
  }),
  status: z.enum(courseStatus),
});

// Server schema for server-side validation (with proper number types)
export const courseSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  fileKey: z.string().min(3, {
    message: "FileKey is required.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration must be at least 1.",
  }),
  level: z.enum(courseLevel),
  category: z.enum(courseCategories, {
    message: "Category is required.",
  }),
  smallDescription: z.string().min(3, {
    message: "SmallDescription must be at least 3 characters.",
  }),
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters.",
  }),
  status: z.enum(courseStatus),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),

  courseId: z.uuid({ message: "Invalid Course id" }),
});

export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  courseId: z.uuid({ message: "Invalid Course id" }),
  chapterId: z.uuid({ message: "Invalid Chapter id" }),
  descripton: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

export type CourseFormSchemaType = z.infer<typeof courseFormSchema>;
export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
