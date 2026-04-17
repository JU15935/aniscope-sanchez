import { useParams, useNavigate } from 'react-router-dom';
import { useAnimeDetail } from '@/modules/anime/hooks/use-anime-detail';
import { useFavorites } from '@/modules/favorites/hooks/use-favorites';
import { Badge, Button, ErrorMessage, Skeleton, DetailLayout } from '@/design';

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
        <div className="flex flex-col gap-6 md:flex-row">
          <Skeleton className="h-96 w-64 shrink-0" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
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
        ← Volver
      </Button>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="shrink-0">
          <img
            src={data.images.jpg.large_image_url}
            alt={data.title}
            className="w-64 rounded-xl object-cover shadow-lg"
          />
          <Button
            variant={isFavorite(data.mal_id) ? 'primary' : 'secondary'}
            className="mt-4 w-full"
            onClick={() => toggleFavorite(data)}
          >
            {isFavorite(data.mal_id) ? '❤️ En favoritos' : '🤍 Agregar a favoritos'}
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{data.title}</h1>
            {data.title_english && data.title_english !== data.title && (
              <p className="mt-1 text-gray-400">{data.title_english}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="status" label={data.status} status={data.status} />
            {data.season && (
              <Badge variant="season" label={`${data.season} ${data.year ?? ''}`} />
            )}
            {data.genres.map((g) => (
              <Badge key={g.mal_id} variant="genre" label={g.name} />
            ))}
          </div>

          <div className="flex gap-6 text-sm">
            {data.score !== null && (
              <div>
                <p className="text-gray-500">Score</p>
                <p className="text-xl font-bold text-yellow-400">⭐ {data.score.toFixed(1)}</p>
              </div>
            )}
            {data.episodes !== null && (
              <div>
                <p className="text-gray-500">Episodios</p>
                <p className="text-xl font-bold text-white">{data.episodes}</p>
              </div>
            )}
            {data.year !== null && (
              <div>
                <p className="text-gray-500">Año</p>
                <p className="text-xl font-bold text-white">{data.year}</p>
              </div>
            )}
          </div>

          {data.synopsis && (
            <div>
              <h2 className="mb-2 font-semibold text-gray-300">Sinopsis</h2>
              <p className="text-sm leading-relaxed text-gray-400">{data.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </DetailLayout>
  );
}