import {DebugModule} from './Module/Debug';
import {GiiModule} from './Module/Gii';
import {InspectorModule} from './Module/Inspector';
import {ApplicationModule} from './Application';
import {OpenApiModule} from './Module/OpenApi';

export const modules = [ApplicationModule, DebugModule, GiiModule, InspectorModule, OpenApiModule];
