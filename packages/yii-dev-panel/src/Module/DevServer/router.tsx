import * as Pages from '@yiisoft/yii-dev-panel/Module/DevServer/Pages';
import {RouteObject} from 'react-router-dom';

export const routes = [
    {
        path: '/debug-server',
        element: <Pages.Layout />,
    },
] satisfies RouteObject[];
