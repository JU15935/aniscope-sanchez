import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from '@/core/providers/query-provider';
import { router } from './router';

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}