import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {GiiFile} from "./Stepper/Context/Context";
import {CodeHighlight} from "../../Component/CodeHighlight";

export interface FilePreviewDialogProps {
    open: boolean;
    file: GiiFile;
    onClose: () => void;
}

export function FilePreviewDialog(props: FilePreviewDialogProps) {
    const {onClose, file, open} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='md'>
            <DialogTitle>{file.relativePath}</DialogTitle>
            <CodeHighlight language={file.type} code={file.content}/>
        </Dialog>
    );
}