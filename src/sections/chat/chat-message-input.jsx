import { useRef, useMemo, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { uuidv4 } from '~/utils/uuidv4';
import { fSub, today } from '~/utils/format-time';

import { sendMessage, createConversation } from '~/actions/chat';

import { Iconify } from '~/components/iconify';

import { useMockedUser } from '~/auth/hooks';

// ----------------------------------------------------------------------

export function ChatMessageInput({ disabled, recipients, onAddRecipients, selectedConversationId }) {
    const router = useRouter();

    const { user } = useMockedUser();

    const fileRef = useRef(null);

    const [message, setMessage] = useState('');

    const myContact = useMemo(
        () => ({
            id: `${user?.id}`,
            role: `${user?.role}`,
            email: `${user?.email}`,
            address: `${user?.address}`,
            name: `${user?.displayName}`,
            lastActivity: today(),
            avatarUrl: `${user?.photoURL}`,
            phoneNumber: `${user?.phoneNumber}`,
            status: 'online',
        }),
        [user],
    );

    const messageData = useMemo(
        () => ({
            id: uuidv4(),
            attachments: [],
            body: message,
            contentType: 'text',
            createdAt: fSub({ minutes: 1 }),
            senderId: myContact.id,
        }),
        [message, myContact.id],
    );

    const conversationData = useMemo(
        () => ({
            id: uuidv4(),
            messages: [messageData],
            participants: [...recipients, myContact],
            type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
            unreadCount: 0,
        }),
        [messageData, myContact, recipients],
    );

    const handleAttach = useCallback(() => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }, []);

    const handleChangeMessage = useCallback((event) => {
        setMessage(event.target.value);
    }, []);

    const handleSendMessage = useCallback(
        async (event) => {
            try {
                if (event.key === 'Enter') {
                    if (message) {
                        if (selectedConversationId) {
                            await sendMessage(selectedConversationId, messageData);
                        } else {
                            const res = await createConversation(conversationData);

                            router.push(`${paths.dashboard.chat}?id=${res.conversation.id}`);

                            onAddRecipients([]);
                        }
                    }
                    setMessage('');
                }
            } catch (error) {
                console.error(error);
            }
        },
        [conversationData, message, messageData, onAddRecipients, router, selectedConversationId],
    );

    return (
        <>
            <InputBase
                name="chat-message"
                id="chat-message-input"
                value={message}
                onKeyUp={handleSendMessage}
                onChange={handleChangeMessage}
                placeholder="Type a message"
                disabled={disabled}
                startAdornment={
                    <IconButton>
                        <Iconify icon="eva:smiling-face-fill" />
                    </IconButton>
                }
                endAdornment={
                    <Stack direction="row" sx={{ flexShrink: 0 }}>
                        <IconButton onClick={handleAttach}>
                            <Iconify icon="solar:gallery-add-bold" />
                        </IconButton>
                        <IconButton onClick={handleAttach}>
                            <Iconify icon="eva:attach-2-fill" />
                        </IconButton>
                        <IconButton>
                            <Iconify icon="solar:microphone-bold" />
                        </IconButton>
                    </Stack>
                }
                sx={{
                    px: 1,
                    height: 56,
                    flexShrink: 0,
                    borderTop: (theme) => `solid 1px ${theme.vars.palette.divider}`,
                }}
            />

            <input type="file" ref={fileRef} style={{ display: 'none' }} />
        </>
    );
}
