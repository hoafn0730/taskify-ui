import { forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from '~/theme/styles';

import { Iconify } from '~/components/iconify';

export const IncrementerButton = forwardRef(
  ({ quantity, onIncrease, onDecrease, disabledIncrease, disabledDecrease, sx, ...other }, ref) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 0.5,
        width: 88,
        borderRadius: 1,
        typography: 'subtitle2',
        border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ borderRadius: 0.75 }}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </IconButton>

      {quantity}

      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ borderRadius: 0.75 }}
      >
        <Iconify icon="mingcute:add-line" width={16} />
      </IconButton>
    </Stack>
  )
);
