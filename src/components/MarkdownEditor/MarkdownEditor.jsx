import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import MarkdownParser from '~/components/MarkdownParser';

function MarkdownEditor({ value, onChange, style }) {
    return (
        <Box
            component={MdEditor}
            value={value}
            sx={{
                ...style,
                borderRadius: 1,
                '& .rc-md-navigation': {
                    bgcolor: 'common.white',
                },
                '& .editor-container .sec-md': {
                    borderWidth: 0,
                },
            }}
            view={{ menu: true, md: true, html: false }}
            canView={{
                menu: true,
                md: false,
                html: false,
                fullScreen: false,
                hideMenu: false,
            }}
            placeholder="Nội dung viết ở đây"
            markdownClass={'editor'}
            htmlClass={'wrapper'}
            renderHTML={(text) => {
                return <MarkdownParser content={text} />;
            }}
            onChange={onChange}
        />
    );
}

MarkdownEditor.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
};

export default MarkdownEditor;
