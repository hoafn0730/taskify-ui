import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCard from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';

function Footer() {
    return (
        <Box
            sx={{
                height: (theme) => theme.app.cardFooterHeight,
                p: 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button startIcon={<AddCard />}>Add new card</Button>
                <Tooltip title="drag to move">
                    <DragHandleIcon
                        sx={{
                            cursor: 'pointer',
                        }}
                    />
                </Tooltip>
            </Box>

            {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    bgcolor: '#ffffffed',
                    gap: 1,
                }}
            >
                <TextField
                    value={newCardTitle}
                    data-no-dnd={true}
                    label="Enter card title"
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
                    onChange={onChangeNewCardTitle}
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
                        Add
                    </Button>
                    <CloseIcon
                        fontSize="small"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                            cursor: 'pointer',
                            '&:hover': { color: (theme) => theme.palette.warning.light },
                        }}
                        onClick={onOpenNewCardForm}
                    />
                </Box>
            </Box> */}
        </Box>
    );
}

export default Footer;
