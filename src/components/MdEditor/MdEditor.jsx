import PropTypes from 'prop-types';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import MarkdownParser from '~/components/MarkdownParser';

function MdEditor({ value, onChange, style }) {
    return (
        <MarkdownEditor
            value={value}
            style={style}
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

MdEditor.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
};

export default MdEditor;
