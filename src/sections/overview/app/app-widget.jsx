import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { fNumber } from '~/utils/format-number';

import { Iconify } from '~/components/iconify';
import { SvgColor } from '~/components/svg-color';
import { Chart, useChart } from '~/components/chart';
import { CONFIG } from '~/configs/config-global';

// ----------------------------------------------------------------------

export function AppWidget({ title, total, icon, chart, sx, ...other }) {
    const theme = useTheme();

    const chartColors = chart.colors ?? [theme.palette.primary.light, theme.palette.primary.main];

    const chartOptions = useChart({
        chart: { sparkline: { enabled: true } },
        stroke: { width: 0 },
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: [
                    { offset: 0, color: chartColors[0], opacity: 1 },
                    { offset: 100, color: chartColors[1], opacity: 1 },
                ],
            },
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: { show: false },
                    value: {
                        offsetY: 6,
                        color: theme.vars.palette.common.white,
                        fontSize: theme.typography.subtitle2.fontSize,
                    },
                },
            },
        },
        ...chart.options,
    });

    return (
        <Box
            sx={{
                p: 3,
                gap: 3,
                borderRadius: 2,
                display: 'flex',
                overflow: 'hidden',
                position: 'relative',
                alignItems: 'center',
                color: 'common.white',
                bgcolor: 'primary.dark',
                ...sx,
            }}
            {...other}
        >
            <Box
                sx={{
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Chart
                    type="radialBar"
                    series={[chart.series]}
                    options={chartOptions}
                    width={80}
                    height={80}
                    sx={{ zIndex: 1 }}
                />

                <SvgColor
                    src={`${CONFIG.site.basePath}/assets/background/shape-circle-3.svg`}
                    sx={{
                        width: 200,
                        height: 200,
                        opacity: 0.08,
                        position: 'absolute',
                        color: 'primary.light',
                    }}
                />
            </Box>

            <div>
                <Box sx={{ typography: 'h4' }}>{fNumber(total)}</Box>
                <Box sx={{ typography: 'subtitle2', opacity: 0.64 }}>{title}</Box>
            </div>

            <Iconify
                icon={icon}
                sx={{
                    width: 120,
                    right: -40,
                    height: 120,
                    opacity: 0.08,
                    position: 'absolute',
                }}
            />
        </Box>
    );
}
