import { Box, CircularProgress } from '@mui/material';
import { useState, useCallback } from 'react';

import { UploadBox, MultiFilePreview } from '~/components/upload';
import { kanbanService } from '~/services/kanbanService';
import { convertBase64 } from '~/utils/convertBase64';

export function KanbanDetailsAttachments({ attachments, taskId }) {
    const [files, setFiles] = useState(attachments);
    const [isUploading, setIsUploading] = useState(false);
    const [removingIds, setRemovingIds] = useState([]); // 🆕

    // add file
    const handleDrop = useCallback(
        async (acceptedFiles) => {
            setIsUploading(true);

            const base64Files = await Promise.all(
                acceptedFiles.map(async (file) => {
                    const base64 = await convertBase64(file);
                    return {
                        name: file.name,
                        file: base64,
                    };
                }),
            );

            const uploadFiles = await kanbanService.uploadFile(taskId, {
                files: base64Files,
            });

            setFiles((prev) => [...prev, ...uploadFiles]);

            setIsUploading(false);
        },
        [taskId],
    );

    // xoa file
    const handleRemoveFile = useCallback(
        async (inputFile) => {
            setRemovingIds((prev) => [...prev, inputFile.id]); // 🆕

            await kanbanService.deleteFile(taskId, inputFile.id);
            setFiles((prev) => prev.filter((file) => file.id !== inputFile.id));

            setRemovingIds((prev) => prev.filter((id) => id !== inputFile.id)); // 🆕
        },
        [taskId],
    );

    return (
        <MultiFilePreview
            thumbnail
            files={files}
            onRemove={handleRemoveFile}
            isFileDisabled={(file) => isUploading || removingIds.includes(file.id)}
            slotProps={{ thumbnail: { sx: { width: 64, height: 64 } } }}
            lastNode={
                <Box sx={{ position: 'relative' }}>
                    <UploadBox onDrop={handleDrop} disabled={isUploading} />
                    {isUploading && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                bgcolor: 'rgba(255,255,255,0.6)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 10,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            }
        />
    );
}
