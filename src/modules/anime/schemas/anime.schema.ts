import { z } from 'zod';

const animeStatusSchema = z.union([
  z.literal('Currently Airing'),
  z.literal('Finished Airing'),
  z.literal('Not yet aired'),
]);

const animeSeasonSchema = z.union([
  z.literal('spring'),
  z.literal('summer'),
  z.literal('fall'),
  z.literal('winter'),
]);

export const genreSchema = z.object({
  mal_id: z.number(),
  name: z.string(),
});

export const animeSchema = z.object({
  mal_id: z.number(),
  title: z.string(),
  title_english: z.string().nullable(),
  images: z.object({
    jpg: z.object({
      image_url: z.string(),
      large_image_url: z.string(),
    }),
  }),
  status: animeStatusSchema,
  score: z.number().nullable(),
  episodes: z.number().nullable(),
  synopsis: z.string().nullable(),
  genres: z.array(genreSchema),
  season: animeSeasonSchema.nullable(),
  year: z.number().nullable(),
});

const paginationSchema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
  current_page: z.number(),
  items: z.object({
    count: z.number(),
    total: z.number(),
    per_page: z.number(),
  }),
});

export const animeListResponseSchema = z.object({
  pagination: paginationSchema,
  data: z.array(animeSchema),
});

export const animeDetailResponseSchema = z.object({
  data: animeSchema,
});

export const genreListResponseSchema = z.object({
  data: z.array(genreSchema),
});