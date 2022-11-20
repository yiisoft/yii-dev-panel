import * as React from 'react';
import {useEffect, useState} from 'react';
import {useGetFilesQuery, useLazyGetFilesQuery} from '../API/Inspector';
import TreeItem from '@mui/lab/TreeItem';
import {TreeView} from '@mui/lab';
import {ChevronRight, ExpandMore} from '@mui/icons-material';

function Tree({row}: {row: string | string[]}) {
    if (Array.isArray(row)) {
        return (
            <>
                <TreeItem nodeId={row[0]} label={row}>
                    {row.map((row, index) => (
                        <Tree key={index} row={row} />
                    ))}
                </TreeItem>
            </>
        );
    }
    if (row.endsWith('/')) {
        return (
            <TreeItem nodeId={row} label={row}>
                {/*<CircularProgress />*/}
            </TreeItem>
        );
    }
    return <TreeItem nodeId={row} label={row} />;
}

export const FilesPage = () => {
    const {data, isLoading} = useGetFilesQuery('');
    const [lazyGetFilesQuery] = useLazyGetFilesQuery();
    const [tree, setTree] = useState<string[] | string[][]>([]);

    function updateTree(data: string[]) {
        const rows = data.slice().sort((file1, file2) => {
            if (file1.endsWith('/') && !file2.endsWith('/')) {
                return file2.endsWith('/..') ? 1 : -1;
            }
            if (file2.endsWith('/') && !file1.endsWith('/')) {
                return file1.endsWith('/..') ? -1 : 1;
            }
            return file1.localeCompare(file2);
        });
        setTree(rows);
    }

    useEffect(() => {
        console.log('ueffect');
        if (!data) {
            return;
        }

        updateTree(data);
    }, [isLoading]);
    if (isLoading) {
        return <>Loading..</>;
    }

    const loadMore = async (path: string) => {
        const response = await lazyGetFilesQuery(path);
        console.log(response.data);
        updateTree(response.data as string[]);
    };

    console.log(tree);

    return (
        <>
            <h2>{'Files'}</h2>
            <TreeView
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                multiSelect={false}
                sx={{flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
                // onNodeToggle={async (event, nodeIds) => {
                //     console.log('toggle', event, nodeIds);
                //     await loadMore(nodeIds[0]);
                // }}
                onNodeSelect={async (event, nodeIds) => {
                    console.log('select', event, nodeIds);
                    await loadMore(nodeIds);
                    return false;
                }}
                onNodeFocus={() => console.log('focus')}
            >
                {tree.map((row, index) => (
                    <Tree key={index} row={row} />
                ))}
            </TreeView>
        </>
    );
};
