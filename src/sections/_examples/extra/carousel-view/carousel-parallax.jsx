import Box from '@mui/material/Box';

import { Image } from '~/components/image';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowFloatButtons,
} from '~/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselParallax({ data }) {
  const carousel = useCarousel({
    dragFree: true,
    loop: true,
    parallax: true,
    slidesToShow: '70%',
    slideSpacing: '20px',
  });

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Carousel carousel={carousel} slotProps={{ slide: { borderRadius: 2 } }}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
          ))}
        </Carousel>

        <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />
      </Box>

      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ width: 1, justifyContent: 'center', mt: 3 }}
      />
    </>
  );
}

function CarouselItem({ item, index }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <IndexLabel index={index + 1} />
      <Image
        visibleByDefault
        alt={item.title}
        src={item.coverUrl}
        ratio={{ xs: '4/3', sm: '16/10' }}
      />
    </Box>
  );
}
