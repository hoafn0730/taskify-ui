import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { keyBy } from '~/utils/helper';
import axios, { endpoints, fetcher1 } from '~/utils/axios';

// ----------------------------------------------------------------------

const enableServer = false;

const CHART_ENDPOINT = endpoints.chat;

const swrOptions = {
    revalidateIfStale: enableServer,
    revalidateOnFocus: enableServer,
    revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetContacts() {
    // const url = [CHART_ENDPOINT, { params: { endpoint: 'contacts' } }];
    const url = import.meta.env.VITE_SERVER_BE_URL + '/api/v1/users/online';

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            contacts: data?.data || [],
            contactsLoading: isLoading,
            contactsError: error,
            contactsValidating: isValidating,
            contactsEmpty: !isLoading && !data?.data.length,
        }),
        [data?.data, error, isLoading, isValidating],
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetConversations() {
    // const url = [CHART_ENDPOINT, { params: { endpoint: 'conversations' } }];
    const url = import.meta.env.VITE_SERVER_BE_URL + '/api/v1/conversations';

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(() => {
        const byId = data?.data.length ? keyBy(data.data, 'id') : {};
        const allIds = Object.keys(byId);

        return {
            conversations: { byId, allIds },
            conversationsLoading: isLoading,
            conversationsError: error,
            conversationsValidating: isValidating,
            conversationsEmpty: !isLoading && !allIds.length,
        };
    }, [data?.data, error, isLoading, isValidating]);

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetConversation(conversationId) {
    const url = import.meta.env.VITE_SERVER_BE_URL + '/api/v1/conversations';
    // const url = conversationId ? [CHART_ENDPOINT, { params: { conversationId, endpoint: 'conversation' } }] : '';

    const { data, isLoading, error, isValidating } = useSWR(url + '/' + conversationId, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            conversation: data?.data,
            conversationLoading: isLoading,
            conversationError: error,
            conversationValidating: isValidating,
        }),
        [data?.data, error, isLoading, isValidating],
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export async function sendMessage(conversationId, messageData) {
    const conversationsUrl = import.meta.env.VITE_SERVER_BE_URL + '/api/v1/conversations';

    const conversationUrl = conversationsUrl + '/' + conversationId;

    /**
     * Work in local
     */
    mutate(
        conversationUrl,
        (currentData) => {
            const currentConversation = currentData.data;

            const conversation = {
                ...currentConversation,
                messages: [...currentConversation.messages, messageData],
            };

            return { ...currentData, data: conversation };
        },
        false,
    );

    mutate(
        conversationsUrl,
        (currentData) => {
            const currentConversations = currentData.data;

            const conversations = currentConversations.map((conversation) =>
                conversation.id === +conversationId
                    ? { ...conversation, messages: [...conversation.messages, messageData] }
                    : conversation,
            );

            return { ...currentData, data: conversations };
        },
        false,
    );
}

// ----------------------------------------------------------------------

export async function createConversation(conversationData) {
    const url = [CHART_ENDPOINT, { params: { endpoint: 'conversations' } }];

    /**
     * Work on server
     */
    const data = { conversationData };
    const res = await axios.post(CHART_ENDPOINT, data);

    /**
     * Work in local
     */
    mutate(
        url,
        (currentData) => {
            const currentConversations = currentData.conversations;

            const conversations = [...currentConversations, conversationData];

            return { ...currentData, conversations };
        },
        false,
    );

    return res.data;
}

// ----------------------------------------------------------------------

export async function clickConversation(conversationId) {
    /**
     * Work on server
     */
    if (enableServer) {
        await axios.get(CHART_ENDPOINT, { params: { conversationId, endpoint: 'mark-as-seen' } });
    }

    /**
     * Work in local
     */
    mutate(
        [CHART_ENDPOINT, { params: { endpoint: 'conversations' } }],
        (currentData) => {
            const currentConversations = currentData.conversations;

            const conversations = currentConversations.map((conversation) =>
                conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation,
            );

            return { ...currentData, conversations };
        },
        false,
    );
}
