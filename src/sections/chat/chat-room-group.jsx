import { useState, useCallback } from 'react';

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useBoolean } from '~/hooks/use-boolean';

import { CollapseButton } from './styles';
import { ChatRoomParticipantDialog } from './chat-room-participant-dialog';

// ----------------------------------------------------------------------

export function ChatRoomGroup({ participants }) {
    const collapse = useBoolean(true);

    const [selected, setSelected] = useState(null);

    const handleOpen = useCallback((participant) => {
        setSelected(participant);
    }, []);

    const handleClose = useCallback(() => {
        setSelected(null);
    }, []);

    const totalParticipants = participants?.length;

    const renderList = (
        <>
            {participants &&
                participants.map((participant) => (
                    <ListItemButton key={participant.id} onClick={() => handleOpen(participant)}>
                        <Badge variant={participant.status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                            <Avatar alt={participant.displayName} src={participant.avatar} />
                        </Badge>

                        <ListItemText
                            sx={{ ml: 2 }}
                            primary={participant.displayName}
                            secondary={participant.role}
                            primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
                            secondaryTypographyProps={{ noWrap: true, component: 'span', typography: 'caption' }}
                        />
                    </ListItemButton>
                ))}
        </>
    );

    return (
        <>
            <CollapseButton selected={collapse.value} disabled={!totalParticipants} onClick={collapse.onToggle}>
                {`In room (${totalParticipants})`}
            </CollapseButton>

            <Collapse in={collapse.value}>{renderList}</Collapse>

            {selected && <ChatRoomParticipantDialog participant={selected} open={!!selected} onClose={handleClose} />}
        </>
    );
}
