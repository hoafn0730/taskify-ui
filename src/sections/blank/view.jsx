import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varAlpha } from '~/theme/styles';
import { DashboardContent } from '~/layouts/dashboard';

// ----------------------------------------------------------------------

export function BlankView({ title = 'Blank' }) {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        }}
      />
    </DashboardContent>
  );
}
