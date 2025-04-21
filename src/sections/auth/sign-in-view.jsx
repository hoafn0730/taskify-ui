import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';
import { RouterLink } from '~/components/router-link';

import { useBoolean } from '~/hooks/use-boolean';

import { Iconify, SocialIcon } from '~/components/iconify';
import { Form, Field } from '~/components/hook-form';

import { signIn } from '~/store/actions/userAction';
// import { checkUserSession } from '~/store/slices/userSlice';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
    email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
    password: zod
        .string()
        .min(1, { message: 'Password is required!' })
        .min(6, { message: 'Password must be at least 6 characters!' }),
});

export function SignInView() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState('');
    const password = useBoolean();
    const dispatch = useDispatch();

    const defaultValues = {
        email: 'hello@gmail.com',
        password: '123456',
    };

    const methods = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            dispatch(signIn({ email: data.email, password: data.password }));
            router.push('/dashboard');
            // dispatch(checkUserSession());
        } catch (error) {
            console.error(error);
            setErrorMsg(error instanceof Error ? error.message : error);
        }
    });

    const renderHead = (
        <Stack spacing={1.5} sx={{ mb: 5 }}>
            <Typography variant="h5">Sign in to your account</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`Don't have an account?`}
                </Typography>

                <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
                    Sign up
                </Link>
            </Stack>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={3}>
            <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

            <Stack spacing={1.5}>
                <Link component={RouterLink} href="#" variant="body2" color="inherit" sx={{ alignSelf: 'flex-end' }}>
                    Forgot password?
                </Link>

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
            </Stack>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Sign in..."
            >
                Sign in
            </LoadingButton>
        </Stack>
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

            {renderSignInWithSocials}
        </>
    );
}
