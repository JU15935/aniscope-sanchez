import { apiClient } from '@/core/api/api-client';
import { PAGINATION_LIMIT } from '@/core/config/api.config';
import type { JikanPaginatedResponse } from '@/core/types/common';
import {
  animeListResponseSchema,
  animeDetailResponseSchema,
  genreListResponseSchema,
} from '@/modules/anime/schemas/anime.schema';
import type { Anime, AnimeFilters, Genre } from '@/modules/anime/types';

export async function fetchAnimeList(
  filters: AnimeFilters
): Promise<JikanPaginatedResponse<Anime>> {
  const params: Record<string, string | number> = {
    page: filters.page,
    limit: PAGINATION_LIMIT,
  };

  if (filters.query.trim()) params['q'] = filters.query.trim();
  if (filters.genreId !== null) params['genres'] = filters.genreId;
  if (filters.status !== 'all') params['status'] = filters.status;

  const { data } = await apiClient.get<unknown>('/anime', { params });
  return animeListResponseSchema.parse(data);
}

export async function fetchAnimeById(id: number): Promise<Anime> {
  const { data } = await apiClient.get<unknown>(`/anime/${id}`);
  const parsed = animeDetailResponseSchema.parse(data);
  return parsed.data;
}

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await apiClient.get<unknown>('/genres/anime');
  const parsed = genreListResponseSchema.parse(data);
  return parsed.data;
}