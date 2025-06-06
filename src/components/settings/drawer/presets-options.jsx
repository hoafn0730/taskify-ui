import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha as hexAlpha } from '@mui/material/styles';

import { CONFIG } from '~/configs/config-global';

import { Block } from './styles';
import { SvgColor } from '../../svg-color';
import { useTranslate } from '~/locales';

// ----------------------------------------------------------------------

export function PresetsOptions({ value, options, onClickOption }) {
    const { t } = useTranslate('header');
    return (
        <Block title={t('settings.presets.title')}>
            <Box component="ul" gap={1.5} display="grid" gridTemplateColumns="repeat(3, 1fr)">
                {options.map((option) => {
                    const selected = value === option.name;

                    return (
                        <Box component="li" key={option.name} sx={{ display: 'flex' }}>
                            <ButtonBase
                                onClick={() => onClickOption(option.name)}
                                sx={{
                                    width: 1,
                                    height: 64,
                                    borderRadius: 1.5,
                                    color: option.value,
                                    ...(selected && {
                                        bgcolor: hexAlpha(option.value, 0.08),
                                    }),
                                }}
                            >
                                <SvgColor
                                    src={`${CONFIG.site.basePath}/assets/icons/setting/ic-siderbar-duotone.svg`}
                                    sx={{ width: 28, height: 28, color: 'currentColor' }}
                                />
                            </ButtonBase>
                        </Box>
                    );
                })}
            </Box>
        </Block>
    );
}
