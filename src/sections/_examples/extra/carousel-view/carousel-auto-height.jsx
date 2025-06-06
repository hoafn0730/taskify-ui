import AutoHeight from 'embla-carousel-auto-height';

import Box from '@mui/material/Box';

import { Image } from '~/components/image';
import { Carousel, useCarousel, CarouselArrowBasicButtons } from '~/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselAutoHeight({ data }) {
  const carousel = useCarousel({}, [AutoHeight()]);

  return (
    <>
      <CarouselArrowBasicButtons
        {...carousel.arrows}
        options={carousel.options}
        sx={{ top: 20, right: 16, position: 'absolute' }}
      />

      <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} item={item} index={index} />
        ))}
      </Carousel>
    </>
  );
}

function CarouselItem({ item, index }) {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
      <IndexLabel index={index + 1} />
      <Image
        alt={item.title}
        src={item.coverUrl}
        sx={{
          width: 1,
          ...(index === 0 && { height: 200 }),
          ...(index === 1 && { height: 240 }),
          ...(index === 2 && { height: 160 }),
          ...(index === 3 && { height: 320 }),
        }}
      />
    </Box>
  );
}
