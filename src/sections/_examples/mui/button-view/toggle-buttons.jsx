import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Iconify } from '~/components/iconify';

import { ComponentBlock } from '../../component-block';

// ----------------------------------------------------------------------

const COLORS = ['standard', 'primary', 'secondary', 'info', 'success', 'warning', 'error'];

const SIZES = ['small', 'medium', 'large'];

// ----------------------------------------------------------------------

export function ToggleButtons() {
  const [alignment, setAlignment] = useState('left');

  const [formats, setFormats] = useState(() => ['bold', 'italic']);

  const [view, setView] = useState('list');

  const [selected, setSelected] = useState(true);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const viewContent = [
    <ToggleButton key="list" value="list">
      <Iconify icon="ic:round-view-list" />
    </ToggleButton>,
    <ToggleButton key="module" value="module">
      <Iconify icon="ic:round-view-module" />
    </ToggleButton>,
    <ToggleButton key="quilt" value="quilt">
      <Iconify icon="ic:round-view-quilt" />
    </ToggleButton>,
  ];

  const alignContent = [
    <ToggleButton key="left" value="left">
      <Iconify icon="ic:round-format-align-left" />
    </ToggleButton>,
    <ToggleButton key="center" value="center">
      <Iconify icon="ic:round-format-align-center" />
    </ToggleButton>,
    <ToggleButton key="right" value="right">
      <Iconify icon="ic:round-format-align-right" />
    </ToggleButton>,
    <ToggleButton key="justify" value="justify" disabled>
      <Iconify icon="ic:round-format-align-justify" />
    </ToggleButton>,
  ];

  const formatContent = [
    <ToggleButton key="bold" value="bold">
      <Iconify icon="ic:round-format-bold" />
    </ToggleButton>,
    <ToggleButton key="italic" value="italic">
      <Iconify icon="ic:round-format-italic" />
    </ToggleButton>,
    <ToggleButton key="underlined" value="underlined">
      <Iconify icon="ic:round-format-underlined" />
    </ToggleButton>,
    <ToggleButton key="color" value="color" disabled>
      <Iconify icon="ic:baseline-format-color-fill" />
      <Iconify icon="ic:baseline-arrow-drop-down" />
    </ToggleButton>,
  ];

  return (
    <Stack
      rowGap={5}
      columnGap={2.5}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
    >
      <ComponentBlock title="Exclusive selection">
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
          {alignContent}
        </ToggleButtonGroup>
      </ComponentBlock>

      <ComponentBlock title="Multiple selection">
        <ToggleButtonGroup value={formats} onChange={handleFormat}>
          {formatContent}
        </ToggleButtonGroup>
      </ComponentBlock>

      <ComponentBlock title="Sizes">
        {SIZES.map((size) => (
          <ToggleButton key={size} size={size} value="check">
            <Iconify icon="eva:checkmark-fill" />
          </ToggleButton>
        ))}

        {SIZES.map((size) => (
          <ToggleButtonGroup
            exclusive
            key={size}
            size={size}
            value={alignment}
            onChange={handleAlignment}
          >
            {alignContent}
          </ToggleButtonGroup>
        ))}
      </ComponentBlock>

      <ComponentBlock title="Disabled">
        <ToggleButton value="check" disabled>
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>

        <ToggleButton value="check" disabled selected>
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>

        <ToggleButtonGroup value="left" exclusive>
          {alignContent}
        </ToggleButtonGroup>

        <ToggleButtonGroup disabled value="left" exclusive>
          {alignContent}
        </ToggleButtonGroup>
      </ComponentBlock>

      <ComponentBlock title="Colors">
        {COLORS.map((color) => (
          <ToggleButtonGroup
            exclusive
            key={color}
            color={color}
            value={view}
            onChange={handleChange}
          >
            {viewContent}
          </ToggleButtonGroup>
        ))}

        <Box sx={{ display: 'block', width: 1, height: 16 }} />

        {COLORS.map((color) => (
          <ToggleButton
            key={color}
            color={color}
            value="check"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <Iconify icon="eva:checkmark-fill" />
          </ToggleButton>
        ))}
      </ComponentBlock>

      <ComponentBlock title="Vertical & Standalone buttons">
        <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
          {viewContent}
        </ToggleButtonGroup>

        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>
      </ComponentBlock>
    </Stack>
  );
}
