import {DataType, JsonViewer} from '@textea/json-viewer';
import * as React from 'react';

const REGEXP_PHP_FUNCTION = /(static )?(function |fn )\(.*\).*((\{.*})|(=>.*))/s;

export type JsonRendererProps = {
    value: any;
    depth?: number;
    valueTypes?: DataType<any>[];
};
export const JsonRenderer = ({value, depth = 5, valueTypes = []}: JsonRendererProps) => {
    if (typeof value == 'string' && value.match(REGEXP_PHP_FUNCTION)?.length) {
        let html = value.replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp');
        return <div dangerouslySetInnerHTML={{__html: html}} />;
    }

    return (
        <JsonViewer
            rootName={false}
            value={value}
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
};
