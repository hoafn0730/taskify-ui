
import { useCallback, useMemo } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from '~/configs/paths';

import { useBoolean } from '~/hooks/use-boolean';
import { useSetState } from '~/hooks/use-set-state';

import { orderBy } from '~/utils/helper';
import { fIsAfter, fIsBetween } from '~/utils/format-time';

import { DashboardContent } from '~/layouts/dashboard';
import { _tours, _tourGuides, SORT_OPTIONS } from '~/_mock';

import { Iconify } from '~/components/iconify';
import { EmptyContent } from '~/components/empty-content';
import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { KanbanList } from '../kanban-list';
import { KanbanSort } from '../kanban-sort';
import { KanbanSearch } from '../kanban-search';
import { KanbanFilters } from '../kanban-filters';
import { KanbanFiltersResult } from '../kanban-filters-result';
import { KanbanDialog } from '../kanban-dialog';

import { useKanban } from '~/actions/kanban/useKanban';

export function KanbanListView() {
    const openFilters = useBoolean();
    const dialog = useBoolean();

    // Lấy danh sách boards
    const { boards, sortBy, setSortBy } = useKanban();

    const search = useSetState({ query: '', results: [] });

    //[ ] modify filters
    const filters = useSetState({
        boardGuides: [],
        startDate: null,
        endDate: null,
    });


    const handleClickOpen = useCallback(() => {
        dialog.onTrue();
    }, [dialog]);

    const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

    const dataFiltered = useMemo(() => {
        return applyFilter({
            inputData: boards,
            filters: filters.state,
            sortBy,
            dateError,
        });
    }, [boards, filters.state, sortBy, dateError]);

    const canReset = filters.state.boardGuides.length > 0 || (!!filters.state.startDate && !!filters.state.endDate);

    const notFound = !dataFiltered.length; // && canReset;

    const handleSortBy = useCallback(
        (newValue) => {
            setSortBy(newValue);
        },
        [setSortBy],
    );

    const handleSearch = useCallback(
        (inputValue) => {
            search.setState({ query: inputValue });

            const results = boards.filter((board) => board.title.toLowerCase().includes(inputValue.toLowerCase()));

            search.setState({ results });
        },
        [boards, search],
    );

    const renderFilters = (
        <Stack
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-end', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
        >
            <KanbanSearch search={search} onSearch={handleSearch} />

            <Stack direction="row" spacing={1} flexShrink={0}>
                {/* [ ]: Modify filters */}
                {/* <KanbanFilters
                    filters={filters}
                    canReset={canReset}
                    dateError={dateError}
                    open={openFilters.value}
                    onOpen={openFilters.onTrue}
                    onClose={openFilters.onFalse}
                    options={{
                        boardGuides: _tourGuides,
                    }}
                /> */}

                <KanbanSort sort={sortBy} onSort={handleSortBy} sortOptions={SORT_OPTIONS} />
            </Stack>
        </Stack>
    );

    const renderResults = <KanbanFiltersResult filters={filters} totalResults={dataFiltered.length} />;

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="List"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Kanban', href: paths.dashboard.kanban.root },
                    { name: 'List' },
                ]}
                action={
                    <Button
                        // href={paths.dashboard.kanban.new}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleClickOpen}
                    >
                        New Kanban
                    </Button>
                }
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
                {renderFilters}

                {canReset && renderResults}
            </Stack>

            {notFound && <EmptyContent filled sx={{ py: 10 }} />}
            <KanbanList boards={dataFiltered} />

            <KanbanDialog dialog={dialog} />
        </DashboardContent>
    );
}

const applyFilter = ({ inputData, filters, sortBy, dateError }) => {
    const { startDate, endDate, boardGuides } = filters;

    const boardGuideIds = boardGuides.map((boardGuide) => boardGuide.id);

    // Luôn luôn ưu tiên Starred trước
    let sortFields = ['starred'];
    let sortOrders = ['desc'];

    // Thêm các tiêu chí sắp xếp theo sortBy
    if (sortBy === 'latest') {
        sortFields.push('createdAt');
        sortOrders.push('desc');
    }

    if (sortBy === 'oldest') {
        sortFields.push('createdAt');
        sortOrders.push('asc');
    }

    if (sortBy === 'popular') {
        sortFields.push('totalViews');
        sortOrders.push('desc');
    }

    // Sắp xếp theo các tiêu chí đã xác định
    inputData = orderBy(inputData, sortFields, sortOrders);

    // Filter theo Guide
    if (boardGuideIds.length) {
        inputData = inputData.filter((board) =>
            board.boardGuides.some((filterItem) => boardGuideIds.includes(filterItem.id)),
        );
    }

    // Filter theo Date
    if (!dateError) {
        if (startDate && endDate) {
            inputData = inputData.filter((board) =>
                fIsBetween(startDate, board.available.startDate, board.available.endDate),
            );
        }
    }

    return inputData;
};
