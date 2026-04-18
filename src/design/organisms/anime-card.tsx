import { Badge } from '@/design/atoms/badge';
import { IconHeart, IconStar } from '@/design/atoms/icon';
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
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1">

      {/* Botón favorito */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(anime);
          }}
          className={`absolute right-2 top-2 z-10 rounded-full p-2 transition-all duration-200 hover:scale-110 ${
            isFavorite
              ? 'bg-red-500/90 text-white shadow-lg shadow-red-900/40'
              : 'bg-gray-900/80 text-gray-400 hover:bg-red-500/80 hover:text-white'
          }`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <IconHeart size={14} filled={isFavorite} />
        </button>
      )}

      {/* Imagen */}
      <button
        onClick={() => onSelect(anime.mal_id)}
        className="cursor-pointer overflow-hidden"
        aria-label={`Ver detalle de ${anime.title}`}
      >
        <div className="relative">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <button onClick={() => onSelect(anime.mal_id)} className="text-left">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-100 hover:text-purple-300 transition-colors leading-snug">
            {anime.title}
          </h3>
          {anime.title_english && anime.title_english !== anime.title && (
            <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
              {anime.title_english}
            </p>
          )}
        </button>

        {/* Score + Estado */}
        <div className="flex items-center gap-2 flex-wrap">
          {anime.score !== null && (
            <span className="flex items-center gap-1 text-xs font-bold text-yellow-400">
              <IconStar size={12} filled className="text-yellow-400" />
              {anime.score.toFixed(1)}
            </span>
          )}
          <Badge variant="status" label={anime.status} status={anime.status} />
        </div>

        {/* Géneros */}
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