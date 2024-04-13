import {FilePresent} from '@mui/icons-material';
import {Link, Paper} from '@mui/material';
import {parseFilePathWithLineAnchor} from '@yiisoft/yii-dev-panel-sdk/Helper/filePathParser';
import {JsonRenderer} from '@yiisoft/yii-dev-panel/Module/Debug/Component/JsonRenderer';

type VarDumperEntry = {
    variable: any;
    line: string;
};
type VarDumperPanelProps = {
    data: VarDumperEntry[];
};

export const VarDumperPanel = ({data}: VarDumperPanelProps) => {
    return (
        <>
            {!data || data.length === 0 ? (
                <>Nothing here</>
            ) : (
                data.map((variable, index) => (
                    <Paper sx={{mb: 1, p: 1}}>
                        <JsonRenderer value={variable.variable} depth={10} />
                        <Link href={`/inspector/files?path=${parseFilePathWithLineAnchor(variable.line)}`}>
                            {variable.line}
                            <FilePresent fontSize="small" />
                        </Link>
                    </Paper>
                ))
            )}
        </>
    );
};
