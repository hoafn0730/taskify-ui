import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';

import { Scrollbar } from '~/components/scrollbar';

import { ChatRoomGroup } from './chat-room-group';
import { ChatRoomSkeleton } from './chat-skeleton';
import { ChatRoomSingle } from './chat-room-single';
import { ChatRoomAttachments } from './chat-room-attachments';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const NAV_DRAWER_WIDTH = 320;

export function ChatRoom({ collapseNav, participants, messages, type, loading }) {
    const theme = useTheme();

    const { collapseDesktop, openMobile, onCloseMobile } = collapseNav;

    const group = participants?.length > 1 && type === 'group';

    const attachments = messages.map((msg) => msg.attachments).flat(1) || [];

    const renderContent = loading ? (
        <ChatRoomSkeleton />
    ) : (
        <Scrollbar>
            <div>
                {group ? (
                    <ChatRoomGroup participants={participants} />
                ) : (
                    <ChatRoomSingle participant={participants?.[0]} />
                )}

                <ChatRoomAttachments attachments={attachments} />
            </div>
        </Scrollbar>
    );

    return (
        <>
            <Stack
                sx={{
                    minHeight: 0,
                    flex: '1 1 auto',
                    width: NAV_WIDTH,
                    display: { xs: 'none', lg: 'flex' },
                    borderLeft: `solid 1px ${theme.vars.palette.divider}`,
                    transition: theme.transitions.create(['width'], {
                        duration: theme.transitions.duration.shorter,
                    }),
                    ...(collapseDesktop && { width: 0 }),
                }}
            >
                {!collapseDesktop && renderContent}
            </Stack>

            <Drawer
                anchor="right"
                open={openMobile}
                onClose={onCloseMobile}
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: NAV_DRAWER_WIDTH } }}
            >
                {renderContent}
            </Drawer>
        </>
    );
}
