import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

import { fPercent, fCurrency } from '~/utils/format-number';

import { varAlpha } from '~/theme/styles';

// ----------------------------------------------------------------------

export function EcommerceSalesOverview({ title, subheader, data, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ gap: 4, px: 3, py: 4, display: 'flex', flexDirection: 'column' }}>
        {data.map((progress) => (
          <Item key={progress.label} progress={progress} />
        ))}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function Item({ progress }) {
  return (
    <div>
      <Box sx={{ mb: 1, gap: 0.5, display: 'flex', alignItems: 'center', typography: 'subtitle2' }}>
        <Box component="span" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Box>
        <Box component="span">{fCurrency(progress.totalAmount)}</Box>
        <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
          ({fPercent(progress.value)})
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Total income' && 'info') ||
          (progress.label === 'Total expenses' && 'warning') ||
          'primary'
        }
        sx={{
          height: 8,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
        }}
      />
    </div>
  );
}
