import {DataType, JsonViewer, JsonViewerOnChange} from '@textea/json-viewer';
import * as React from 'react';

const REGEXP_PHP_FUNCTION = /(static )?(function |fn )\(.*\).*((\{.*})|(=>.*))/s;

export type JsonRendererProps = {
    value: any;
    depth?: number;
    editable?: boolean;
    onChange?: JsonViewerOnChange;
    valueTypes?: DataType<any>[];
};
export const JsonRenderer = React.memo(
    ({value, depth = 5, editable = false, onChange = undefined, valueTypes = []}: JsonRendererProps) => {
        if (typeof value == 'string' && value.match(REGEXP_PHP_FUNCTION)?.length) {
            const html = value.replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp');
            return <div dangerouslySetInnerHTML={{__html: html}} />;
        }

        return (
            <JsonViewer
                rootName={false}
                value={value}
                editable={editable}
                onChange={onChange}
                displayDataTypes={false}
                enableClipboard={true}
                defaultInspectDepth={depth}
                groupArraysAfterLength={50}
                collapseStringsAfterLength={50}
                valueTypes={[
                    {
                        is: (value: any) => typeof value === 'string' && value.startsWith('@'),
                        Component: (props) => {
                            return <>alias: {props.value}</>;
                        },
                    },
                    ...valueTypes,
                ]}
            />
        );
    },
);
