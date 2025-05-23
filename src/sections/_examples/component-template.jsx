import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { useEventListener } from '~/hooks/use-event-listener';

// ----------------------------------------------------------------------

export function ScrollToViewTemplate({
  sx,
  data,
  slotProps,

  // 0 ~ 1 => 0% => 100%
  offsetValue = 0.3,

  queryClassName = 'scroll__to__view',
  ...other
}) {
  const [activeSection, setActiveSection] = useState(0);

  const handleScroll = useCallback(() => {
    const innerHeight = window.innerHeight * offsetValue;
    const scrollPosition = window.scrollY + innerHeight;
    const sections = document.querySelectorAll(`.${queryClassName}`);

    let newActiveSection = null;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        newActiveSection = index;
      }
    });

    setActiveSection(newActiveSection);
  }, [offsetValue, queryClassName]);

  useEventListener('scroll', handleScroll);

  const scrollToView = useCallback(
    (index) => {
      const sections = document.querySelectorAll(`.${queryClassName}`);

      if (sections && sections.length > index) {
        const element = sections[index];
        const offsetTop = element.offsetTop - 160;

        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    },
    [queryClassName]
  );

  const renderNav = (
    <Stack
      component="nav"
      sx={{
        top: 80,
        width: 240,
        flexShrink: 0,
        position: 'sticky',
        display: { xs: 'none', md: 'flex' },
        ...slotProps?.nav,
      }}
    >
      <Box
        component="ul"
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {data.map((section, index) => (
          <Box key={section.name} component="li" sx={{ display: 'flex' }}>
            <Link
              underline="none"
              onClick={() => scrollToView(index)}
              sx={{
                cursor: 'pointer',
                typography: 'body2',
                color: 'text.disabled',
                ...(activeSection === index && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {index + 1} - {section.name}
            </Link>
          </Box>
        ))}
      </Box>
    </Stack>
  );

  const renderSection = (
    <Stack
      component="section"
      spacing={5}
      flex="1 1 auto"
      sx={{
        minWidth: 0,
        borderRadius: 2,
        p: { xs: 3, md: 5 },
        bgcolor: 'background.neutral',
        ...slotProps?.section,
      }}
    >
      {data.map((section) => (
        <Card key={section.name} className={queryClassName}>
          <CardHeader title={section.name} />
          <CardContent>{section.component}</CardContent>
        </Card>
      ))}
    </Stack>
  );

  return (
    <Container {...slotProps?.container}>
      <Stack
        spacing={5}
        direction="row"
        alignItems="flex-start"
        sx={{ pt: 10, pb: 15, ...sx }}
        {...other}
      >
        {renderNav}
        {renderSection}
      </Stack>
    </Container>
  );
}
