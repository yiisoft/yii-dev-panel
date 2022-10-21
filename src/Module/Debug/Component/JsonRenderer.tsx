import {JsonRenderer as OriginalJsonRenderer, JsonRendererProps} from '../../../Component/JsonRenderer';
import {deepUpdate} from 'immupdate';
import * as React from 'react';
import {useState} from 'react';
import {useLazyGetObjectQuery} from '../API/Debug';
import {useDebugEntry} from '../Context/Context';
import {DataType} from '@textea/json-viewer';

export const JsonRenderer = (props: JsonRendererProps) => {
    const [objectQuery] = useLazyGetObjectQuery();
    const debugEntry = useDebugEntry();
    const [data, setData] = useState(props.value);

    const objectLoader = async (objectString: string, pathes: (string | number)[]) => {
        const objectId = Number(objectString.substring(objectString.indexOf('#', -1) + 1));

        const response = await objectQuery({debugEntryId: debugEntry!.id, objectId: objectId});
        let pointer = deepUpdate(data);

        for (const path of pathes) {
            pointer = pointer.at(path);
        }
        const newData = pointer.set(response.data);
        setData(newData);
    };
    const valueTypes: DataType<string>[] = [
        {
            is: (value: any) => typeof value === 'string' && !!value.match(/object@[\w\\]+#\d/),
            Component: (props) => {
                return (
                    <>
                        {props.value}
                        <button key={props.path.join(',')} onClick={(e) => objectLoader(props.value, props.path)}>
                            Load
                        </button>
                    </>
                );
            },
        },
    ];
    return <OriginalJsonRenderer value={data} valueTypes={valueTypes} />;
};
