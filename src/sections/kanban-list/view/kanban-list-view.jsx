import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from '~/configs/paths';

import { useBoolean } from '~/hooks/use-boolean';
import { useSetState } from '~/hooks/use-set-state';

import { orderBy } from '~/utils/helper';
import { fIsAfter, fIsBetween } from '~/utils/format-time';

import { DashboardContent } from '~/layouts/dashboard';
import { _tours, _tourGuides, TOUR_SORT_OPTIONS, TOUR_SERVICE_OPTIONS } from '~/_mock';

import { Iconify } from '~/components/iconify';
import { EmptyContent } from '~/components/empty-content';
import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { KanbanList } from '../kanban-list';
import { KanbanSort } from '../kanban-sort';
import { KanbanSearch } from '../kanban-search';
import { KanbanFilters } from '../kanban-filters';
import { KanbanFiltersResult } from '../kanban-filters-result';
import { KanbanDialog } from '../kanban-dialog';

// ----------------------------------------------------------------------

export function KanbanListView() {
    const openFilters = useBoolean();
    const dialog = useBoolean();

    const [sortBy, setSortBy] = useState('latest');

    const search = useSetState({ query: '', results: [] });

    const filters = useSetState({
        destination: [],
        boardGuides: [],
        services: [],
        startDate: null,
        endDate: null,
    });

    const handleClickOpen = useCallback(() => {
        dialog.onTrue();
    }, [dialog]);

    const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

    const dataFiltered = applyFilter({
        inputData: _tours,
        filters: filters.state,
        sortBy,
        dateError,
    });

    const canReset =
        filters.state.destination.length > 0 ||
        filters.state.boardGuides.length > 0 ||
        filters.state.services.length > 0 ||
        (!!filters.state.startDate && !!filters.state.endDate);

    const notFound = !dataFiltered.length && canReset;

    const handleSortBy = useCallback((newValue) => {
        setSortBy(newValue);
    }, []);

    const handleSearch = useCallback(
        (inputValue) => {
            search.setState({ query: inputValue });

            if (inputValue) {
                const results = _tours.filter(
                    (board) => board.name.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1,
                );

                search.setState({ results });
            }
        },
        [search],
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
                <KanbanFilters
                    filters={filters}
                    canReset={canReset}
                    dateError={dateError}
                    open={openFilters.value}
                    onOpen={openFilters.onTrue}
                    onClose={openFilters.onFalse}
                    options={{
                        boardGuides: _tourGuides,
                        services: TOUR_SERVICE_OPTIONS.map((option) => option.label),
                    }}
                />

                <KanbanSort sort={sortBy} onSort={handleSortBy} sortOptions={TOUR_SORT_OPTIONS} />
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
    const { services, destination, startDate, endDate, boardGuides } = filters;

    const boardGuideIds = boardGuides.map((boardGuide) => boardGuide.id);

    // Sort by
    if (sortBy === 'latest') {
        inputData = orderBy(inputData, ['createdAt'], ['desc']);
    }

    if (sortBy === 'oldest') {
        inputData = orderBy(inputData, ['createdAt'], ['asc']);
    }

    if (sortBy === 'popular') {
        inputData = orderBy(inputData, ['totalViews'], ['desc']);
    }

    // Filters
    if (destination.length) {
        inputData = inputData.filter((tour) => destination.includes(tour.destination));
    }

    if (boardGuideIds.length) {
        inputData = inputData.filter((tour) =>
            tour.boardGuides.some((filterItem) => boardGuideIds.includes(filterItem.id)),
        );
    }

    if (services.length) {
        inputData = inputData.filter((tour) => tour.services.some((item) => services.includes(item)));
    }

    if (!dateError) {
        if (startDate && endDate) {
            inputData = inputData.filter((tour) =>
                fIsBetween(startDate, tour.available.startDate, tour.available.endDate),
            );
        }
    }

    return inputData;
};
