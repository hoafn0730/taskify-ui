import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDateTimePicker sx={{ width: '100%' }} label="Date time picker" />
        </LocalizationProvider>
    );
}
