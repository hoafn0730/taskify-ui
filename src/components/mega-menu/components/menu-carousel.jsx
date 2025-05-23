import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from '~/components/router-link';

import { maxLine } from '~/theme/styles';

import { Image } from '../../image';
import { Carousel, useCarousel, CarouselDotButtons, CarouselArrowBasicButtons } from '../../carousel';

// ----------------------------------------------------------------------

export function MenuCarousel({ slides, displayCount = 8, sx }) {
    const carousel = useCarousel({ slidesToShow: displayCount, slidesToScroll: displayCount });

    return (
        <Stack sx={{ position: 'relative', pt: 2, ...sx }}>
            <Carousel carousel={carousel}>
                {slides.map((item) => (
                    <CarouselItem key={item.name} item={item} />
                ))}
            </Carousel>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
                <CarouselDotButtons
                    scrollSnaps={carousel.dots.scrollSnaps}
                    selectedIndex={carousel.dots.selectedIndex}
                    onClickDot={carousel.dots.onClickDot}
                    sx={{ color: 'primary.main' }}
                />
            </Stack>
        </Stack>
    );
}

function CarouselItem({ item }) {
    const theme = useTheme();

    return (
        <Link
            component={RouterLink}
            href={item.path}
            color="inherit"
            underline="none"
            sx={{
                px: 1,
                display: 'block',
                transition: theme.transitions.create('color'),
                '&:hover': { color: 'primary.main' },
            }}
        >
            <Image alt={item.coverUrl} src={item.coverUrl} ratio="1/1" sx={{ borderRadius: 1, mb: 1 }} />

            <Typography
                variant="caption"
                sx={{
                    ...maxLine({ line: 2, persistent: theme.typography.caption }),
                    fontWeight: 'fontWeightSemiBold',
                }}
            >
                {item.name}
            </Typography>
        </Link>
    );
}
