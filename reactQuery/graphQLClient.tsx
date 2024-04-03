import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = () => {
    const endpoint = 'http://localhost:8080/graphql';
    const token = localStorage.getItem('todoAccessToken') || undefined;
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    const client = new GraphQLClient(endpoint, {
        credentials: 'include',
    });

    client.setHeaders(headers);

    return client;
};
