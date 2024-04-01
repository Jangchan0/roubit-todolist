'use client';
import { Provider } from 'react-redux';
import { configureStore } from '@/store/configureStore';

const store = configureStore();

function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers;
