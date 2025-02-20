import { createTheme } from '@mui/material';

const HEADER_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '64px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

const theme = createTheme({
    app: {
        headerHeight: HEADER_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#16a085',
                },
                // ...other tokens
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#E0C2FF',
                },
                // ...other tokens
            },
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    scrollBehavior: 'smooth',
                },
                body: {
                    '*::-webkit-scrollbar': { width: '6px', height: '6px' },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#dcdde1',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: '#bfc2cf',
                        },
                    },

                    touchAction: 'manipulation',
                    overscrollBehavior: 'none',
                },
                a: {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: () => ({
                    // color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                    fontSize: '0.875rem',

                    '& fieldset': {
                        borderWidth: '0.5px !important',
                    },
                    '&:hover fieldset': {
                        borderWidth: '1px !important',
                    },
                    '&.Mui-focused fieldset': {
                        borderWidth: '1px !important',
                    },
                }),
            },
        },
    },
});

export default theme;
