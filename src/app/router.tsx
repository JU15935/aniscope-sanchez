import { createBrowserRouter } from 'react-router-dom';
import { LazyAnimeListPage, LazyAnimeDetailPage, LazyFavoritesPage } from './lazy-pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyAnimeListPage />,
  },
  {
    path: '/anime/:id',
    element: <LazyAnimeDetailPage />,
  },
  {
    path: '/favorites',
    element: <LazyFavoritesPage />,
  },
]);