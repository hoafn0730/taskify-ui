import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import { Scrollbar } from '~/components/scrollbar';
import { Lightbox, useLightBox } from '~/components/lightbox';

import { ChatMessageItem } from './chat-message-item';
import { useMessagesScroll } from './hooks/use-messages-scroll';

// ----------------------------------------------------------------------

export function ChatMessageList({ messages = [], participants, loading }) {
    const { messagesEndRef } = useMessagesScroll(messages);

    const slides = messages
        .filter((message) => message.contentType === 'image')
        .map((message) => ({ src: message.content }));

    const lightbox = useLightBox(slides);

    if (loading) {
        return (
            <Stack sx={{ flex: '1 1 auto', position: 'relative' }}>
                <LinearProgress
                    color="inherit"
                    sx={{
                        top: 0,
                        left: 0,
                        width: 1,
                        height: 2,
                        borderRadius: 0,
                        position: 'absolute',
                    }}
                />
            </Stack>
        );
    }

    return (
        <>
            <Scrollbar ref={messagesEndRef} sx={{ px: 3, pt: 5, pb: 3, flex: '1 1 auto' }}>
                {messages.map((message) => (
                    <ChatMessageItem
                        key={message.id}
                        message={message}
                        participants={participants}
                        onOpenLightbox={() => lightbox.onOpen(message.content)}
                    />
                ))}
            </Scrollbar>

            <Lightbox slides={slides} open={lightbox.open} close={lightbox.onClose} index={lightbox.selected} />
        </>
    );
}
