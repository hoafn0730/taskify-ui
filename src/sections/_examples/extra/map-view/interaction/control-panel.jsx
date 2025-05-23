import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

import { varAlpha } from '~/theme/styles';

import { StyledControlPanel } from '../styles';

// ----------------------------------------------------------------------

const StyledRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'capitalize',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  '&:not(:last-of-type)': { marginBottom: theme.spacing(1) },
}));

// ----------------------------------------------------------------------

const camelPattern = /(^|[A-Z])[a-z]*/g;

function formatSettingName(name) {
  return name.match(camelPattern)?.join(' ');
}

// ----------------------------------------------------------------------

export function ControlPanel({ settings, onChange }) {
  const renderSetting = (name, value) => {
    switch (typeof value) {
      case 'boolean':
        return (
          <StyledRow key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <Switch
              size="small"
              checked={value}
              onChange={(event) => onChange(name, event.target.checked)}
            />
          </StyledRow>
        );
      case 'number':
        return (
          <StyledRow key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <InputBase
              value={value}
              onChange={(event) => onChange(name, Number(event.target.value))}
              inputProps={{ type: 'number' }}
              sx={{
                '& input': {
                  py: 0.25,
                  width: 40,
                  fontSize: 14,
                  borderRadius: 0.5,
                  textAlign: 'center',
                  color: 'common.white',
                  bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
                },
              }}
            />
          </StyledRow>
        );
      default:
        return null;
    }
  };

  return (
    <StyledControlPanel>
      {Object.keys(settings).map((name) => renderSetting(name, settings[name]))}
    </StyledControlPanel>
  );
}
