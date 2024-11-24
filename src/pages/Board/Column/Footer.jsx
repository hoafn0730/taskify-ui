import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCard from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Footer({ openNewCardForm, newCardTitle, onChangeCardTitle, onAddNewCard, onCloseCardForm }) {
    const { t } = useTranslation('board');

    return (
        <Box
            sx={{
                // height: (theme) => theme.app.columnFooterHeight,
                p: 1,
            }}
        >
            {!openNewCardForm ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button startIcon={<AddCard />} onClick={onCloseCardForm}>
                        {t('addNewCard')}
                    </Button>
                    <Tooltip title={t('dragToMove')}>
                        <DragHandleIcon
                            sx={{
                                cursor: 'pointer',
                            }}
                        />
                    </Tooltip>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        bgcolor: '#ffffffed',
                        gap: 1,
                    }}
                >
                    <TextField
                        value={newCardTitle}
                        data-no-dnd={true}
                        label={t('enterCardTitle')}
                        type="text"
                        variant="outlined"
                        size="small"
                        autoFocus
                        sx={{
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
                        onChange={onChangeCardTitle}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            data-no-dnd={true}
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
                            onClick={onAddNewCard}
                        >
                            {t('addCard')}
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
                            onClick={onCloseCardForm}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

Footer.propTypes = {
    openNewCardForm: PropTypes.bool,
    newCardTitle: PropTypes.string,
    onChangeCardTitle: PropTypes.func,
    onAddNewCard: PropTypes.func,
    onCloseCardForm: PropTypes.func,
};

export default Footer;
