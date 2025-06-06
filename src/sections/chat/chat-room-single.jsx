import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { useBoolean } from '~/hooks/use-boolean';

import { Iconify } from '~/components/iconify';

import { CollapseButton } from './styles';
import { capitalizeFirstLetter } from '~/utils/formatters';

export function ChatRoomSingle({ participant }) {
    const collapse = useBoolean(true);

    const renderInfo = (
        <Stack alignItems="center" sx={{ py: 5 }}>
            <Avatar alt={participant?.displayName} src={participant?.avatar} sx={{ width: 96, height: 96, mb: 2 }} />
            <Typography variant="subtitle1">{participant?.displayName}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {capitalizeFirstLetter(participant?.role)}
            </Typography>
        </Stack>
    );

    const renderContact = (
        <Stack spacing={2} sx={{ px: 2, py: 2.5 }}>
            {[
                { icon: 'mingcute:location-fill', value: participant?.address },
                { icon: 'solar:phone-bold', value: participant?.phoneNumber },
                { icon: 'fluent:mail-24-filled', value: participant?.email },
            ].map((item) => (
                <Stack key={item.icon} spacing={1} direction="row" sx={{ typography: 'body2', wordBreak: 'break-all' }}>
                    <Iconify icon={item.icon} sx={{ flexShrink: 0, color: 'text.disabled' }} />
                    {item.value}
                </Stack>
            ))}
        </Stack>
    );

    return (
        <>
            {renderInfo}

            <CollapseButton selected={collapse.value} onClick={collapse.onToggle}>
                Information
            </CollapseButton>

            <Collapse in={collapse.value}>{renderContact}</Collapse>
        </>
    );
}
