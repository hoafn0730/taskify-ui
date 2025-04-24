import { forwardRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Transition = forwardRef((props, ref) => <Grow ref={ref} {...props} />);

export function KanbanDialog({ dialog }) {
    return (
        <>
            <Dialog open={dialog.value} onClose={dialog.onFalse} TransitionComponent={Transition} scroll={'body'}>
                <DialogTitle sx={{ pb: 2 }}>New Kanban</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 3 }}>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </Typography>

                    <TextField
                        autoFocus
                        fullWidth
                        type="email"
                        margin="dense"
                        variant="outlined"
                        label="Email address"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
                        Cancel
                    </Button>

                    <Button variant="contained" onClick={dialog.onFalse}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
