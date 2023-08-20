import {FilePresent} from '@mui/icons-material';
import {Link} from '@mui/material';
import Box from '@mui/material/Box';
import {parseFilePathWithLineAnchor} from '@yiisoft/yii-dev-panel-sdk/Helper/filePathParser';
import {JsonRenderer} from '@yiisoft/yii-dev-panel/Module/Debug/Component/JsonRenderer';

type VarDumperEntry = {
    variable: any;
    line: string;
};
type VarDumperPanelProps = {
    data: {
        'var-dumper': VarDumperEntry[];
    };
};

export const VarDumperPanel = ({data}: VarDumperPanelProps) => {
    console.log('VarDumperPanel', data);
    return (
        <>
            {!data || data['var-dumper'].length === 0 ? (
                <>Nothing here</>
            ) : (
                [].concat(data['var-dumper'], data['var-dumper']).map((variable, index) => (
                    <Box border={0} my={1} p={1}>
                        <JsonRenderer value={variable.variable} depth={10} />
                        <Link
                            href={`/inspector/files?path=${parseFilePathWithLineAnchor(variable.line)}`}
                            target="_blank"
                        >
                            {variable.line}
                            <FilePresent fontSize="small" />
                        </Link>
                    </Box>
                ))
            )}
        </>
    );
};
