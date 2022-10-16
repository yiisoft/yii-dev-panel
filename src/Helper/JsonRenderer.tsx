import {JsonViewer} from '@textea/json-viewer'
import * as React from "react";
import {useState} from "react";
import {useLazyGetObjectQuery} from "../API/Debug";
import {useDebugEntry} from "../Provider/Debug/DebugEntryContext";
import {deepUpdate} from "immupdate";

export const JsonRenderer = ({value, depth = 5}: { value: any; depth?: number}) => {
    const [objectQuery] = useLazyGetObjectQuery();
    const [data, setData] = useState(value);
    const debugEntry = useDebugEntry();

    // if (typeof data == 'string' && data.match(/\\n|<[\w\d ="'\/?]+>.*(?:<\/\w+>)?/)?.length) {
    //     let html = value
    //         .replaceAll('\n', '<br/>')
    //         .replaceAll(' ', '&nbsp')
    //     ;
    //     return <div dangerouslySetInnerHTML={{__html: html}}/>
    // }
    const objectLoader = async (objectString: string, pathes: (string | number)[]) => {
        const objectId = Number(objectString.substring(objectString.indexOf('#', -1) + 1))

        const response = await objectQuery({debugEntryId: debugEntry!.id, objectId: objectId})
        let pointer = deepUpdate(data)

        for (const path of pathes) {
            pointer = pointer.at(path)
        }
        const newData = pointer.set(response.data);
        setData(newData)
    }

    return <JsonViewer
        rootName={false}
        value={data}
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
            }, {
                is: (value: any) => typeof value === 'string' && !!value.match(/object@[\w\\]+#\d/),
                Component: (props) => {
                    return <>
                        {props.value}
                        <button key={props.path.join(',')} onClick={(e) => objectLoader(props.value, props.path)}>
                            Load
                        </button>
                    </>;
                },
            },
        ]}
    />
}
