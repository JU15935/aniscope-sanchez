import { useQuery } from '@tanstack/react-query';
import { animeKeys } from './query-keys';
import { fetchGenres } from '@/modules/anime/services/anime.service';

export function useGenres() {
  return useQuery({
    queryKey: animeKeys.genres(),
    queryFn: fetchGenres,
    staleTime: Infinity,
  });
}