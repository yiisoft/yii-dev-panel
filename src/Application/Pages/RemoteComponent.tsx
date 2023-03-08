import React, {Suspense} from 'react';

// const url = process.env.REACT_APP_BACKEND_URL;
const url = 'remote';

// export const loadAsync = (name: string): React.LazyExoticComponent<any> => {
//     // @ts-ignore
//     // return React.lazy(() => import('remote/LogPanel'));
//     // @ts-ignore
//     // return React.lazy(() => import(`remote/${name}`) as Promise<{default: React.ComponentType}>);
// };

const useDynamicScript = (args: {url: string}) => {
    const [ready, setReady] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
        if (!args.url) {
            return;
        }

        const element = document.createElement('script');

        element.src = args.url;
        element.type = 'text/javascript';
        element.async = true;

        setReady(false);
        setFailed(false);

        element.onload = () => {
            console.log(`Dynamic Script Loaded: ${args.url}`);
            setReady(true);
        };

        element.onerror = () => {
            console.error(`Dynamic Script Error: ${args.url}`);
            setReady(false);
            setFailed(true);
        };

        document.head.appendChild(element);

        return () => {
            console.log(`Dynamic Script Removed: ${args.url}`);
            document.head.removeChild(element);
        };
    }, [args.url]);

    return {
        ready,
        failed,
    };
};
function loadComponent(scope: string, module: string) {
    return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        // @ts-ignore
        await __webpack_init_sharing__('default');
        // @ts-ignore
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        // @ts-ignore
        await container.init(__webpack_share_scopes__.default);
        // @ts-ignore
        const factory = await window[scope].get(module);
        const Module = factory();
        return Module;
    };
}

function ModuleLoader(props: {module: string; url: string; scope: string; props: any}) {
    const {ready, failed} = useDynamicScript({
        url: props.module && props.url,
    });

    if (!props.module) {
        return <h2>Not system specified</h2>;
    }

    if (!ready) {
        return <h2>Loading dynamic script: {props.url}</h2>;
    }

    if (failed) {
        return <h2>Failed to load dynamic script: {props.url}</h2>;
    }

    const Component = React.lazy(loadComponent(props.scope, props.module));

    return (
        <Suspense fallback="Loading Module">
            <Component {...props.props} />
        </Suspense>
    );
}

export default ModuleLoader;
// function __webpack_init_sharing__(arg0: string) {
//     throw new Error('Function not implemented.');
// }
