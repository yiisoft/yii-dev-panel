import {DebugModule} from '@yii-dev-panel/app/Module/Debug';
import {GiiModule} from '@yii-dev-panel/app/Module/Gii';
import {InspectorModule} from '@yii-dev-panel/app/Module/Inspector';
import {ApplicationModule} from '@yii-dev-panel/app/Application';
import {OpenApiModule} from '@yii-dev-panel/app/Module/OpenApi';

export const modules = [ApplicationModule, DebugModule, GiiModule, InspectorModule, OpenApiModule];
