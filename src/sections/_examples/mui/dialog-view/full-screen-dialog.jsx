import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useBoolean } from '~/hooks/use-boolean';

import { Iconify } from '~/components/iconify';

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ----------------------------------------------------------------------

export function FullScreenDialog() {
  const dialog = useBoolean();

  return (
    <>
      <Button variant="outlined" color="error" onClick={dialog.onTrue}>
        Full screen dialogs
      </Button>

      <Dialog
        fullScreen
        open={dialog.value}
        onClose={dialog.onFalse}
        TransitionComponent={Transition}
      >
        <AppBar position="relative" color="default">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={dialog.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>

            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              Sound
            </Typography>

            <Button autoFocus color="inherit" variant="contained" onClick={dialog.onFalse}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="ul">
          <Box component="li" sx={{ display: 'flex' }}>
            <ListItemButton>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItemButton>
          </Box>

          <Divider />

          <Box component="li" sx={{ display: 'flex' }}>
            <ListItemButton>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItemButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
