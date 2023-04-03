import React from 'react';
import ModuleLoader from './RemoteComponent';

const data = [
    {severity: 'error', text: 'Error text'},
    {severity: 'success', text: 'Success text'},
];

export function SharedPage() {
    return (
        <React.Suspense fallback="Loading Button">
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
