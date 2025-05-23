import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { varAlpha } from '~/theme/styles';

// ----------------------------------------------------------------------

export function MailNavItemSkeleton({ amount = 6, sx, ...other }) {
  return [...Array(amount)].map((_, index) => (
    <Stack
      key={index}
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{ py: 1, color: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.24), ...sx }}
      {...other}
    >
      <Skeleton variant="circular" sx={{ width: 32, height: 32, bgcolor: 'currentColor' }} />

      <Skeleton sx={{ width: 0.5, height: 10, bgcolor: 'currentColor' }} />
    </Stack>
  ));
}

// ----------------------------------------------------------------------

export function MailItemSkeleton({ amount = 6, sx, ...other }) {
  return [...Array(amount)].map((_, index) => (
    <Stack
      key={index}
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{ py: 1, ...sx }}
      {...other}
    >
      <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />

      <Stack spacing={1} flexGrow={1}>
        <Skeleton sx={{ width: 0.75, height: 10 }} />
        <Skeleton sx={{ width: 0.5, height: 10 }} />
      </Stack>
    </Stack>
  ));
}
