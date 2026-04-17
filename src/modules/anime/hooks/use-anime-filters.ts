import { useState } from 'react';
import { useDebounce } from '@/core/hooks/use-debounce';
import { DEBOUNCE_DELAY_MS } from '@/core/config/api.config';
import type { AnimeFilters, AnimeStatus } from '@/modules/anime/types';

const DEFAULT_FILTERS: AnimeFilters = {
  query: '',
  genreId: null,
  status: 'all',
  page: 1,
};

export function useAnimeFilters() {
  const [filters, setFilters] = useState<AnimeFilters>(DEFAULT_FILTERS);

  const debouncedQuery = useDebounce(filters.query, DEBOUNCE_DELAY_MS);

  const debouncedFilters: AnimeFilters = {
    ...filters,
    query: debouncedQuery,
  };

  function setQuery(query: string) {
    setFilters((prev) => ({ ...prev, query, page: 1 }));
  }

  function setGenreId(genreId: number | null) {
    setFilters((prev) => ({ ...prev, genreId, page: 1 }));
  }

  function setStatus(status: AnimeStatus | 'all') {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  }

  function setPage(page: number) {
    setFilters((prev) => ({ ...prev, page }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return {
    filters,
    debouncedFilters,
    setQuery,
    setGenreId,
    setStatus,
    setPage,
    resetFilters,
  };
}