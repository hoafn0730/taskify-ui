import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { Iconify } from '~/components/iconify';
import { SearchNotFound } from '~/components/search-not-found';

// ----------------------------------------------------------------------

export function KanbanSearch({ search, onSearch }) {
    const router = useRouter();

    const { state } = search;

    const handleClick = (id) => {
        router.push(paths.dashboard.kanban.details(id));
    };

    const handleKeyUp = (event) => {
        if (state.query) {
            if (event.key === 'Enter') {
                const selectProduct = state.results.filter((board) => board.name === state.query)[0];

                handleClick(selectProduct.slug);
            }
        }
    };

    return (
        <Autocomplete
            sx={{ width: { xs: 1, sm: 260 } }}
            autoHighlight
            popupIcon={null}
            options={state.results}
            onInputChange={(event, newValue) => onSearch(newValue)}
            getOptionLabel={(option) => option.title}
            noOptionsText={<SearchNotFound query={state.query} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            slotProps={{
                popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
                paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search..."
                    onKeyUp={handleKeyUp}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
            renderOption={(props, board, { inputValue }) => {
                const matches = match(board.title, inputValue);
                const parts = parse(board.title, matches);

                return (
                    <Box component="li" {...props} onClick={() => handleClick(board.slug)} key={board.id}>
                        <Avatar
                            key={board.id}
                            alt={board.title}
                            src={board.image}
                            variant="rounded"
                            sx={{
                                mr: 1.5,
                                width: 48,
                                height: 48,
                                flexShrink: 0,
                                borderRadius: 1,
                            }}
                        />

                        <div key={inputValue}>
                            {parts.map((part, index) => (
                                <Typography
                                    key={index}
                                    component="span"
                                    color={part.highlight ? 'primary' : 'textPrimary'}
                                    sx={{
                                        typography: 'body2',
                                        fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                                    }}
                                >
                                    {part.text}
                                </Typography>
                            ))}
                        </div>
                    </Box>
                );
            }}
        />
    );
}
