import './code-highlight-block.css';

import { useMemo } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

import Link from '@mui/material/Link';

import { isExternalLink } from '~/routes/utils';
import { RouterLink } from '~/components/router-link';

import { Image } from '../image';
import { StyledRoot } from './styles';
import { markdownClasses } from './classes';
import { htmlToMarkdown, isMarkdownContent } from './html-to-markdown';

// ----------------------------------------------------------------------

export function Markdown({ content, sx, ...other }) {
    const _content = useMemo(() => {
        if (isMarkdownContent(`${content}`)) {
            return content;
        }
        return htmlToMarkdown(`${content}`.trim());
    }, [content]);

    return (
        <StyledRoot
            components={components}
            rehypePlugins={rehypePlugins}
            /* base64-encoded images
             * https://github.com/remarkjs/react-markdown/issues/774
             * urlTransform={(value: string) => value}
             */
            className={markdownClasses.root}
            sx={sx}
            {...other}
        >
            {_content}
        </StyledRoot>
    );
}

const rehypePlugins = [rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]];

const components = {
    img: ({ node, ...other }) => (
        <Image ratio="16/9" className={markdownClasses.content.image} sx={{ borderRadius: 2 }} {...other} />
    ),
    a: ({ href, children, node, ...other }) => {
        const linkProps = isExternalLink(href) ? { target: '_blank', rel: 'noopener' } : { component: RouterLink };

        return (
            <Link {...linkProps} href={href} className={markdownClasses.content.link} {...other}>
                {children}
            </Link>
        );
    },
    pre: ({ children }) => (
        <div className={markdownClasses.content.codeBlock}>
            <pre>{children}</pre>
        </div>
    ),
    code({ className, children, node, ...other }) {
        const language = /language-(\w+)/.exec(className || '');

        return language ? (
            <code {...other} className={className}>
                {children}
            </code>
        ) : (
            <code {...other} className={markdownClasses.content.codeInline}>
                {children}
            </code>
        );
    },
};
