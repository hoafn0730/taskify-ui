import Box from '@mui/material/Box';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import Section from '~/components/Section/Section';
import TemplateItem from './TemplateItem';

function Templates() {
    return (
        <Box>
            <Section title="Starred boards" icon={<StarBorderRoundedIcon />}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                </Box>
            </Section>
            <Section title="Recently viewed" icon={<AccessTimeRoundedIcon />}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                </Box>
            </Section>
            <Section title="Starred boards" icon={<StarBorderRoundedIcon />}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                    <TemplateItem />
                </Box>
            </Section>
        </Box>
    );
}

export default Templates;
