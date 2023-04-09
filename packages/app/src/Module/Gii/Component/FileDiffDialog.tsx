import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {CodeHighlight} from '@yii-dev-panel/sdk/Component/CodeHighlight';
import {GiiFile} from '@yii-dev-panel/app/Module/Gii/Types/FIle.types';

export type FileDiffDialogProps = {
    open: boolean;
    file: GiiFile;
    content: string;
    onClose: () => void;
};

export function FileDiffDialog(props: FileDiffDialogProps) {
    const {onClose, file, content, open} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
            <DialogTitle>{file.relativePath}</DialogTitle>
            <CodeHighlight language="diff" code={content} />
        </Dialog>
    );
}
