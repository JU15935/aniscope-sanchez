import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { animeKeys } from './query-keys';
import { fetchAnimeList } from '@/modules/anime/services/anime.service';
import type { AnimeFilters } from '@/modules/anime/types';

export function useAnimeList(filters: AnimeFilters) {
  return useQuery({
    queryKey: animeKeys.list(filters),
    queryFn: () => fetchAnimeList(filters),
    placeholderData: keepPreviousData,
  });
}