import { useNavigate } from 'react-router-dom';
import { useAnimeList } from '@/modules/anime/hooks/use-anime-list';
import { useAnimeFilters } from '@/modules/anime/hooks/use-anime-filters';
import { useGenres } from '@/modules/anime/hooks/use-genres';
import { useFavorites } from '@/modules/favorites/hooks/use-favorites';
import {
  AnimeCard,
  AnimeCardSkeleton,
  ErrorMessage,
  SearchBar,
  FilterChip,
  Button,
  ListLayout,
  IconHeart,
  IconTv,
  IconChevronLeft,
  IconChevronRight,
} from '@/design';
import type { AnimeStatus } from '@/modules/anime/types';

const STATUS_OPTIONS: { label: string; value: AnimeStatus | 'all' }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'En emisión', value: 'Currently Airing' },
  { label: 'Finalizado', value: 'Finished Airing' },
  { label: 'Próximamente', value: 'Not yet aired' },
];

export function AnimeListPage() {
  const navigate = useNavigate();
  const { filters, debouncedFilters, setQuery, setGenreId, setStatus, setPage } = useAnimeFilters();
  const { data, isLoading, isError, error, refetch } = useAnimeList(debouncedFilters);
  const { data: genres } = useGenres();
  const { isFavorite, toggleFavorite } = useFavorites();

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-900/40">
          <IconTv size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AniScope</h1>
          <p className="text-xs text-gray-400">Descubre tu próximo anime favorito</p>
        </div>
      </div>
      <Button variant="ghost" onClick={() => navigate('/favorites')} className="flex items-center gap-2">
        <IconHeart size={16} className="text-red-400" />
        <span className="hidden sm:inline">Favoritos</span>
      </Button>
    </div>
  );

  const filtersSection = (
    <div className="flex flex-col gap-3">
      <SearchBar
        value={filters.query}
        onChange={setQuery}
        placeholder="Buscar por título..."
      />
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <FilterChip
            key={opt.value}
            label={opt.label}
            selected={filters.status === opt.value}
            onToggle={() => setStatus(opt.value)}
          />
        ))}
      </div>
      {genres && genres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="Todos los géneros"
            selected={filters.genreId === null}
            onToggle={() => setGenreId(null)}
          />
          {genres.slice(0, 15).map((g) => (
            <FilterChip
              key={g.mal_id}
              label={g.name}
              selected={filters.genreId === g.mal_id}
              onToggle={() => setGenreId(filters.genreId === g.mal_id ? null : g.mal_id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  const pagination = (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="secondary"
        size="sm"
        disabled={filters.page === 1}
        onClick={() => setPage(filters.page - 1)}
      >
        <IconChevronLeft size={16} />
        Anterior
      </Button>
      <span className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-1.5 text-sm text-gray-300">
        Página {filters.page}
      </span>
      <Button
        variant="secondary"
        size="sm"
        disabled={!data?.pagination.has_next_page}
        onClick={() => setPage(filters.page + 1)}
      >
        Siguiente
        <IconChevronRight size={16} />
      </Button>
    </div>
  );

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <ErrorMessage
        message={error instanceof Error ? error.message : 'Error al cargar los animes'}
        onRetry={() => refetch()}
      />
    );
  } else if (data?.data.length === 0) {
    content = (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 border border-gray-700">
          <IconTv size={28} className="text-gray-500" />
        </div>
        <p className="text-gray-400">No se encontraron resultados para tu búsqueda.</p>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data?.data.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onSelect={(id) => navigate(`/anime/${id}`)}
            isFavorite={isFavorite(anime.mal_id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    );
  }

  return (
    <ListLayout header={header} filters={filtersSection} pagination={pagination}>
      {content}
    </ListLayout>
  );
}