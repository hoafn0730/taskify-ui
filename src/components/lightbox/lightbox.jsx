import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Video from 'yet-another-react-lightbox/plugins/video';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import ReactLightbox, { useLightboxState } from 'yet-another-react-lightbox';

import Box from '@mui/material/Box';

import { Iconify } from '../iconify';
import { lightboxClasses } from './classes';
import { IconButton } from '@mui/material';

// ----------------------------------------------------------------------

export function Lightbox({
    open,
    onClose,
    slides,
    disableZoom,
    disableVideo,
    disableTotal,
    disableCaptions,
    disableSlideshow,
    disableThumbnails,
    disableFullscreen,
    onGetCurrentIndex,
    ...other
}) {
    const totalItems = slides ? slides.length : 0;

    return (
        <ReactLightbox
            open={open}
            close={onClose}
            slides={slides}
            animation={{ swipe: 240 }}
            carousel={{ finite: totalItems < 5 }}
            controller={{ closeOnBackdropClick: true }}
            plugins={getPlugins({
                disableZoom,
                disableVideo,
                disableCaptions,
                disableSlideshow,
                disableThumbnails,
                disableFullscreen,
            })}
            on={{
                view: ({ index }) => {
                    if (onGetCurrentIndex) {
                        onGetCurrentIndex(index);
                    }
                },
            }}
            toolbar={{
                buttons: [
                    <DisplayTotal key={0} totalItems={totalItems} disableTotal={disableTotal} />,
                    <IconButton
                        key="download"
                        size="small"
                        // onClick={handleDownload}
                        sx={{
                            color: 'white',
                            cursor: 'pointer',
                            width: 32,
                            height: 32,
                            padding: 0,
                        }}
                        title="Download"
                    >
                        <Iconify icon="solar:download-bold" />
                    </IconButton>,
                    'close',
                ],
            }}
            render={{
                iconClose: () => <Iconify width={24} icon="carbon:close" />,
                iconZoomIn: () => <Iconify width={24} icon="carbon:zoom-in" />,
                iconZoomOut: () => <Iconify width={24} icon="carbon:zoom-out" />,
                iconSlideshowPlay: () => <Iconify width={24} icon="carbon:play" />,
                iconSlideshowPause: () => <Iconify width={24} icon="carbon:pause" />,
                iconPrev: () => <Iconify width={32} icon="carbon:chevron-left" />,
                iconNext: () => <Iconify width={32} icon="carbon:chevron-right" />,
                iconExitFullscreen: () => <Iconify width={24} icon="carbon:center-to-fit" />,
                iconEnterFullscreen: () => <Iconify width={24} icon="carbon:fit-to-screen" />,
            }}
            className={lightboxClasses.root}
            {...other}
        />
    );
}

// ----------------------------------------------------------------------

export function getPlugins({
    disableZoom,
    disableVideo,
    disableCaptions,
    disableSlideshow,
    disableThumbnails,
    disableFullscreen,
}) {
    let plugins = [Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom];

    if (disableThumbnails) {
        plugins = plugins.filter((plugin) => plugin !== Thumbnails);
    }
    if (disableCaptions) {
        plugins = plugins.filter((plugin) => plugin !== Captions);
    }
    if (disableFullscreen) {
        plugins = plugins.filter((plugin) => plugin !== Fullscreen);
    }
    if (disableSlideshow) {
        plugins = plugins.filter((plugin) => plugin !== Slideshow);
    }
    if (disableZoom) {
        plugins = plugins.filter((plugin) => plugin !== Zoom);
    }
    if (disableVideo) {
        plugins = plugins.filter((plugin) => plugin !== Video);
    }

    return plugins;
}

// ----------------------------------------------------------------------

export function DisplayTotal({ totalItems, disableTotal }) {
    const { currentIndex } = useLightboxState();

    if (disableTotal) {
        return null;
    }

    return (
        <Box
            component="span"
            className="yarl__button"
            sx={{
                typography: 'body2',
                alignItems: 'center',
                display: 'inline-flex',
                justifyContent: 'center',
            }}
        >
            <strong> {currentIndex + 1} </strong> / {totalItems}
        </Box>
    );
}
