import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from '~/theme/styles';

import { Image } from '~/components/image';
import { Iconify } from '~/components/iconify';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowFloatButtons,
} from '~/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselRightToLeft({ data }) {
  const carousel = useCarousel({ direction: 'rtl' });

  return (
    <Box dir="rtl" sx={{ position: 'relative' }}>
      <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} index={index} item={item} />
        ))}
      </Carousel>

      <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          top: 16,
          right: 16,
          color: 'info.main',
          position: 'absolute',
        }}
      />
    </Box>
  );
}

function CarouselItem({ item, index }) {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative' }}>
      <IndexLabel index={index + 1} />

      <Image
        visibleByDefault
        alt={item.title}
        src={item.coverUrl}
        ratio={{ xs: '4/3', sm: '16/10' }}
        slotProps={{
          overlay: {
            background: `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.common.blackChannel, 0)} 20%, ${theme.vars.palette.grey[900]} 80%)`,
          },
        }}
      />

      <Box
        gap={2}
        display="flex"
        alignItems="center"
        sx={{
          p: 3,
          left: 0,
          width: 1,
          bottom: 0,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography
          component="h6"
          sx={{
            flexGrow: 1,
            typography: { xs: 'subtitle2', sm: 'h6' },
          }}
        >
          {item.title}
        </Typography>

        <IconButton color="inherit">
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
      </Box>
    </Box>
  );
}
