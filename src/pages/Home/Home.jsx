import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Hero from './Hero';
import LogoCollection from './LogoCollection';
import Highlights from './Highlights';
import Pricing from './Pricing';
import Features from './Features';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

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
