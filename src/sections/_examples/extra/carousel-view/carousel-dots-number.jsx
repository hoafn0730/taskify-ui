import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { maxLine, varAlpha, bgGradient } from '~/theme/styles';

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

export function CarouselDotsNumber({ data }) {
  const carousel = useCarousel({
    loop: true,
    dragFree: true,
    slideSpacing: '20px',
    slidesToShow: { xs: 1, sm: 2, md: '36%' },
  });

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Carousel carousel={carousel}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
          ))}
        </Carousel>

        <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />
      </Box>

      <CarouselDotButtons
        variant="number"
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ mt: 5, mb: 2, width: 1, justifyContent: 'center' }}
      />
    </>
  );
}

function CarouselItem({ item, index }) {
  const theme = useTheme();

  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <IndexLabel index={index + 1} />

      <Image visibleByDefault alt={item.title} src={item.coverUrl} ratio="3/4" />

      <CardContent
        sx={{
          ...bgGradient({
            color: `to top, ${theme.vars.palette.grey[900]} 25%, ${varAlpha(theme.vars.palette.grey['900Channel'], 0)} 100%`,
          }),
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="h5" sx={{ ...maxLine({ line: 2 }), mb: 2 }}>
          {item.title}
        </Typography>

        <Link
          color="inherit"
          variant="overline"
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: theme.transitions.create(['opacity']),
            '&:hover': { opacity: 1 },
          }}
        >
          learn More
          <Iconify icon="eva:arrow-forward-fill" width={16} sx={{ ml: 1 }} />
        </Link>
      </CardContent>
    </Box>
  );
}
