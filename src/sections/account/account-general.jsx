import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from '~/utils/format-number';

import { toast } from '~/components/snackbar';
import { Form, Field, schemaHelper } from '~/components/hook-form';

export const UpdateUserSchema = zod.object({
    displayName: zod.string().min(1, { message: 'Name is required!' }),
    email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
    avatar: schemaHelper.file({
        message: { required_error: 'Avatar is required!' },
    }),
    phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),

    address: zod.string().min(1, { message: 'Address is required!' }),

    about: zod.string().min(1, { message: 'About is required!' }),
    // Not required
    isPublic: zod.boolean(),
});

export function AccountGeneral() {
    const { user } = useSelector((state) => state.user);

    const defaultValues = {
        displayName: user?.displayName || '',
        email: user?.email || '',
        avatar: user?.avatar || null,
        phoneNumber: user?.phoneNumber || '',
        address: user?.address || '',
        about: user?.about || '',
        isPublic: user?.isPublic || false,
    };

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            toast.success('Update success!');
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <Card
                        sx={{
                            pt: 10,
                            pb: 5,
                            px: 3,
                            textAlign: 'center',
                        }}
                    >
                        <Field.UploadAvatar
                            name="avatar"
                            maxSize={3145728}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 3,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.disabled',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(3145728)}
                                </Typography>
                            }
                        />

                        <Field.Switch name="isPublic" labelPlacement="start" label="Public profile" sx={{ mt: 5 }} />

                        <Button variant="soft" color="error" sx={{ mt: 3 }}>
                            Delete user
                        </Button>
                    </Card>
                </Grid>

                <Grid xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <Field.Text name="displayName" label="Name" />
                            <Field.Text name="email" label="Email address" />
                            <Field.Phone name="phoneNumber" label="Phone number" />
                            <Field.Text name="address" label="Address" />
                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <Field.Text name="about" multiline rows={4} label="About" />

                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Save changes
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </Form>
    );
}
