import type { AnimeFilters } from '@/modules/anime/types';

export const animeKeys = {
  all: ['anime'] as const,
  lists: () => [...animeKeys.all, 'list'] as const,
  list: (filters: AnimeFilters) => [...animeKeys.lists(), filters] as const,
  details: () => [...animeKeys.all, 'detail'] as const,
  detail: (id: number) => [...animeKeys.details(), id] as const,
  genres: () => [...animeKeys.all, 'genres'] as const,
} as const;