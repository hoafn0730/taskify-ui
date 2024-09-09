import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function Search() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <TextField
            value={searchValue}
            id="outlined-search"
            label="Search"
            type="text"
            variant="outlined"
            size="small"
            sx={{
                minWidth: '120px',
                maxWidth: '180px',
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                    </InputAdornment>
                ),
                endAdornment: (
                    <>
                        {searchValue && (
                            <InputAdornment position="end">
                                <CloseIcon
                                    fontSize="small"
                                    sx={{
                                        color: 'warning.light',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setSearchValue('')}
                                />
                            </InputAdornment>
                        )}
                    </>
                ),
            }}
            onChange={(e) => setSearchValue(e.target.value)}
        />
    );
}

export default Search;
