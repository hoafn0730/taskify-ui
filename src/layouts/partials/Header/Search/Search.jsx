import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { boardService } from '~/services/boardService';

function Search() {
    const { t } = useTranslation('header');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const debounceValue = useDebounce(searchValue, 800);
    const inputRef = useRef();

    useEffect(() => {
        if (!debounceValue.trim()) return setSearchResult([]);

        // call search
        boardService.searchBoards(debounceValue.trim()).then((res) => setSearchResult(res.data));
    }, [debounceValue]);

    return (
        <Box>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive={true}
                placement="bottom"
                render={(attrs) => {
                    return (
                        <Box sx={{ width: '320px', bgcolor: 'common.white', boxShadow: 4, borderRadius: 2 }} {...attrs}>
                            {searchResult.length > 0 &&
                                searchResult.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        sx={{ py: 2, alignItems: 'center' }}
                                        component={Link}
                                        to={'/board/' + item.slug}
                                    >
                                        <ListItemIcon>
                                            <DashboardRoundedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>{item.title}</ListItemText>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            <KeyboardArrowRightRoundedIcon sx={{ my: 'auto' }} />
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </Box>
                    );
                }}
                onClickOutside={() => setShowResult(false)}
            >
                <TextField
                    ref={inputRef}
                    value={searchValue}
                    id="outlined-search"
                    label={t('search')}
                    type="text"
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: '120px',
                        width: '180px',
                        transition: 'width 0.3s ease',

                        '&:focus-within': {
                            width: '320px',
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Tooltip title={t('search')}>
                                    <SearchIcon
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    />
                                </Tooltip>
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
                    onFocus={() => setShowResult(true)}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </HeadlessTippy>
        </Box>
    );
}

export default Search;
