// import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

import Section from '~/components/Section';
import BoardItem from './BoardItem';
import { boardService } from '~/services/boardService';
import { Typography } from '@mui/material';

function Boards() {
    // const { t, i18n } = useTranslation('boards');
    const [boards, setBoards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        boardService.getBoards().then((res) => {
            setBoards(res.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <Box>
            {isLoading && (
                <Box sx={{ display: 'flex', position: 'relative', height: '90vh' }}>
                    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
                </Box>
            )}

            {boards?.length > 0 && (
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

            {!boards?.length && <Typography variant="span">Stay on track and up to date</Typography>}
        </Box>
    );
}

export default Boards;
