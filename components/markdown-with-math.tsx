import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

interface MarkdownWithMathProps {
    text: string;
}

const MarkdownWithMath: React.FC<MarkdownWithMathProps> = ({text}) => {
    return (
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {text}
        </ReactMarkdown>
    );
};

export default MarkdownWithMath;