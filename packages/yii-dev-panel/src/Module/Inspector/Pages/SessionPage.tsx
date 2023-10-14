import {FullScreenCircularProgress} from '@yiisoft/yii-dev-panel-sdk/Component/FullScreenCircularProgress';
import {JsonRenderer} from '@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer';
import {useGetSessionQuery} from '@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector';

export const SessionPage = () => {
    const sessionQuery = useGetSessionQuery();

    return (
        <>
            {!sessionQuery.isLoading && <FullScreenCircularProgress />}
            {!sessionQuery.isLoading && <JsonRenderer value={sessionQuery.data} />}
        </>
    );
};
