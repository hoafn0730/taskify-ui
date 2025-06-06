import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from '~/components/iconify';
import { Scrollbar } from '~/components/scrollbar';

// ----------------------------------------------------------------------

export function BankingContacts({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          >
            View all
          </Button>
        }
      />

      <Scrollbar sx={{ minHeight: 364 }}>
        <Box
          sx={{
            p: 3,
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 360,
          }}
        >
          {list.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}

function Item({ item, sx, ...other }) {
  return (
    <Box key={item.id} sx={{ gap: 2, display: 'flex', alignItems: 'center', ...sx }} {...other}>
      <Avatar src={item.avatarUrl} />

      <ListItemText primary={item.name} secondary={item.email} />

      <Tooltip title="Quick transfer">
        <IconButton>
          <Iconify icon="solar:transfer-horizontal-bold-duotone" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
