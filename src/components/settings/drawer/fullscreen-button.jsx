import { useState, useCallback } from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { CONFIG } from '~/configs/config-global';

import { SvgColor, svgColorClasses } from '../../svg-color';
import { useTranslate } from '~/locales';

export function FullScreenButton() {
    const [fullscreen, setFullscreen] = useState(false);
    const { t } = useTranslate('header');

    const onToggleFullScreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
        }
    }, []);

    return (
        <Tooltip title={fullscreen ? t('settings.tooltips.minimize') : t('settings.tooltips.fullScreen')}>
            <IconButton
                onClick={onToggleFullScreen}
                sx={{
                    [`& .${svgColorClasses.root}`]: {
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.vars.palette.grey[500]} 0%, ${theme.vars.palette.grey[600]} 100%)`,
                        ...(fullscreen && {
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.vars.palette.primary.light} 0%, ${theme.vars.palette.primary.main} 100%)`,
                        }),
                    },
                }}
            >
                <SvgColor
                    src={`${CONFIG.site.basePath}/assets/icons/setting/${
                        fullscreen ? 'ic-exit-full-screen' : 'ic-full-screen'
                    }.svg`}
                    sx={{ width: 18, height: 18 }}
                />
            </IconButton>
        </Tooltip>
    );
}
