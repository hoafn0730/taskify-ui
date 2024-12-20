import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

// eslint-disable-next-line react/prop-types
export default function DateTimePicker({ value, onChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDateTimePicker
                label="Date time picker"
                value={value}
                onChange={onChange}
                referenceDate={dayjs('2022-04-17T15:30')}
            />
        </LocalizationProvider>
    );
}
