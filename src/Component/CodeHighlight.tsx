import {Prism} from 'react-syntax-highlighter';
import React from 'react';

type CodeHighlightProps = {
    language: string;
    code: string;
    highlightLines?: [number, number] | [number];
};
const isNumberInRange = (lineNumber: number, range: [number, number] | [number]) => {
    if (range.length === 1) {
        return range[0] === lineNumber;
    }
    return range[0] <= lineNumber && lineNumber <= range[1];
};
export const CodeHighlight = React.memo(({language, code, highlightLines}: CodeHighlightProps) => {
    return (
        <Prism
            showLineNumbers
            wrapLines
            useInlineStyles
            lineProps={(lineNumber) => ({
                id: `L${lineNumber}`,
                ...(highlightLines &&
                    isNumberInRange(lineNumber, highlightLines) && {
                        style: {
                            backgroundColor: 'rgba(0,0,0, .1)',
                        },
                    }),
            })}
            language={language}
        >
            {code}
        </Prism>
    );
});
