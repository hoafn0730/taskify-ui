import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import MdEditor from '~/components/MdEditor';
import MarkdownParser from '~/components/MarkdownParser';

function Description() {
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [cardDescValue, setCardDescValue] = useState(
        `--- Discuss During Next Meeting --- --- Duis mollis, est non commodo luctus, nisi erat porttitor ligula. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eius mollitia, tempore minima maiores, quod autem ut vitae ipsa, magni consequatur quaerat reiciendis tempora ea praesentium iure amet pariatur ipsum.`,
    );

    return (
        <Box sx={{ ml: '32px' }}>
            {!isEditingDesc ? (
                <>
                    {cardDescValue ? (
                        <MarkdownParser content={cardDescValue} />
                    ) : (
                        <Button onClick={() => setIsEditingDesc(true)}>Add a more detailed description</Button>
                    )}
                </>
            ) : (
                <>
                    <MdEditor
                        value={cardDescValue}
                        style={{ minHeight: '275px' }}
                        onChange={({ html, text }) => setCardDescValue(text)}
                    />
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Button variant="contained">Save</Button>
                        <Button onClick={() => setIsEditingDesc(false)}>Cancel</Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Description;
