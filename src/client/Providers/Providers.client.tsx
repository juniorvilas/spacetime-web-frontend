'use client';

import { queryClientOptions } from '@/utils/queryClientOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { ToastContainer } from 'react-toastify';




export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));
     
      
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />       
          <ToastContainer />
          {children}     
    </QueryClientProvider>
  );
}