import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from '~/components/iconify';
import { Scrollbar } from '~/components/scrollbar';
import { CountrySelect } from '~/components/country-select';

// ----------------------------------------------------------------------

export function KanbanFilters({ open, onOpen, onClose, filters, options, canReset, dateError }) {
    const handleFilterStartDate = useCallback(
        (newValue) => {
            filters.setState({ startDate: newValue });
        },
        [filters],
    );

    const handleFilterEndDate = useCallback(
        (newValue) => {
            filters.setState({ endDate: newValue });
        },
        [filters],
    );

    const handleFilterKanbanGuide = useCallback(
        (newValue) => {
            filters.setState({ boardGuides: newValue });
        },
        [filters],
    );

    const renderHead = (
        <>
            <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Filters
                </Typography>

                <Tooltip title="Reset">
                    <IconButton onClick={filters.onResetState}>
                        <Badge color="error" variant="dot" invisible={!canReset}>
                            <Iconify icon="solar:restart-bold" />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <IconButton onClick={onClose}>
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />
        </>
    );

    const renderDateRange = (
        <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Durations
            </Typography>

            <DatePicker
                label="Start date"
                value={filters.state.startDate}
                onChange={handleFilterStartDate}
                sx={{ mb: 2.5 }}
            />

            <DatePicker
                label="End date"
                value={filters.state.endDate}
                onChange={handleFilterEndDate}
                slotProps={{
                    textField: {
                        error: dateError,
                        helperText: dateError ? 'End date must be later than start date' : null,
                    },
                }}
            />
        </Box>
    );

    const renderKanbanGuide = (
        <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Kanban guide
            </Typography>

            <Autocomplete
                multiple
                disableCloseOnSelect
                options={options.boardGuides}
                value={filters.state.boardGuides}
                onChange={(event, newValue) => handleFilterKanbanGuide(newValue)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField placeholder="Select Kanban Guides" {...params} />}
                renderOption={(props, boardGuide) => (
                    <li {...props} key={boardGuide.id}>
                        <Avatar
                            key={boardGuide.id}
                            alt={boardGuide.avatarUrl}
                            src={boardGuide.avatarUrl}
                            sx={{ mr: 1, width: 24, height: 24, flexShrink: 0 }}
                        />

                        {boardGuide.name}
                    </li>
                )}
                renderTags={(selected, getTagProps) =>
                    selected.map((boardGuide, index) => (
                        <Chip
                            {...getTagProps({ index })}
                            key={boardGuide.id}
                            size="small"
                            variant="soft"
                            label={boardGuide.name}
                            avatar={<Avatar alt={boardGuide.name} src={boardGuide.avatarUrl} />}
                        />
                    ))
                }
            />
        </Box>
    );

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                endIcon={
                    <Badge color="error" variant="dot" invisible={!canReset}>
                        <Iconify icon="ic:round-filter-list" />
                    </Badge>
                }
                onClick={onOpen}
            >
                Filters
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: 320 } }}
            >
                {renderHead}

                <Scrollbar sx={{ px: 2.5, py: 3 }}>
                    <Stack spacing={3}>
                        {renderDateRange}
                        {renderKanbanGuide}
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    );
}
