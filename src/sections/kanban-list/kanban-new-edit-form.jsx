import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

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

import { _members, _tags, _tourGuides } from '~/_mock';

import { toast } from '~/components/snackbar';
import { Form, Field, schemaHelper } from '~/components/hook-form';
import { kanbanService } from '~/services/kanbanService';

import { convertBase64 } from '~/utils/convertBase64';
import { useKanban } from '~/actions/kanban/useKanban';

export const NewKanbanSchema = zod.object({
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
                id: zod.number(),
                username: zod.string(),
                email: zod.string(),
                displayName: zod.string(),
                avatar: zod.string().nullable().optional(),
            }),
        )
        .nonempty({ message: 'Must have at least 1 member!' }),

    tags: zod.string().array().min(1, { message: 'Must have at least 1 items!' }),
});

export function KanbanNewEditForm({ currentBoard, onCancel }) {
    const { refetch } = useKanban();
    const { user } = useSelector((state) => state.user);
    const defaultValues = useMemo(
        () => ({
            title: currentBoard?.title || '',
            description: currentBoard?.description || '',
            image: currentBoard?.image || '',
            members: currentBoard?.members.filter((f) => f.id !== user.id) || [],
            tags: currentBoard?.tags.split(',') || [],
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
        formState: { isSubmitting, errors },
    } = methods;

    useEffect(() => {
        if (currentBoard) {
            reset(defaultValues);
        }
    }, [currentBoard, defaultValues, reset]);


    // [ ] TODO: Handle update kanban
    const onSubmit = handleSubmit(async (data) => {
        try {
            const base64 = await convertBase64(data.image);

            await kanbanService.createNewBoard({
                title: data.title,
                description: data.description,
                image: base64,
                type: 'public',
                members: data.members.map((m) => m.id),
                tags: data.tags,
            });
            reset();
            toast.success(currentBoard ? 'Update success!' : 'Create success!');
            onCancel();
            refetch();
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
                    options={user?.friends}
                    getOptionLabel={(option) => option.displayName}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderOption={(props, member) => (
                        <li {...props} key={member.id}>
                            <Avatar
                                key={member.id}
                                alt={member.displayName}
                                src={member.avatar}
                                sx={{ mr: 1, width: 24, height: 24, flexShrink: 0 }}
                            />

                            {member.displayName}
                        </li>
                    )}
                    renderTags={(selected, getTagProps) =>
                        selected.map((member, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={member.id}
                                size="small"
                                variant="soft"
                                label={member.displayName}
                                avatar={<Avatar alt={member.displayName} src={member.avatar} />}
                            />
                        ))
                    }
                />
            </div>

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
