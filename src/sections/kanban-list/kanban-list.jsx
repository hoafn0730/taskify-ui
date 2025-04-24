import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { KanbanItem } from './kanban-item';

// ----------------------------------------------------------------------

export function KanbanList({ boards }) {
    const router = useRouter();

    const handleView = useCallback(
        (id) => {
            router.push(paths.dashboard.kanban.details(id));
        },
        [router],
    );

    const handleEdit = useCallback(
        (id) => {
            router.push(paths.dashboard.kanban.edit(id));
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
                {boards.map((board) => (
                    <KanbanItem
                        key={board.id}
                        board={board}
                        onView={() => handleView(board.id)}
                        onEdit={() => handleEdit(board.id)}
                        onDelete={() => handleDelete(board.id)}
                    />
                ))}
            </Box>

            {boards.length > 8 && (
                <Pagination
                    count={8}
                    sx={{
                        mt: { xs: 5, md: 8 },
                        [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
                    }}
                />
            )}
        </>
    );
}
