import {JsonViewer} from '@textea/json-viewer'
import * as React from "react";

export const JsonRenderer = ({value, collapsed = false}: { value: any, collapsed?: boolean }) => {
    if (typeof value == 'string') {
        let html = value
            .replaceAll('\n', '<br/>')
            .replaceAll(' ', '&nbsp')
        ;
        return <div dangerouslySetInnerHTML={{__html: html}}/>
    }
    return <JsonViewer
        rootName={false}
        value={value}
        enableClipboard={true}
        defaultInspectDepth={5}
        groupArraysAfterLength={50}
        collapseStringsAfterLength={50}
        valueTypes={[
            {
                is: ((value: any): boolean => typeof value === 'string' && value.startsWith('@')) as any,
                Component: (props) => {
                    return <>alias: {props.value}</>;
                },
            },
        ]}
    />
}