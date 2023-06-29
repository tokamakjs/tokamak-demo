import { Outlet } from '@tokamakjs/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export function RootView() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
