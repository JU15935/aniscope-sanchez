import { Badge } from '@/design/atoms/badge';
import type { Anime } from '@/modules/anime/types';

interface AnimeCardProps {
  anime: Anime;
  onSelect: (id: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (anime: Anime) => void;
}

export function AnimeCard({
  anime,
  onSelect,
  isFavorite = false,
  onToggleFavorite,
}: AnimeCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-800 transition-all duration-200 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-900/20 hover:-translate-y-0.5">
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(anime);
          }}
          className="absolute right-2 top-2 z-10 rounded-full bg-gray-900/80 p-1.5 text-lg transition-transform hover:scale-110"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}

      <button
        onClick={() => onSelect(anime.mal_id)}
        className="cursor-pointer overflow-hidden"
        aria-label={`Ver detalle de ${anime.title}`}
      >
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <button onClick={() => onSelect(anime.mal_id)} className="text-left">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-100 hover:text-purple-300 transition-colors">
            {anime.title}
          </h3>
          {anime.title_english && anime.title_english !== anime.title && (
            <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
              {anime.title_english}
            </p>
          )}
        </button>

        <div className="flex items-center gap-2">
          {anime.score !== null && (
            <span className="text-xs font-bold text-yellow-400">
              ⭐ {anime.score.toFixed(1)}
            </span>
          )}
          <Badge variant="status" label={anime.status} status={anime.status} />
        </div>

        {anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 3).map((g) => (
              <Badge key={g.mal_id} variant="genre" label={g.name} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}