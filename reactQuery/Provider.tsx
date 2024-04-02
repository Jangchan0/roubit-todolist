'use client';
import { Provider } from 'react-redux';
import { configureStore } from '@/store/configureStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const store = configureStore();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            retry: 1,
        },
        mutations: {
            retry: 1,
        },
    },
});

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
    );
}

export default Providers;
