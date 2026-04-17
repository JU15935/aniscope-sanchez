import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/modules/favorites/hooks/use-favorites';
import { AnimeCard, Button, DetailLayout } from '@/design';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();

  return (
    <DetailLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">❤️ Mis Favoritos</h1>
          <p className="mt-1 text-sm text-gray-400">{favorites.length} anime guardados</p>
        </div>
        <div className="flex gap-2">
          {favorites.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFavorites}>
              Limpiar todo
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={() => navigate('/')}>
            ← Explorar
          </Button>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <span className="text-5xl">💔</span>
          <p className="text-gray-400">No tienes favoritos guardados aún.</p>
          <Button onClick={() => navigate('/')}>Explorar anime</Button>
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