import { useTheme } from '@mui/material/styles';

import { Chart, useChart } from '~/components/chart';

// ----------------------------------------------------------------------

export function ChartHeatmap({ chart }) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.info.dark,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    legend: { show: true },
    tooltip: { x: { show: false } },
    xaxis: { categories: chart.categories },
  });

  return <Chart type="heatmap" series={chart.series} options={chartOptions} height={320} />;
}
