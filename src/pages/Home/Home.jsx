import Box from '@mui/material/Box';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import Section from '~/components/Section';
import Task from './Task';

function Home() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '420px' }}>
                <Section title="Up next" icon={<AccessTimeRoundedIcon />}>
                    <Task />
                    <Task />
                </Section>
            </Box>
            <Box
                sx={{
                    height: '90vh',
                    mt: '40px',
                    maxWidth: '342px',
                    overflowY: 'auto',
                    pl: '50px',
                    position: 'sticky',
                    top: '40px',
                    width: '100%',
                }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur eum molestias laborum amet cumque
                quibusdam odio veniam mollitia animi nostrum, quia possimus? Consectetur, vitae numquam? Corrupti rerum
                possimus nobis distinctio.
            </Box>
        </Box>
    );
}

export default Home;
