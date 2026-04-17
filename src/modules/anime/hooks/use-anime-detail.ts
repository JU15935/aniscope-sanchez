import { useQuery } from '@tanstack/react-query';
import { animeKeys } from './query-keys';
import { fetchAnimeById } from '@/modules/anime/services/anime.service';

export function useAnimeDetail(id: number | null) {
  return useQuery({
    queryKey: animeKeys.detail(id ?? 0),
    queryFn: () => fetchAnimeById(id as number),
    enabled: id !== null,
  });
}