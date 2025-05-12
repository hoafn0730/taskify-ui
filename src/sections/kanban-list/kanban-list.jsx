import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { KanbanItem } from './kanban-item';
import { KanbanDialog } from './kanban-dialog';

import { useBoolean } from '~/hooks/use-boolean';
import { useSetState } from '~/hooks/use-set-state';

import { kanbanService } from '~/services/kanbanService';
import { useKanban } from '~/actions/kanban/useKanban';

export function KanbanList({ boards }) {
    const router = useRouter();
    const dialog = useBoolean();
    const { state, setState } = useSetState(null);

    const { refetch, meta, setPage } = useKanban();

    const handleView = useCallback(
        (id) => {
            router.push(paths.dashboard.kanban.details(id));
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

    const handleStarToggle = useCallback(
        async (boardId, isStarred) => {
            // Gọi API để cập nhật trạng thái starred của board
            await kanbanService.toggleStarBoard(boardId, isStarred);

            // Cập nhật trạng thái starred trong state
            refetch();
        },
        [refetch],
    );

    const handleChange = (_, value) => {
        setPage(value);
    };

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
                        onStarToggle={handleStarToggle}
                        onView={() => handleView(board.slug)}
                        onEdit={() => handleEdit(board)}
                        onDelete={() => handleDelete(board.id)}
                    />
                ))}
            </Box>

            {meta?.total > 4 && (
                <Pagination
                    page={meta?.page}
                    onChange={handleChange}
                    count={Math.ceil(meta?.total / meta?.pageSize)}
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
