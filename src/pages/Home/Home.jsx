import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import FAQ from './FAQ';
import Hero from './Hero';
import Pricing from './Pricing';
import Features from './Features';
import Highlights from './Highlights';
import Testimonials from './Testimonials';
import LogoCollection from './LogoCollection';

export default function Home() {
    return (
        <Box>
            <Hero />
            <Box>
                <LogoCollection />
                <Features />
                <Divider />
                <Testimonials />
                <Divider />
                <Highlights />
                <Divider />
                <Pricing />
                <Divider />
                <FAQ />
                <Divider />
            </Box>
        </Box>
    );
}
