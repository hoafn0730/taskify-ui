import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useBoolean } from '~/hooks/use-boolean';

import { fDate } from '~/utils/format-time';

import { Iconify } from '~/components/iconify';

// ----------------------------------------------------------------------

export function PostCommentItem({ name, avatarUrl, message, tagUser, postedAt, hasReply }) {
  const reply = useBoolean();

  return (
    <Box
      sx={{
        pt: 3,
        display: 'flex',
        position: 'relative',
        ...(hasReply && { pl: 8 }),
      }}
    >
      <Avatar alt={name} src={avatarUrl} sx={{ mr: 2, width: 48, height: 48 }} />

      <Stack
        flexGrow={1}
        sx={{ pb: 3, borderBottom: (theme) => `solid 1px ${theme.vars.palette.divider}` }}
      >
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDate(postedAt)}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {tagUser && (
            <Box component="strong" sx={{ mr: 0.5 }}>
              @{tagUser}
            </Box>
          )}
          {message}
        </Typography>

        {reply.value && (
          <Box sx={{ mt: 2 }}>
            <TextField fullWidth autoFocus placeholder="Write comment..." />
          </Box>
        )}
      </Stack>

      {!hasReply && (
        <Button
          size="small"
          color={reply.value ? 'primary' : 'inherit'}
          startIcon={<Iconify icon="solar:pen-bold" width={16} />}
          onClick={reply.onToggle}
          sx={{ right: 0, position: 'absolute' }}
        >
          Reply
        </Button>
      )}
    </Box>
  );
}
