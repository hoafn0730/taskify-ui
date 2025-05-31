import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { MEMBER_STATUS_OPTIONS } from '~/_mock';

import { toast } from '~/components/snackbar';
import { Form, Field } from '~/components/hook-form';
import { memberService } from '~/services/memberService';
import { useGetMembers } from '~/actions/member';

const MemberQuickEditSchema = zod.object({
    status: zod.string(),
});

export function MemberQuickEditForm({ currentMember, open, onClose }) {
    const { mutateMembers } = useGetMembers();
    const defaultValues = useMemo(
        () => ({
            status: currentMember?.active ? 'active' : 'pending',
        }),
        [currentMember],
    );

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(MemberQuickEditSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const promise = memberService.updateMember(currentMember.id, {
            active: data.status === 'active',
        });

        try {
            toast.promise(promise, {
                loading: 'Loading...',
                success: 'Update success!',
                error: 'Update error!',
            });

            await promise;

            reset();
            onClose();

            mutateMembers();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Dialog fullWidth maxWidth={'sm'} open={open} onClose={onClose}>
            <Form methods={methods} onSubmit={onSubmit}>
                <DialogTitle>Quick Update</DialogTitle>

                <DialogContent>
                    <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                        Account is waiting for confirmation
                    </Alert>

                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
                    >
                        <Field.Select name="status" label="Status">
                            {MEMBER_STATUS_OPTIONS.map((status) => (
                                <MenuItem key={status.value} value={status.value}>
                                    {status.label}
                                </MenuItem>
                            ))}
                        </Field.Select>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Update
                    </LoadingButton>
                </DialogActions>
            </Form>
        </Dialog>
    );
}
