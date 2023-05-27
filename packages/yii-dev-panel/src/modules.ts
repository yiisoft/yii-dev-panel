import {ApplicationModule} from '@yiisoft/yii-dev-panel/Application';
import {DebugModule} from '@yiisoft/yii-dev-panel/Module/Debug';
import {GiiModule} from '@yiisoft/yii-dev-panel/Module/Gii';
import {InspectorModule} from '@yiisoft/yii-dev-panel/Module/Inspector';
import {OpenApiModule} from '@yiisoft/yii-dev-panel/Module/OpenApi';

export const modules = [ApplicationModule, DebugModule, GiiModule, InspectorModule, OpenApiModule];
