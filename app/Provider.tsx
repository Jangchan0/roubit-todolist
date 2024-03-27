'use client';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { configureStore } from '@/store/configureStore';
import Head from 'next/head';

const store = configureStore();

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Head>
                <title>dante</title>
            </Head>
            {children}
        </Provider>
    );
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Providers;
