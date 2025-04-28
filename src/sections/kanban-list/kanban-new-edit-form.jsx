import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Chip from '@mui/material/Chip';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';

import { fIsAfter } from '~/utils/format-time';

import { _tags, _tourGuides } from '~/_mock';

import { toast } from '~/components/snackbar';
import { Form, Field, schemaHelper } from '~/components/hook-form';

export const NewKanbanSchema = zod
    .object({
        title: zod.string().min(1, { message: 'Title is required!' }),
        description: schemaHelper.editor({
            message: { required_error: 'Description is required!' },
        }),
        image: schemaHelper.file({
            message: { required_error: 'Image is required!' },
        }),
        members: zod
            .array(
                zod.object({
                    id: zod.string(),
                    name: zod.string(),
                    avatarUrl: zod.string(),
                    phoneNumber: zod.string(),
                }),
            )
            .nonempty({ message: 'Must have at least 1 member!' }),
        available: zod.object({
            startDate: schemaHelper.date({
                message: { required_error: 'Start date is required!' },
            }),
            endDate: schemaHelper.date({
                message: { required_error: 'End date is required!' },
            }),
        }),
        tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
    })
    .refine((data) => !fIsAfter(data.available.startDate, data.available.endDate), {
        message: 'End date cannot be earlier than start date!',
        path: ['available.endDate'],
    });

export function KanbanNewEditForm({ currentBoard, onCancel }) {
    const defaultValues = useMemo(
        () => ({
            title: currentBoard?.name || '',
            description: currentBoard?.content || '',
            image: currentBoard?.images[0] || '',
            members: currentBoard?.boardGuides || [],
            available: {
                startDate: currentBoard?.available.startDate || null,
                endDate: currentBoard?.available.endDate || null,
            },
            tags: currentBoard?.tags || [],
        }),
        [currentBoard],
    );

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(NewKanbanSchema),
        defaultValues,
    });

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (currentBoard) {
            reset(defaultValues);
        }
    }, [currentBoard, defaultValues, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            reset();
            toast.success(currentBoard ? 'Update success!' : 'Create success!');
            console.info('DATA', data);
            onCancel();
        } catch (error) {
            console.error(error);
        }
    });

    const handleRemoveFile = useCallback(() => {
        setValue('image', '', { shouldValidate: true });
    }, [setValue]);

    const renderDetails = (
        <Stack spacing={3}>
            <Stack spacing={1.5}>
                <Typography variant="subtitle2">Title</Typography>
                <Field.Text name="title" placeholder="Ex: Adventure Seekers Expedition..." />
            </Stack>

            <Stack spacing={1.5}>
                <Typography variant="subtitle2">Description</Typography>
                <Field.Editor name="description" sx={{ maxHeight: 480 }} />
            </Stack>

            <Stack spacing={1.5}>
                <Typography variant="subtitle2">Image</Typography>
                <Field.Upload name="image" thumbnail maxSize={3145728} onDelete={handleRemoveFile} />
            </Stack>
        </Stack>
    );

    const renderProperties = (
        <Stack spacing={3}>
            <div>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                    Members
                </Typography>

                <Field.Autocomplete
                    multiple
                    name="members"
                    placeholder="+ Members"
                    disableCloseOnSelect
                    options={_tourGuides}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderOption={(props, kanbanGuide) => (
                        <li {...props} key={kanbanGuide.id}>
                            <Avatar
                                key={kanbanGuide.id}
                                alt={kanbanGuide.avatarUrl}
                                src={kanbanGuide.avatarUrl}
                                sx={{ mr: 1, width: 24, height: 24, flexShrink: 0 }}
                            />

                            {kanbanGuide.name}
                        </li>
                    )}
                    renderTags={(selected, getTagProps) =>
                        selected.map((kanbanGuide, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={kanbanGuide.id}
                                size="small"
                                variant="soft"
                                label={kanbanGuide.name}
                                avatar={<Avatar alt={kanbanGuide.name} src={kanbanGuide.avatarUrl} />}
                            />
                        ))
                    }
                />
            </div>

            <Stack spacing={1.5}>
                <Typography variant="subtitle2">Available</Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <Field.DatePicker name="available.startDate" label="Start date" />
                    <Field.DatePicker name="available.endDate" label="End date" />
                </Stack>
            </Stack>

            <Stack spacing={1.5}>
                <Typography variant="subtitle2">Tags</Typography>
                <Field.Autocomplete
                    name="tags"
                    placeholder="+ Tags"
                    multiple
                    freeSolo
                    disableCloseOnSelect
                    options={_tags.map((option) => option)}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                        <li {...props} key={option}>
                            {option}
                        </li>
                    )}
                    renderTags={(selected, getTagProps) =>
                        selected.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={option}
                                label={option}
                                size="small"
                                color="info"
                                variant="soft"
                            />
                        ))
                    }
                />
            </Stack>
        </Stack>
    );

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <DialogTitle sx={{ pb: 2 }}> {!currentBoard ? 'New Kanban' : 'Edit Kanban'} </DialogTitle>
            <DialogContent>
                <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
                    {renderDetails}

                    {renderProperties}
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel} variant="outlined" color="inherit">
                    Cancel
                </Button>

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!currentBoard ? 'Create kanban' : 'Save changes'}
                </LoadingButton>
            </DialogActions>
        </Form>
    );
}
