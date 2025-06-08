import { useRef, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { uuidv4 } from '~/utils/uuidv4';
import { fSub, today } from '~/utils/format-time';

import { sendMessage } from '~/actions/chat';

import { Iconify } from '~/components/iconify';

import { useSocket } from '~/hooks/use-socket';
import { conversationService } from '~/services/conversationService';

// ----------------------------------------------------------------------

export function ChatMessageInput({ disabled, recipients, onAddRecipients, selectedConversationId }) {
    const router = useRouter();
    const { emit } = useSocket();

    const { user } = useSelector((state) => state.user);

    const fileRef = useRef(null);

    const [message, setMessage] = useState('');

    const myContact = useMemo(
        () => ({
            id: user?.id,
            role: `${user?.role}`,
            email: `${user?.email}`,
            address: `${user?.address}`,
            displayName: `${user?.displayName}`,
            lastActivity: today(),
            avatar: `${user?.photoURL}`,
            phoneNumber: `${user?.phoneNumber}`,
            status: 'online',
        }),
        [user],
    );

    const messageData = useMemo(
        () => ({
            id: uuidv4(),
            attachments: [],
            content: message,
            contentType: 'text',
            createdAt: fSub({ minutes: 1 }),
            senderId: myContact.id,
        }),
        [message, myContact.id],
    );

    const conversationData = useMemo(
        () => ({
            messages: [messageData],
            participants: [...recipients.map((user) => user.id), myContact.id],
            type: recipients.length > 1 ? 'group' : 'private',
            title: recipients.map((user) => user.displayName).join(', '),
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
                            emit('sendMessage', {
                                conversationId: selectedConversationId,
                                content: message.trim(),
                                contentType: 'text',
                            });

                            await sendMessage(selectedConversationId, messageData);
                        } else {
                            const res = await conversationService.createConversation(conversationData);

                            router.push(`${paths.dashboard.chat}?id=${res.data.id}`);

                            onAddRecipients([]);
                        }
                    }
                    setMessage('');
                }
            } catch (error) {
                console.error(error);
            }
        },
        [conversationData, emit, message, messageData, onAddRecipients, router, selectedConversationId],
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
                        <IconButton
                            onClick={async () => {
                                if (message) {
                                    if (selectedConversationId) {
                                        emit('sendMessage', {
                                            conversationId: selectedConversationId,
                                            content: message.trim(),
                                            contentType: 'text',
                                        });

                                        await sendMessage(selectedConversationId, messageData);
                                    } else {
                                        const res = await conversationService.createConversation(conversationData);

                                        router.push(`${paths.dashboard.chat}?id=${res.data.id}`);

                                        onAddRecipients([]);
                                    }
                                }
                                setMessage('');
                            }}
                        >
                            <Iconify icon="solar:plain-bold" />
                        </IconButton>
                        {/* <IconButton onClick={handleAttach}>
                            <Iconify icon="solar:gallery-add-bold" />
                        </IconButton> */}
                        {/* <IconButton onClick={handleAttach}>
                            <Iconify icon="eva:attach-2-fill" />
                        </IconButton>
                        <IconButton>
                            <Iconify icon="solar:microphone-bold" />
                        </IconButton> */}
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
