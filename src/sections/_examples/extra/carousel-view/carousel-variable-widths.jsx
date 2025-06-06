import Box from '@mui/material/Box';

import { Image } from '~/components/image';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from '~/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselVariableWidths({ data }) {
  const carousel = useCarousel({
    slidesToShow: 'auto',
    slideSpacing: '20px',
  });

  return (
    <>
      <Carousel carousel={carousel}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} index={index} item={item} />
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
      </Box>
    </>
  );
}

function CarouselItem({ item, index }) {
  const width = (index + 2) * 140;

  return (
    <Box sx={{ position: 'relative' }}>
      <IndexLabel index={index + 1} />
      <Image
        alt={item.title}
        src={item.coverUrl}
        sx={{
          borderRadius: 2,
          width: { xs: width / 3, md: width },
          height: { xs: 160, sm: 240, md: 320 },
        }}
      />
    </Box>
  );
}
