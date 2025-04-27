import { useCallback, useState } from 'react';

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
    // Hàm sắp xếp boards theo star
    const sortBoardsByStar = (boards) => {
        return [...boards].sort((a, b) => b.star - a.star);
    };

    // Sắp xếp boards khi khởi tạo
    const [sortedBoards, setSortedBoards] = useState(() => sortBoardsByStar(boards));

    // Hàm xử lý khi toggle star
    const handleStarToggle = useCallback(
        (boardId, isStarred) => {
            const updatedBoards = sortedBoards.map((board) =>
                board.id === boardId ? { ...board, star: !isStarred } : board,
            );

            setSortedBoards(sortBoardsByStar(updatedBoards)); // Sắp xếp lại danh sách
        },
        [sortedBoards],
    );

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
                {sortedBoards.map((board) => (
                    <KanbanItem
                        key={board.id}
                        board={board}
                        onStarToggle={handleStarToggle}
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
