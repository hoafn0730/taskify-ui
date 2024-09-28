// import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import Section from '~/components/Section';
import BoardItem from './BoardItem';

function Boards() {
    // const { t, i18n } = useTranslation('boards');

    return (
        <Box>
            <Section title="Starred boards" icon={<StarBorderRoundedIcon />}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                </Box>
            </Section>
            <Section title="Recently viewed" icon={<AccessTimeRoundedIcon />}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                </Box>
            </Section>
            <Section title="Starred boards" icon={<StarBorderRoundedIcon />}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                </Box>
            </Section>
        </Box>
    );
}

export default Boards;
