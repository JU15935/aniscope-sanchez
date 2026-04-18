import { useParams, useNavigate } from 'react-router-dom';
import { useAnimeDetail } from '@/modules/anime/hooks/use-anime-detail';
import { useFavorites } from '@/modules/favorites/hooks/use-favorites';
import {
  Badge,
  Button,
  ErrorMessage,
  Skeleton,
  DetailLayout,
  IconHeart,
  IconStar,
  IconArrowLeft,
  IconTv,
} from '@/design';

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = id !== undefined && !isNaN(Number(id)) ? Number(id) : null;
  const { data, isLoading, isError, error } = useAnimeDetail(numericId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (numericId === null) {
    return (
      <DetailLayout>
        <ErrorMessage message="ID de anime inválido." />
      </DetailLayout>
    );
  }

  if (isLoading) {
    return (
      <DetailLayout>
        <Skeleton className="mb-6 h-8 w-24" />
        <div className="flex flex-col gap-6 md:flex-row">
          <Skeleton className="h-96 w-64 shrink-0 rounded-xl" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </DetailLayout>
    );
  }

  if (isError || !data) {
    return (
      <DetailLayout>
        <ErrorMessage
          message={error instanceof Error ? error.message : 'Error al cargar el anime'}
          onRetry={() => navigate(-1)}
        />
      </DetailLayout>
    );
  }

  return (
    <DetailLayout>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
        <IconArrowLeft size={16} />
        Volver
      </Button>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Poster */}
        <div className="shrink-0 flex flex-col gap-3">
          <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/50">
            <img
              src={data.images.jpg.large_image_url}
              alt={data.title}
              className="w-full md:w-64 object-cover"
            />
          </div>
          <Button
            variant={isFavorite(data.mal_id) ? 'primary' : 'secondary'}
            className="w-full"
            onClick={() => toggleFavorite(data)}
          >
            <IconHeart size={16} filled={isFavorite(data.mal_id)} />
            {isFavorite(data.mal_id) ? 'En favoritos' : 'Agregar a favoritos'}
          </Button>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold text-white leading-tight">{data.title}</h1>
            {data.title_english && data.title_english !== data.title && (
              <p className="mt-1 text-gray-400 text-lg">{data.title_english}</p>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="status" label={data.status} status={data.status} />
            {data.season && (
              <Badge variant="season" label={`${data.season} ${data.year ?? ''}`} />
            )}
            {data.genres.map((g) => (
              <Badge key={g.mal_id} variant="genre" label={g.name} />
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {data.score !== null && (
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Score</p>
                <div className="flex items-center gap-1.5">
                  <IconStar size={18} filled className="text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">{data.score.toFixed(1)}</span>
                </div>
              </div>
            )}
            {data.episodes !== null && (
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Episodios</p>
                <div className="flex items-center gap-1.5">
                  <IconTv size={18} className="text-purple-400" />
                  <span className="text-2xl font-bold text-white">{data.episodes}</span>
                </div>
              </div>
            )}
            {data.year !== null && (
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Año</p>
                <span className="text-2xl font-bold text-white">{data.year}</span>
              </div>
            )}
          </div>

          {/* Sinopsis */}
          {data.synopsis && (
            <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-4">
              <h2 className="mb-2 text-sm font-semibold text-gray-300 uppercase tracking-wider">Sinopsis</h2>
              <p className="text-sm leading-relaxed text-gray-400">{data.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </DetailLayout>
  );
}