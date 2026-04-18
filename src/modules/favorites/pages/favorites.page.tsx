import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/modules/favorites/hooks/use-favorites';
import {
  AnimeCard,
  Button,
  DetailLayout,
  IconHeart,
  IconCompass,
  IconTrash,
  IconArrowLeft,
} from '@/design';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();

  return (
    <DetailLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/80 shadow-lg shadow-red-900/40">
            <IconHeart size={20} className="text-white" filled />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Mis Favoritos</h1>
            <p className="text-xs text-gray-400">
              {favorites.length === 0
                ? 'No tienes favoritos aún'
                : `${favorites.length} anime${favorites.length !== 1 ? 's' : ''} guardado${favorites.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {favorites.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFavorites}>
              <IconTrash size={14} />
              <span className="hidden sm:inline">Limpiar</span>
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={() => navigate('/')}>
            <IconArrowLeft size={14} />
            <span className="hidden sm:inline">Explorar</span>
          </Button>
        </div>
      </div>

      {/* Estado vacío */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-700 bg-gray-800">
              <IconHeart size={40} className="text-gray-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 border border-gray-600">
              <IconCompass size={14} className="text-gray-400" />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-300">No hay favoritos aún</p>
            <p className="mt-1 text-sm text-gray-500">Explora el catálogo y guarda los que más te gusten.</p>
          </div>
          <Button onClick={() => navigate('/')}>
            <IconCompass size={16} />
            Explorar anime
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {favorites.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              onSelect={(id) => navigate(`/anime/${id}`)}
              isFavorite={isFavorite(anime.mal_id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </DetailLayout>
  );
}