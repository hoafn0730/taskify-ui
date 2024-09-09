import { useColorScheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

function ModeSelect() {
    const { mode, setMode } = useColorScheme();

    if (!mode) {
        return null;
    }

    return (
        <FormControl size="small" sx={{ minWidth: '120px' }}>
            <InputLabel>Mode</InputLabel>
            <Select
                labelId="select-dark-light-mode-label"
                id="select-dark-light-mode"
                value={mode}
                label="dark-light-mode"
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                    },
                }}
                onChange={(event) => setMode(event.target.value)}
            >
                <MenuItem value={'light'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LightModeIcon fontSize="small" />
                        Light
                    </Box>
                </MenuItem>
                <MenuItem value={'dark'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DarkModeOutlinedIcon fontSize="small" />
                        Dark
                    </Box>
                </MenuItem>
                <MenuItem value={'system'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SettingsBrightnessIcon fontSize="small" />
                        System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}

export default ModeSelect;
