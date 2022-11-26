import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import {InspectorFile, InspectorFileContent, useLazyGetFilesQuery} from '../API/Inspector';
import {CodeHighlight} from '../../../Component/CodeHighlight';
import {Box, Breadcrumbs, Button, Link, Typography} from '@mui/material';
import {useSearchParams} from 'react-router-dom';
import {TreeView} from '../Component/TreeView/TreeView';
import {Undo} from '@mui/icons-material';
import {formatBytes} from '../Component/TreeView/helper';
import {parseFilePath, parsePathLineAnchor} from '../../../Helper/filePathParser';
import {scrollToAnchor} from '../../../Helper/scrollToAnchor';

type PathBreadcrumbsProps = {
    onClick: (nodeId: string) => void;
    path: string;
};

const PathBreadcrumbs = ({path, onClick}: PathBreadcrumbsProps) => {
    const paths = path.split('/').filter((s) => !!s.length);
    const fullPath: string[] = [];

    return (
        <h2>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href={'#'}
                    onClick={(e) => {
                        onClick('/');
                        return false;
                    }}
                >
                    @root
                </Link>
                {paths.map((directory, index) => {
                    if (index === paths.length - 1) {
                        return (
                            <Typography key={index} color="text.primary">
                                {directory}
                            </Typography>
                        );
                    }
                    fullPath.push(directory);

                    return (
                        <Link
                            key={index}
                            underline="hover"
                            color="inherit"
                            href={'#'}
                            onClick={(e) => {
                                onClick('/' + fullPath.join('/'));
                                return false;
                            }}
                        >
                            {directory}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </h2>
    );
};

function sortTree(data: InspectorFile[]) {
    return data.slice().sort((file1, file2) => {
        if (file1.path.endsWith('/') && !file2.path.endsWith('/')) {
            return file2.path.endsWith('/..') ? 1 : -1;
        }
        if (file2.path.endsWith('/') && !file1.path.endsWith('/')) {
            return file1.path.endsWith('/..') ? -1 : 1;
        }
        return file1.path.localeCompare(file2.path);
    });
}

export const FileExplorerPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const path = searchParams.get('path') || '/';

    const [lazyGetFilesQuery] = useLazyGetFilesQuery();
    const [tree, setTree] = useState<InspectorFile[]>([]);
    const [file, setFile] = useState<InspectorFileContent | null>(null);

    useEffect(() => {
        (async () => {
            const response = await lazyGetFilesQuery(parseFilePath(path));

            if (Array.isArray(response.data)) {
                const rows = sortTree(response.data);
                setTree(rows);
            } else {
                setFile(response.data as any);
            }
        })();
    }, [path]);

    useLayoutEffect(() => {
        if (file) {
            const lines = parsePathLineAnchor(window.location.hash);
            scrollToAnchor(25, lines && `L${lines[0]}`);
        }
    });
    const changePath = (path: string) => {
        setSearchParams({path});
    };

    return (
        <>
            {file && (
                <>
                    <h2>
                        <Button
                            onClick={() => {
                                setFile(null);
                                changePath(file.directory);
                            }}
                        >
                            <Undo /> Back
                        </Button>
                        {file.path}
                    </h2>
                    <CodeHighlight
                        language={file.extension}
                        code={file.content}
                        highlightLines={parsePathLineAnchor(window.location.hash)}
                    />
                    <Box>
                        <Typography>Directory: @root{file.directory}</Typography>
                        <Typography>Permissions: {file.permissions}</Typography>
                        <Typography>
                            Owner: {file.user?.name ?? file.user.uid}:{file.group?.name ?? file.group.gid}
                        </Typography>
                        <Typography>Size: {formatBytes(file.size)}</Typography>
                    </Box>
                </>
            )}
            {!file && (
                <>
                    <PathBreadcrumbs path={path} onClick={changePath} />
                    <TreeView tree={tree} onSelect={changePath} />
                </>
            )}
        </>
    );
};
