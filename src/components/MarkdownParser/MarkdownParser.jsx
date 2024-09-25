import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import MarkdownIt from 'markdown-it';
import markdownItIns from 'markdown-it-ins';
import hljs from 'highlight.js';

hljs.configure({
    classPrefix: 'token ',
});

function MarkdownParser({ content, style, className }) {
    const mdParser = useMemo(
        () =>
            new MarkdownIt({
                html: true,
                linkify: true,
                typographer: true,
                langPrefix: 'language-',
                highlight: function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return `<pre class='language-${lang}'><code class='language-${lang}'>${
                                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                            }</code></pre>
                    `;
                        } catch (__) {
                            //
                        }
                    }

                    return '<pre><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
                },
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    ).use(markdownItIns);

    return (
        <div className={'wrapper'} style={style}>
            {parse(mdParser.render(content))}
        </div>
    );
}

MarkdownParser.propTypes = {
    content: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
};

export default memo(MarkdownParser);
