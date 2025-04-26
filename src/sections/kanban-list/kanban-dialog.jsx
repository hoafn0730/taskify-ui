import { forwardRef } from 'react';

import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';

import { KanbanNewEditForm } from './kanban-new-edit-form';

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => <Grow ref={ref} {...props} />);

export function KanbanDialog({ dialog }) {
    return (
        <Dialog open={dialog.value} onClose={dialog.onFalse} TransitionComponent={Transition} scroll={'body'}>
            <KanbanNewEditForm onCancel={dialog.onFalse} />
        </Dialog>
    );
}
