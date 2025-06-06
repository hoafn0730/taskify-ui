import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from '~/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from '~/components/filters-result';

export function ListTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
    const handleRemoveKeyword = useCallback(() => {
        onResetPage();
        filters.setState({ name: '' });
    }, [filters, onResetPage]);

    const handleRemoveDate = useCallback(() => {
        onResetPage();
        filters.setState({ startDate: null, endDate: null });
    }, [filters, onResetPage]);

    const handleReset = useCallback(() => {
        onResetPage();
        filters.onResetState();
    }, [filters, onResetPage]);

    return (
        <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
            <FiltersBlock label="Date:" isShow={Boolean(filters.state.startDate && filters.state.endDate)}>
                <Chip
                    {...chipProps}
                    label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
                    onDelete={handleRemoveDate}
                />
            </FiltersBlock>

            <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
                <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
            </FiltersBlock>
        </FiltersResult>
    );
}
