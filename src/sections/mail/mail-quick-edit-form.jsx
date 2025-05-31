import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { toast } from '~/components/snackbar';
import { Form, Field } from '~/components/hook-form';

const MailQuickEditSchema = zod.object({
    mail: zod.string(),
});

export function MailQuickEditForm({ currentMail, open, onClose }) {
    // const { mutateMails } = useGetMails();
    const defaultValues = useMemo(
        () => ({
            mail: currentMail?.status,
        }),
        [currentMail],
    );

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(MailQuickEditSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const promise = null;
        //  mailService.updateMail(currentMail.id, {
        //     status: data.status,
        // });

        try {
            toast.promise(promise, {
                loading: 'Loading...',
                success: 'Update success!',
                error: 'Update error!',
            });

            await promise;

            reset();
            onClose();

            // mutateMails();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Dialog fullWidth maxWidth={'sm'} open={open} onClose={onClose}>
            <Form methods={methods} onSubmit={onSubmit}>
                <DialogTitle>Add mail</DialogTitle>

                <DialogContent>
                    <Stack spacing={1.5}>
                        <Typography variant="subtitle2">Mail</Typography>
                        <Field.Text name="mail" placeholder="Ex: example@gmail.com" />
                    </Stack>
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
