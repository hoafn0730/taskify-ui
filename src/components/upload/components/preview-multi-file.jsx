import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fData } from '~/utils/format-number';
import { varAlpha } from '~/theme/styles';

import { Iconify } from '../../iconify';
import { fileData, FileThumbnail } from '../../file-thumbnail';
import { Lightbox } from '../../lightbox';

// ----------------------------------------------------------------------

export function MultiFilePreview({
    sx,
    onRemove,
    lastNode,
    thumbnail,
    slotProps,
    firstNode,
    files = [],
    isFileDisabled,
}) {
    const [openLightbox, setOpenLightbox] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const slides = useMemo(() => {
        return files.map((file) => {
            const { name, preview = '', path = '' } = fileData(file);
            const src = typeof file === 'string' ? file : preview;
            const ext = (path || src).split('.').pop();
            return {
                src,
                title: name,
                type: ext?.match(/mp4|webm|ogg/) ? 'video' : 'image',
            };
        });
    }, [files]);

    const handleOpenLightbox = (file) => {
        const src = typeof file === 'string' ? file : file.preview;
        const index = slides.findIndex((slide) => slide.src === src);

        if (index !== -1) {
            setSelectedIndex(index);
            setOpenLightbox(true);
        }
    };

    const renderFirstNode = firstNode && (
        <Box
            component="li"
            sx={{
                ...(thumbnail && {
                    width: 'auto',
                    display: 'inline-flex',
                }),
            }}
        >
            {firstNode}
        </Box>
    );

    const renderLastNode = lastNode && (
        <Box
            component="li"
            sx={{
                ...(thumbnail && { width: 'auto', display: 'inline-flex' }),
            }}
        >
            {lastNode}
        </Box>
    );

    return (
        <>
            <Box
                component="ul"
                sx={{
                    gap: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    ...(thumbnail && {
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                    }),
                    ...sx,
                }}
            >
                {renderFirstNode}

                {files.map((file) => {
                    const { name, size } = fileData(file);
                    const disabled = isFileDisabled?.(file);

                    if (thumbnail) {
                        return (
                            <Box component="li" key={name} sx={{ display: 'inline-flex' }}>
                                <FileThumbnail
                                    tooltip
                                    imageView
                                    file={file}
                                    onClick={() => handleOpenLightbox(file)}
                                    onRemove={
                                        disabled
                                            ? undefined
                                            : (event) => {
                                                  event.stopPropagation();
                                                  onRemove?.(file);
                                              }
                                    }
                                    disabled={disabled}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        border: (theme) =>
                                            `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                                    }}
                                    slotProps={{
                                        icon: { width: 36, height: 36 },
                                        img: { cursor: 'pointer' },
                                    }}
                                    {...slotProps?.thumbnail}
                                />
                            </Box>
                        );
                    }

                    return (
                        <Box
                            component="li"
                            key={name}
                            sx={{
                                py: 1,
                                pr: 1,
                                pl: 1.5,
                                gap: 1.5,
                                display: 'flex',
                                borderRadius: 1,
                                alignItems: 'center',
                                border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                            }}
                        >
                            <FileThumbnail file={file} {...slotProps?.thumbnail} />

                            <ListItemText
                                primary={name}
                                secondary={fData(size)}
                                secondaryTypographyProps={{ component: 'span', typography: 'caption' }}
                            />

                            {onRemove && (
                                <IconButton size="small" onClick={() => onRemove(file)}>
                                    <Iconify icon="mingcute:close-line" width={16} />
                                </IconButton>
                            )}
                        </Box>
                    );
                })}

                {renderLastNode}
            </Box>

            {openLightbox && (
                <Lightbox
                    open={openLightbox}
                    onClose={() => setOpenLightbox(false)}
                    slides={slides}
                    index={selectedIndex}
                    onGetCurrentIndex={(index) => setSelectedIndex(index)}
                />
            )}
        </>
    );
}
