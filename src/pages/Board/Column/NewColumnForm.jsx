import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function NewColumnForm({ openNewColumnForm, newColumnTitle, setNewColumnTitle, toggleNewColumnForm, onAddNewColumn }) {
    const { t } = useTranslation('board');

    return (
        <div>
            <>
                {!openNewColumnForm ? (
                    <Box
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#ffffffed',
                        }}
                    >
                        <Button
                            sx={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                pl: 2.5,
                                py: 1,
                                // bgcolor: 'rgba(255, 255, 255, 0.16)',
                                // color: (theme) =>
                                //     theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main',
                                '&:hover': {
                                    color: (theme) => theme.palette.mode === 'dark' && theme.palette.primary.main,
                                    bgcolor: (theme) => theme.palette.mode === 'dark' && theme.palette.primary['50'],
                                },
                            }}
                            startIcon={<NoteAddIcon />}
                            onClick={toggleNewColumnForm}
                        >
                            {t('addNewColumn')}
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            p: 1,
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#ffffffed',
                        }}
                    >
                        <TextField
                            value={newColumnTitle}
                            label={t('enterColumnTitle')}
                            type="text"
                            variant="outlined"
                            size="small"
                            autoFocus
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.common.white
                                                : theme.palette.primary.main,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.common.white
                                                : theme.palette.primary.main,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.common.white
                                                : theme.palette.primary.main,
                                    },
                                },
                            }}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', marginTop: 1, alignItems: 'center', gap: 1 }}>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                    color: 'white',
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': { bgcolor: (theme) => theme.palette.success.main },
                                }}
                                onClick={onAddNewColumn}
                            >
                                {t('addColumn')}
                            </Button>
                            <CloseIcon
                                sx={{
                                    color: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                    cursor: 'pointer',
                                    '&:hover': { color: (theme) => theme.palette.warning.light },
                                }}
                                onClick={() => {
                                    toggleNewColumnForm();
                                    setNewColumnTitle('');
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </>
        </div>
    );
}

NewColumnForm.propTypes = {
    openNewColumnForm: PropTypes.bool,
    newColumnTitle: PropTypes.string,
    setNewColumnTitle: PropTypes.func,
    toggleNewColumnForm: PropTypes.func,
    onAddNewColumn: PropTypes.func,
};

export default NewColumnForm;
