import { useState, useEffect, useCallback } from 'react';

import Typography from '@mui/material/Typography';

import { paths } from '~/configs/paths';
import { useRouter, useSearchParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';
import { DashboardContent } from '~/layouts/dashboard';
import { useGetContacts, useGetConversation, useGetConversations } from '~/actions/chat';

import { EmptyContent } from '~/components/empty-content';

import { useMockedUser } from '~/auth/hooks';

import { Layout } from '../layout';
import { ChatNav } from '../chat-nav';
import { ChatRoom } from '../chat-room';
import { ChatMessageList } from '../chat-message-list';
import { ChatMessageInput } from '../chat-message-input';
import { ChatHeaderDetail } from '../chat-header-detail';
import { ChatHeaderCompose } from '../chat-header-compose';
import { useCollapseNav } from '../hooks/use-collapse-nav';

// ----------------------------------------------------------------------

export function ChatView() {
    const router = useRouter();

    const { user } = useMockedUser();

    const { contacts } = useGetContacts();

    const searchParams = useSearchParams();

    const selectedConversationId = searchParams.get('id') || '';

    const [recipients, setRecipients] = useState([]);

    const { conversations, conversationsLoading } = useGetConversations();

    const { conversation, conversationError, conversationLoading } = useGetConversation(`${selectedConversationId}`);

    const roomNav = useCollapseNav();

    const conversationsNav = useCollapseNav();

    const participants = conversation
        ? conversation.participants.filter((participant) => participant.id !== `${user?.id}`)
        : [];

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
                            loading={conversationLoading}
                        />
                    ) : (
                        <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
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
                            participants={participants}
                            loading={conversationLoading}
                            messages={conversation?.messages ?? []}
                        />
                    ),
                }}
            />
        </DashboardContent>
    );
}
