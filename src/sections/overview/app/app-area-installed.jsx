import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { fNumber, fShortenNumber } from '~/utils/format-number';

import { Chart, useChart, ChartSelect, ChartLegends } from '~/components/chart';

// ----------------------------------------------------------------------

export function AppAreaInstalled({ title, subheader, chart, ...other }) {
    const theme = useTheme();

    const [selectedSeries, setSelectedSeries] = useState('2023');

    const chartColors = chart.colors ?? [
        theme.palette.primary.dark,
        theme.palette.warning.main,
        theme.palette.info.main,
    ];

    const chartOptions = useChart({
        chart: { stacked: true },
        colors: chartColors,
        stroke: { width: 0 },
        xaxis: { categories: chart.categories },
        tooltip: { y: { formatter: (value) => fNumber(value) } },
        plotOptions: { bar: { columnWidth: '40%' } },
        ...chart.options,
    });

    const handleChangeSeries = useCallback((newValue) => {
        setSelectedSeries(newValue);
    }, []);

    const currentSeries = chart.series.find((i) => i.name === selectedSeries);

    return (
        <Card {...other}>
            <CardHeader
                title={title}
                subheader={subheader}
                action={
                    <ChartSelect
                        options={chart.series.map((item) => item.name)}
                        value={selectedSeries}
                        onChange={handleChangeSeries}
                    />
                }
                sx={{ mb: 3 }}
            />

            <ChartLegends
                colors={chartOptions?.colors}
                labels={chart.series[0].data.map((item) => item.name)}
                values={[fShortenNumber(1234), fShortenNumber(6789), fShortenNumber(1012)]}
                sx={{
                    px: 3,
                    gap: 3,
                }}
            />

            <Chart
                key={selectedSeries}
                type="bar"
                series={currentSeries?.data}
                options={chartOptions}
                height={320}
                sx={{ py: 2.5, pl: 1, pr: 2.5 }}
            />
        </Card>
    );
}
