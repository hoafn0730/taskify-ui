import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from '~/configs/paths';
import { RouterLink } from '~/components/router-link';

import { PasswordIcon } from '~/assets/icons';

import { Iconify } from '~/components/iconify';
import { Form, Field } from '~/components/hook-form';

// ----------------------------------------------------------------------

export const ResetPasswordSchema = zod.object({
    email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

export function SplitResetPasswordView() {
    const defaultValues = { email: '' };

    const methods = useForm({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    const renderHead = (
        <>
            <PasswordIcon sx={{ mx: 'auto' }} />

            <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
                <Typography variant="h5">Forgot your password?</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`Please enter the email address associated with your account and we'll email you a link to reset your password.`}
                </Typography>
            </Stack>
        </>
    );

    const renderForm = (
        <Stack spacing={3}>
            <Field.Text
                autoFocus
                name="email"
                label="Email address"
                placeholder="example@gmail.com"
                InputLabelProps={{ shrink: true }}
            />

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Send request..."
            >
                Send request
            </LoadingButton>

            <Link
                component={RouterLink}
                href={paths.authDemo.split.signIn}
                color="inherit"
                variant="subtitle2"
                sx={{ mx: 'auto', alignItems: 'center', display: 'inline-flex' }}
            >
                <Iconify icon="eva:arrow-ios-back-fill" width={16} sx={{ mr: 0.5 }} />
                Return to sign in
            </Link>
        </Stack>
    );

    return (
        <>
            {renderHead}

            <Form methods={methods} onSubmit={onSubmit}>
                {renderForm}
            </Form>
        </>
    );
}
