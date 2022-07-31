import ReactJson from "react-json-view";
import * as React from "react";

export const JsonRenderer = ({value}: { value: any }) => {
    if (typeof value == 'string') {
        let html = value
            .replaceAll('\n', '<br/>')
            .replaceAll(' ', '&nbsp')
        ;
        return <div dangerouslySetInnerHTML={{__html: html}}/>
    }
    return <ReactJson src={value}/>
}