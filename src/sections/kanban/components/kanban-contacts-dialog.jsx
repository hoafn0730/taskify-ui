import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from '~/components/iconify';
import { Scrollbar } from '~/components/scrollbar';
import { SearchNotFound } from '~/components/search-not-found';

const ITEM_HEIGHT = 64;

export function KanbanContactsDialog({ assignees = [], reporter, open, onClose, onToggleAssignee }) {
    const { activeBoard: board } = useSelector((state) => state.kanban);

    const [searchContact, setSearchContact] = useState('');

    const handleSearchContacts = useCallback((event) => {
        setSearchContact(event.target.value);
    }, []);

    const dataFiltered = applyFilter({ inputData: board?.members, query: searchContact });

    const notFound = !dataFiltered.length && !!searchContact;

    const handleToggleAssignee = (contact) => {
        if (onToggleAssignee) {
            onToggleAssignee(contact);
        }
    };

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 0 }}>
                Contacts{' '}
                <Typography component="span">
                    ({board?.members?.filter((as) => as.id !== reporter?.id).length})
                </Typography>
            </DialogTitle>

            <Box sx={{ px: 3, py: 2.5 }}>
                <TextField
                    fullWidth
                    value={searchContact}
                    onChange={handleSearchContacts}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <DialogContent sx={{ p: 0 }}>
                {notFound ? (
                    <SearchNotFound query={searchContact} sx={{ mt: 3, mb: 10 }} />
                ) : (
                    <Scrollbar sx={{ height: ITEM_HEIGHT * 6, px: 2.5 }}>
                        <Box component="ul">
                            {dataFiltered
                                .filter((as) => as.id !== reporter?.id)
                                .map((contact) => {
                                    const checked = assignees
                                        .filter((as) => as.id !== reporter?.id)
                                        .map((person) => person.id)
                                        .includes(contact.id);

                                    return (
                                        <Box
                                            component="li"
                                            key={contact.id}
                                            sx={{
                                                gap: 2,
                                                display: 'flex',
                                                height: ITEM_HEIGHT,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Avatar src={contact.avatar} />

                                            <ListItemText
                                                primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                                                secondaryTypographyProps={{ typography: 'caption' }}
                                                primary={contact.displayName}
                                                secondary={contact.email}
                                            />

                                            <Button
                                                size="small"
                                                color={checked ? 'primary' : 'inherit'}
                                                startIcon={
                                                    <Iconify
                                                        width={16}
                                                        icon={checked ? 'eva:checkmark-fill' : 'mingcute:add-line'}
                                                        sx={{ mr: -0.5 }}
                                                    />
                                                }
                                                onClick={() => handleToggleAssignee(contact)}
                                            >
                                                {checked ? 'Assigned' : 'Assign'}
                                            </Button>
                                        </Box>
                                    );
                                })}
                        </Box>
                    </Scrollbar>
                )}
            </DialogContent>
        </Dialog>
    );
}

function applyFilter({ inputData, query }) {
    if (query) {
        inputData = inputData.filter(
            (contact) =>
                contact.displayName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1,
        );
    }

    return inputData;
}
