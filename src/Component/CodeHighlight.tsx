import {Prism} from 'react-syntax-highlighter';

type CodeHighlightProps = {
    language: string;
    code: string;
};
export const CodeHighlight = ({language, code}: CodeHighlightProps) => {
    return (
        <Prism showLineNumbers language={language}>
            {code}
        </Prism>
    );
};
