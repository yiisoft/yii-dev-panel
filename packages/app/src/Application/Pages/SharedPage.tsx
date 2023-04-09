import React from 'react';
import ModuleLoader from '@yii-dev-panel/app/Application/Pages/RemoteComponent';
import {FullScreenCircularProgress} from '@yii-dev-panel/sdk/Component/FullScreenCircularProgress';

const cacheData = {
    cache: {
        get: [
            {
                key: '123',
                count: 2,
            },
        ],
        set: [
            {
                key: '123',
                value: {
                    '1': 2,
                    '2': 'object@stdClass#6692',
                },
                ttl: null,
                count: 2,
            },
        ],
    },
};

const logsData = [
    {severity: 'error', text: 'Error text'},
    {severity: 'success', text: 'Success text'},
];

export function SharedPage() {
    return (
        <React.Suspense fallback={<FullScreenCircularProgress />}>
            <ModuleLoader
                url={'http://localhost:3002/external.js'}
                module={'./LogPanel'}
                scope={'remote'}
                props={{
                    data: logsData,
                }}
            />
            <ModuleLoader
                url={'http://localhost:3002/external.js'}
                module={'./CachePanel'}
                scope={'remote'}
                props={{
                    data: cacheData,
                }}
            />
        </React.Suspense>
    );
}
