// import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import Section from '~/components/Section';
import BoardItem from './BoardItem';
import { useEffect, useState } from 'react';
import { boardService } from '~/services/boardService';
import { CircularProgress } from '@mui/material';

function Boards() {
    // const { t, i18n } = useTranslation('boards');
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        boardService.getBoards().then((res) => setBoards(res.data.data));
    }, []);

    return (
        <Box>
            {!(boards.length > 0) && (
                <Box sx={{ display: 'flex', position: 'relative', height: '90vh' }}>
                    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
                </Box>
            )}

            {boards.length > 0 && (
                <>
                    <Section title="Starred boards" icon={<StarBorderRoundedIcon />}>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {boards.length > 0 &&
                                boards.map((board) => (
                                    <BoardItem
                                        key={board.id}
                                        title={board.title}
                                        slug={board.slug}
                                        image={board.image}
                                    />
                                ))}
                        </Box>
                    </Section>
                    <Section title="Recently viewed" icon={<AccessTimeRoundedIcon />}>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {boards.length > 0 &&
                                boards.map((board) => (
                                    <BoardItem
                                        key={board.id}
                                        title={board.title}
                                        slug={board.slug}
                                        image={board.image}
                                    />
                                ))}
                        </Box>
                    </Section>
                    <Section title="Starred boards" icon={<StarBorderRoundedIcon />}>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <BoardItem
                                title={'Web development'}
                                image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/a30c5051a16b148e7ece9df168a0d821/photo-1727224750231-00b06a08e070.webp"
                            />
                            <BoardItem
                                title={'Web development'}
                                image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/a30c5051a16b148e7ece9df168a0d821/photo-1727224750231-00b06a08e070.webp"
                            />
                            <BoardItem
                                title={'Web development'}
                                image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/a30c5051a16b148e7ece9df168a0d821/photo-1727224750231-00b06a08e070.webp"
                            />
                            <BoardItem
                                title={'Web development'}
                                image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/a30c5051a16b148e7ece9df168a0d821/photo-1727224750231-00b06a08e070.webp"
                            />
                            <BoardItem
                                title={'Web development'}
                                image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/a30c5051a16b148e7ece9df168a0d821/photo-1727224750231-00b06a08e070.webp"
                            />
                        </Box>
                    </Section>
                </>
            )}
        </Box>
    );
}

export default Boards;
