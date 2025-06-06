import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { Iconify } from '~/components/iconify';
import { usePopover, CustomPopover } from '~/components/custom-popover';

// ----------------------------------------------------------------------

export function KanbanSort({ sort, onSort, sortOptions }) {
    const popover = usePopover();

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                onClick={popover.onOpen}
                endIcon={<Iconify icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />}
                sx={{ fontWeight: 'fontWeightSemiBold' }}
            >
                Sort by:
                <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold', textTransform: 'capitalize' }}>
                    {sort}
                </Box>
            </Button>

            <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
                <MenuList>
                    {sortOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === sort}
                            onClick={() => {
                                popover.onClose();
                                onSort(option.value);
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
