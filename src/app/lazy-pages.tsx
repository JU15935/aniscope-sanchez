import { Suspense, lazy } from 'react';
import { Skeleton } from '@/design';

const AnimeListPage = lazy(() =>
  import('@/modules/anime/pages/anime-list.page').then((m) => ({ default: m.AnimeListPage }))
);

const AnimeDetailPage = lazy(() =>
  import('@/modules/anime/pages/anime-detail.page').then((m) => ({ default: m.AnimeDetailPage }))
);

const FavoritesPage = lazy(() =>
  import('@/modules/favorites/pages/favorites.page').then((m) => ({ default: m.FavoritesPage }))
);

function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Skeleton className="h-8 w-48" />
    </div>
  );
}

export function LazyAnimeListPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimeListPage />
    </Suspense>
  );
}

export function LazyAnimeDetailPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimeDetailPage />
    </Suspense>
  );
}

export function LazyFavoritesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <FavoritesPage />
    </Suspense>
  );
}