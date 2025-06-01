import { useState, useCallback, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Portal from '@mui/material/Portal';
import Backdrop from '@mui/material/Backdrop';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from '~/hooks/use-boolean';
import { useResponsive } from '~/hooks/use-responsive';

import { varAlpha } from '~/theme/styles';

import { Editor } from '~/components/editor';
import { Iconify } from '~/components/iconify';
import { mailService } from '~/services/mailService';
import { toast } from 'sonner';

// ----------------------------------------------------------------------

const POSITION = 20;

// ----------------------------------------------------------------------

export function MailCompose({ onCloseCompose }) {
    const smUp = useResponsive('up', 'sm');

    const fullScreen = useBoolean();

    const [message, setMessage] = useState('');
    const [mailTo, setMailTo] = useState('');
    const [subject, setSubject] = useState('');
    const [draftId, setDraftId] = useState(null);
    const saveTimeoutRef = useRef(null);

    // Auto-save draft when any field changes
    const saveDraft = useCallback(async () => {
        if (!mailTo && !subject && !message) return; // Don't save empty drafts

        const draftData = {
            id: draftId, // Use existing draft ID if available
            to: mailTo,
            subject,
            message,
            from: 26,
        };

        // Create new draft
        const newDraft = await mailService.save(draftData);
        setDraftId(newDraft.data.id);
    }, [mailTo, subject, message, draftId]);

    // Auto-save with debounce effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            saveDraft();
        }, 1000); // Save after 1 second of inactivity

        return () => clearTimeout(timeoutId);
    }, [saveDraft]);

    // Debounced save function
    const debouncedSave = useCallback(() => {
        // Clear previous timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set new timeout
        saveTimeoutRef.current = setTimeout(() => {
            saveDraft();
        }, 1000);
    }, [saveDraft]);

    const handleChangeMessage = useCallback(
        (value) => {
            setMessage(value);
            debouncedSave();
        },
        [debouncedSave],
    );

    const handleChangeMailTo = useCallback(
        (event) => {
            setMailTo(event.target.value);
            debouncedSave();
        },
        [debouncedSave],
    );

    const handleChangeSubject = useCallback(
        (event) => {
            setSubject(event.target.value);
            debouncedSave();
        },
        [debouncedSave],
    );

    const handleSend = useCallback(async () => {
        try {
            // Logic to send the email
            await mailService.send(draftId);

            // Show success toast
            toast.success('Email sent successfully!');

            // Reset fields after sending
            setMailTo('');
            setSubject('');
            setMessage('');
            setDraftId(null);
            onCloseCompose();
        } catch (error) {
            console.error('Failed to send email:', error);

            // Show error toast
            toast.error('Failed to send email. Please try again.');
        }
    }, [draftId, onCloseCompose]);

    const handleClose = useCallback(async () => {
        // Save draft before closing if there's content
        if ((mailTo || subject || message) && !draftId) {
            await saveDraft();
        }
        onCloseCompose();
    }, [mailTo, subject, message, draftId, saveDraft, onCloseCompose]);

    return (
        <Portal>
            {(fullScreen.value || !smUp) && <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal - 1 }} />}

            <Paper
                sx={{
                    maxWidth: 560,
                    right: POSITION,
                    borderRadius: 2,
                    display: 'flex',
                    bottom: POSITION,
                    position: 'fixed',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    zIndex: (theme) => theme.zIndex.modal,
                    width: `calc(100% - ${POSITION * 2}px)`,
                    boxShadow: (theme) => theme.customShadows.dropdown,
                    ...(fullScreen.value && {
                        maxWidth: 1,
                        height: `calc(100% - ${POSITION * 2}px)`,
                    }),
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ bgcolor: 'background.neutral', p: (theme) => theme.spacing(1.5, 1, 1.5, 2) }}
                >
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        New message
                        {draftId && (
                            <Typography component="span" variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                                (Draft saved)
                            </Typography>
                        )}
                    </Typography>

                    <IconButton onClick={fullScreen.onToggle}>
                        <Iconify icon={fullScreen.value ? 'eva:collapse-fill' : 'eva:expand-fill'} />
                    </IconButton>

                    <IconButton onClick={handleClose}>
                        <Iconify icon="mingcute:close-line" />
                    </IconButton>
                </Stack>

                <InputBase
                    placeholder="To"
                    endAdornment={
                        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle2' }}>
                            <Box sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Cc</Box>
                            <Box sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Bcc</Box>
                        </Stack>
                    }
                    sx={{
                        px: 2,
                        height: 48,
                        borderBottom: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                    }}
                    value={mailTo}
                    onChange={handleChangeMailTo}
                />

                <InputBase
                    placeholder="Subject"
                    sx={{
                        px: 2,
                        height: 48,
                        borderBottom: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                    }}
                    value={subject}
                    onChange={handleChangeSubject}
                />

                <Stack
                    spacing={2}
                    flexGrow={1}
                    sx={{
                        p: 2,
                        flex: '1 1 auto',
                        overflow: 'hidden',
                    }}
                >
                    <Editor
                        value={message}
                        onChange={handleChangeMessage}
                        placeholder="Type a message"
                        slotProps={{
                            wrap: {
                                ...(fullScreen.value && { minHeight: 0, flex: '1 1 auto' }),
                            },
                        }}
                        sx={{
                            maxHeight: 480,
                            ...(fullScreen.value && { maxHeight: 1, flex: '1 1 auto' }),
                        }}
                    />

                    <Stack direction="row" alignItems="center">
                        <Stack direction="row" alignItems="center" flexGrow={1}>
                            <IconButton>
                                <Iconify icon="solar:gallery-add-bold" />
                            </IconButton>

                            <IconButton>
                                <Iconify icon="eva:attach-2-fill" />
                            </IconButton>
                        </Stack>

                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Iconify icon="iconamoon:send-fill" />}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Portal>
    );
}
