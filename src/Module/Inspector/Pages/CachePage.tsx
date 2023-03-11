import * as React from 'react';
import {useCallback, useEffect} from 'react';
import {useClearCacheMutation, useDeleteCacheMutation, useGetCacheQuery, useLazyGetCacheQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {useSearchParams} from 'react-router-dom';
import {FilterInput} from '../../../Component/Form/FilterInput';
import {Button, CircularProgress, LinearProgress, Stack} from '@mui/material';

type CacheViewProps = {
    data: any;
};

export const CachePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('filter') || '';
    const [clearCacheMutation, clearCacheMutationInfo] = useClearCacheMutation();
    const [deleteCacheMutation, deleteCacheMutationInfo] = useDeleteCacheMutation();
    const getCacheQuery = useGetCacheQuery(searchString, {
        skip: searchString === '',
    });

    const onChangeHandler = useCallback(async (value: string) => {
        setSearchParams({filter: value});
    }, []);

    const onRefetchHandler = async () => {
        getCacheQuery.refetch();
    };
    const onDeleteHandler = async () => {
        await deleteCacheMutation(searchString);
        await getCacheQuery.refetch();
    };

    const onPurgeHandler = async () => {
        await clearCacheMutation();
        await getCacheQuery.refetch();
    };

    return (
        <>
            <h2>{'Cache'}</h2>
            <Stack direction="row" justifyContent="space-between">
                <FilterInput value={searchString} onChange={onChangeHandler} />
                <Button
                    color="error"
                    onClick={onPurgeHandler}
                    disabled={clearCacheMutationInfo.isLoading}
                    endIcon={clearCacheMutationInfo.isLoading ? <CircularProgress size={24} color="info" /> : null}
                >
                    Purge cache
                </Button>
            </Stack>
            {getCacheQuery.isFetching && <LinearProgress />}
            {searchString !== '' && !getCacheQuery.isFetching && getCacheQuery.data !== undefined && (
                <Stack direction="column">
                    <Stack direction="row">
                        <Button
                            color="primary"
                            onClick={onRefetchHandler}
                            disabled={deleteCacheMutationInfo.isLoading}
                            endIcon={
                                deleteCacheMutationInfo.isLoading ? <CircularProgress size={24} color="info" /> : null
                            }
                        >
                            Refresh
                        </Button>
                        <Button
                            color="error"
                            onClick={onDeleteHandler}
                            disabled={deleteCacheMutationInfo.isLoading}
                            endIcon={
                                deleteCacheMutationInfo.isLoading ? <CircularProgress size={24} color="info" /> : null
                            }
                        >
                            Delete
                        </Button>
                    </Stack>
                    <JsonRenderer value={getCacheQuery.data} />
                </Stack>
            )}
        </>
    );
};
