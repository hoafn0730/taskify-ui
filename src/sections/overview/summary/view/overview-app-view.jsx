import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from '~/layouts/dashboard';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from '~/_mock';

import { AppAreaInstalled } from '../app-area-installed';
import { WidgetSummary } from '../widget-summary';
import { AppCurrentDownload } from '../app-current-download';

export function OverviewAppView() {
    const theme = useTheme();

    return (
        <DashboardContent maxWidth="xl">
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <WidgetSummary title="Task completed" percent={2.6} total={18} />
                </Grid>

                <Grid xs={12} md={4}>
                    <WidgetSummary title="Task created" percent={0.2} total={48} />
                </Grid>

                <Grid xs={12} md={4}>
                    <WidgetSummary
                        title="Due soon"
                        percent={-0.1}
                        total={10}
                        chart={{
                            colors: [theme.vars.palette.error.main],
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [18, 19, 31, 8, 16, 37, 12, 33],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={4}>
                    <AppCurrentDownload
                        title="Status overview"
                        subheader="Get a snapshot of the status of your work items"
                        chart={{
                            series: [
                                { label: 'To do', value: 1 },
                                { label: 'In progress', value: 4 },
                                { label: 'In review', value: 1 },
                                { label: 'Done', value: 0 },
                            ],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={8}>
                    <AppAreaInstalled
                        title="Priority breakdown"
                        subheader="Get a holistic view of how work is being prioritized."
                        chart={{
                            categories: ['High', 'Medium', 'Low'],
                            series: [
                                {
                                    name: '2022',
                                    data: [{ name: 'Task', data: [12, 10, 18] }],
                                },
                                {
                                    name: '2023',
                                    data: [{ name: 'Task', data: [12, 10, 18] }],
                                },
                                {
                                    name: '2024',
                                    data: [{ name: 'Task', data: [12, 10, 18] }],
                                },
                            ],
                        }}
                    />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}
