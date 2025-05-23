import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Chart, useChart } from '~/components/chart';

// ----------------------------------------------------------------------

export function CourseMyStrength({ title, chart, ...other }) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.main];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          colors: [
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
          ],
        },
      },
    },
  });

  return (
    <Card {...other}>
      <Typography variant="h6">{title}</Typography>
      <Chart
        type="radar"
        series={chart.series}
        options={chartOptions}
        width={280}
        height={280}
        sx={{ mx: 'auto' }}
      />
    </Card>
  );
}
