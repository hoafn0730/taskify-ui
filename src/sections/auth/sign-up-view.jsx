import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';

import { paths } from '~/routes/paths';
import { useRouter } from '~/routes/hooks';
import { RouterLink } from '~/routes/components';

import { useBoolean } from '~/hooks/use-boolean';

import { Iconify, SocialIcon } from '~/components/iconify';
import { Form, Field } from '~/components/hook-form';

import { authService } from '~/services/authService';

// ----------------------------------------------------------------------

export const SignUpSchema = zod.object({
    firstName: zod.string().min(1, { message: 'First name is required!' }),
    lastName: zod.string().min(1, { message: 'Last name is required!' }),
    username: zod.string().min(1, { message: 'Username is required!' }),
    email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
    password: zod
        .string()
        .min(1, { message: 'Password is required!' })
        .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function SignUpView() {
    const router = useRouter();

    const password = useBoolean();

    const [errorMsg, setErrorMsg] = useState('');

    const defaultValues = {
        firstName: 'Hello',
        lastName: 'Friend',
        username: 'hello',
        email: 'hello@gmail.com',
        password: '123456',
    };

    const methods = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await authService.signUp({
                username: data.username,
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            });

            router.push('/auth/sign-in');
        } catch (error) {
            console.error(error);

            setErrorMsg(error instanceof Error ? error.response.data.message : error);
        }
    });

    const renderHead = (
        <Stack spacing={1.5} sx={{ mb: 5 }}>
            <Typography variant="h5">Get started absolutely free</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Already have an account?
                </Typography>

                <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
                    Sign in
                </Link>
            </Stack>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Field.Text name="firstName" label="First name" InputLabelProps={{ shrink: true }} />
                <Field.Text name="lastName" label="Last name" InputLabelProps={{ shrink: true }} />
            </Stack>

            <Field.Text name="username" label="Username" InputLabelProps={{ shrink: true }} />

            <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

            <Field.Text
                name="password"
                label="Password"
                placeholder="6+ characters"
                type={password.value ? 'text' : 'password'}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Create account..."
            >
                Create account
            </LoadingButton>
        </Stack>
    );

    const renderTerms = (
        <Typography
            component="div"
            sx={{
                mt: 3,
                textAlign: 'center',
                typography: 'caption',
                color: 'text.secondary',
            }}
        >
            {'By signing up, I agree to '}
            <Link underline="always" color="text.primary">
                Terms of service
            </Link>
            {' and '}
            <Link underline="always" color="text.primary">
                Privacy policy
            </Link>
            .
        </Typography>
    );

    const renderSignInWithSocials = (
        <>
            <Divider
                sx={{
                    my: 3,
                    typography: 'overline',
                    color: 'text.disabled',
                    '&::before, :after': { borderTopStyle: 'dashed' },
                }}
            >
                OR
            </Divider>

            <Stack direction="row" justifyContent="center" spacing={1}>
                <IconButton>
                    <SocialIcon icon="google" width={22} />
                </IconButton>

                <IconButton>
                    <SocialIcon icon="github" width={22} />
                </IconButton>

                <IconButton>
                    <SocialIcon icon="twitter" width={22} />
                </IconButton>
            </Stack>
        </>
    );

    return (
        <>
            {renderHead}

            {!!errorMsg && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMsg}
                </Alert>
            )}

            <Form methods={methods} onSubmit={onSubmit}>
                {renderForm}
            </Form>

            {renderTerms}

            {renderSignInWithSocials}
        </>
    );
}
