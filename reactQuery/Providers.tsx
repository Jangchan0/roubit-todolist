'use client';

import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    const dehydratedState = dehydrate(queryClient);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
        </QueryClientProvider>
    );
}

export default Providers;
