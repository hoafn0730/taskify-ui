import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from '~/components/router-link';

import { fDateTime } from '~/utils/format-time';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { usePopover, CustomPopover } from '~/components/custom-popover';

// ----------------------------------------------------------------------

export function OrderDetailsToolbar({ status, backLink, createdAt, orderNumber, statusOptions, onChangeStatus }) {
    const popover = usePopover();

    return (
        <>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: { xs: 3, md: 5 } }}>
                <Stack spacing={1} direction="row" alignItems="flex-start">
                    <IconButton component={RouterLink} href={backLink}>
                        <Iconify icon="eva:arrow-ios-back-fill" />
                    </IconButton>

                    <Stack spacing={0.5}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography variant="h4"> Order {orderNumber} </Typography>
                            <Label
                                variant="soft"
                                color={
                                    (status === 'completed' && 'success') ||
                                    (status === 'pending' && 'warning') ||
                                    (status === 'cancelled' && 'error') ||
                                    'default'
                                }
                            >
                                {status}
                            </Label>
                        </Stack>

                        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                            {fDateTime(createdAt)}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack flexGrow={1} spacing={1.5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Button
                        color="inherit"
                        variant="outlined"
                        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                        onClick={popover.onOpen}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {status}
                    </Button>

                    <Button
                        color="inherit"
                        variant="outlined"
                        startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
                    >
                        Print
                    </Button>

                    <Button color="inherit" variant="contained" startIcon={<Iconify icon="solar:pen-bold" />}>
                        Edit
                    </Button>
                </Stack>
            </Stack>

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: 'top-right' } }}
            >
                <MenuList>
                    {statusOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === status}
                            onClick={() => {
                                popover.onClose();
                                onChangeStatus(option.value);
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </CustomPopover>
        </>
    );
}
