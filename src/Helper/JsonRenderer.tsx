import ReactJson from '@textea/json-viewer'
import * as React from "react";

export const JsonRenderer = ({value, collapsed = false}: { value: any , collapsed?: boolean}) => {
    if (typeof value == 'string') {
        let html = value
            .replaceAll('\n', '<br/>')
            .replaceAll(' ', '&nbsp')
        ;
        return <div dangerouslySetInnerHTML={{__html: html}}/>
    }
    return <ReactJson src={value} collapsed={collapsed} name={false}/>
}