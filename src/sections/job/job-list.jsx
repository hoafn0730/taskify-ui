import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { JobItem } from './job-item';

// ----------------------------------------------------------------------

export function JobList({ jobs }) {
    const router = useRouter();

    const handleView = useCallback(
        (id) => {
            router.push(paths.dashboard.job.details(id));
        },
        [router],
    );

    const handleEdit = useCallback(
        (id) => {
            router.push(paths.dashboard.job.edit(id));
        },
        [router],
    );

    const handleDelete = useCallback((id) => {
        console.info('DELETE', id);
    }, []);

    return (
        <>
            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            >
                {jobs.map((job) => (
                    <JobItem
                        key={job.id}
                        job={job}
                        onView={() => handleView(job.id)}
                        onEdit={() => handleEdit(job.id)}
                        onDelete={() => handleDelete(job.id)}
                    />
                ))}
            </Box>

            {jobs.length > 8 && (
                <Pagination
                    count={8}
                    sx={{
                        mt: { xs: 8, md: 8 },
                        [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
                    }}
                />
            )}
        </>
    );
}
