import React from 'react';
import ModuleLoader from './RemoteComponent';

// const LogPanel = loadAsync('LogPanel');
// const LogPanel = React.lazy(() => import('remote/LogPanel'));

const data = [
    {severity: 'error', text: 'Error text'},
    {severity: 'success', text: 'Success text'},
];

export function SharedPage() {
    return (
        <React.Suspense fallback="Loading Button">
            {/*<LogPanel data={data} />*/}
            <ModuleLoader
                url={'http://localhost:3002/remoteEntry.js'}
                module={'./LogPanel'}
                scope={'remote'}
                props={{
                    data: data,
                }}
            />
        </React.Suspense>
    );
}
