import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { KanbanItem } from './kanban-item';
import { KanbanDialog } from './kanban-dialog';

import { useBoolean } from '~/hooks/use-boolean';
import { useSetState } from '~/hooks/use-set-state';

export function KanbanList({ boards }) {
    const router = useRouter();
    const dialog = useBoolean();
    const { state, setState } = useSetState(null);

    const handleView = useCallback(
        (id) => {
            router.push(paths.dashboard.kanban.details('remote-class'));
        },
        [router],
    );

    const handleEdit = useCallback(
        (board) => {
            setState(board);
            dialog.onTrue();
        },
        [dialog, setState],
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
                        onEdit={() => handleEdit(board)}
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

            <KanbanDialog currentBoard={state} dialog={dialog} />
        </>
    );
}
