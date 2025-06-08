import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';

import { paths } from '~/configs/paths';
import { useRouter, useSearchParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';
import { DashboardContent } from '~/layouts/dashboard';
import { sendMessage, useGetContacts, useGetConversation, useGetConversations } from '~/actions/chat';

import { EmptyContent } from '~/components/empty-content';

import { Layout } from '../layout';
import { ChatNav } from '../chat-nav';
import { ChatRoom } from '../chat-room';
import { ChatMessageList } from '../chat-message-list';
import { ChatMessageInput } from '../chat-message-input';
import { ChatHeaderDetail } from '../chat-header-detail';
import { ChatHeaderCompose } from '../chat-header-compose';
import { useCollapseNav } from '../hooks/use-collapse-nav';
import { useSocket, useSocketEvent } from '~/hooks/use-socket';

export function ChatView() {
    const router = useRouter();

    const { user } = useSelector((state) => state.user);

    const { emit, on, off } = useSocket();

    const { contacts } = useGetContacts();

    const searchParams = useSearchParams();

    const [recipients, setRecipients] = useState([]);

    const { conversations, conversationsLoading } = useGetConversations();

    const selectedConversationId = searchParams.get('id') || '';

    const { conversation, conversationError, conversationLoading } = useGetConversation(selectedConversationId || 1);

    const roomNav = useCollapseNav();

    const conversationsNav = useCollapseNav();

    const participants = conversation
        ? conversation?.participants?.filter((participant) => participant.id !== user?.id)
        : [];

    useEffect(() => {
        // Setup message listener
        if (conversation) {
            emit('joinConversation', { conversationId: conversation?.id });
        }

        // Cleanup
    }, [on, off, emit, conversation]);

    // ✅ Listen events với useSocketEvent
    useSocketEvent('newMessage', async (message) => {
        await sendMessage(conversation.id, message);
    });

    useEffect(() => {
        if (conversationError || !selectedConversationId) {
            router.push(paths.dashboard.chat);
        }
    }, [conversationError, router, selectedConversationId]);

    const handleAddRecipients = useCallback((selected) => {
        setRecipients(selected);
    }, []);

    return (
        <DashboardContent maxWidth={false} sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Chat
            </Typography>

            <Layout
                sx={{
                    minHeight: 0,
                    flex: '1 1 0',
                    borderRadius: 2,
                    position: 'relative',
                    bgcolor: 'background.paper',
                    boxShadow: (theme) => theme.customShadows.card,
                }}
                slots={{
                    header: selectedConversationId ? (
                        <ChatHeaderDetail
                            collapseNav={roomNav}
                            participants={participants}
                            type={conversation?.type}
                            loading={conversationLoading}
                        />
                    ) : (
                        <ChatHeaderCompose
                            contacts={contacts.filter((c) => c.id !== user?.id)}
                            onAddRecipients={handleAddRecipients}
                        />
                    ),
                    nav: (
                        <ChatNav
                            contacts={contacts}
                            conversations={conversations}
                            loading={conversationsLoading}
                            selectedConversationId={selectedConversationId}
                            collapseNav={conversationsNav}
                        />
                    ),
                    main: (
                        <>
                            {selectedConversationId ? (
                                <ChatMessageList
                                    messages={conversation?.messages ?? []}
                                    participants={participants}
                                    loading={conversationLoading}
                                />
                            ) : (
                                <EmptyContent
                                    imgUrl={`${CONFIG.site.basePath}/assets/icons/empty/ic-chat-active.svg`}
                                    title="Good morning!"
                                    description="Write something awesome..."
                                />
                            )}

                            <ChatMessageInput
                                recipients={recipients}
                                onAddRecipients={handleAddRecipients}
                                selectedConversationId={selectedConversationId}
                                disabled={!recipients.length && !selectedConversationId}
                            />
                        </>
                    ),
                    details: selectedConversationId && (
                        <ChatRoom
                            collapseNav={roomNav}
                            participants={conversation?.participants}
                            type={conversation?.type}
                            loading={conversationLoading}
                            messages={conversation?.messages ?? []}
                        />
                    ),
                }}
            />
        </DashboardContent>
    );
}
