import { useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import { fDateRangeShortLabel } from '~/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from '~/components/filters-result';

export function KanbanFiltersResult({ filters, totalResults, sx }) {
    const handleRemoveAvailable = useCallback(() => {
        filters.setState({ startDate: null, endDate: null });
    }, [filters]);

    const handleRemoveKanbanGuide = useCallback(
        (inputValue) => {
            const newValue = filters.state.boardGuides.filter((item) => item.name !== inputValue.name);

            filters.setState({ boardGuides: newValue });
        },
        [filters],
    );

    return (
        <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
            <FiltersBlock label="Available:" isShow={Boolean(filters.state.startDate && filters.state.endDate)}>
                <Chip
                    {...chipProps}
                    label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
                    onDelete={handleRemoveAvailable}
                />
            </FiltersBlock>

            <FiltersBlock label="Kanban guide:" isShow={!!filters.state.boardGuides.length}>
                {filters.state.boardGuides.map((item) => (
                    <Chip
                        {...chipProps}
                        key={item.id}
                        avatar={<Avatar alt={item.name} src={item.avatarUrl} />}
                        label={item.name}
                        onDelete={() => handleRemoveKanbanGuide(item)}
                    />
                ))}
            </FiltersBlock>
        </FiltersResult>
    );
}
