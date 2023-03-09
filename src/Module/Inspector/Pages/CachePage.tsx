import * as React from 'react';
import {useCallback, useEffect} from 'react';
import {useLazyGetCacheQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {useSearchParams} from 'react-router-dom';
import {FilterInput} from '../../../Component/Form/FilterInput';
import {LinearProgress} from '@mui/material';

export const CachePage = () => {
    const [getCacheQuery, getCacheQueryInfo] = useLazyGetCacheQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('filter') || '';

    useEffect(() => {
        if (searchString !== '') {
            getCacheQuery(searchString);
        }
    }, [searchString]);

    const onChangeHandler = useCallback(async (value: string) => {
        setSearchParams({filter: value});
    }, []);

    return (
        <>
            <h2>{'Cache'}</h2>
            <FilterInput value={searchString} onChange={onChangeHandler} />
            {getCacheQueryInfo.isFetching && <LinearProgress />}
            {!getCacheQueryInfo.isFetching && <JsonRenderer value={getCacheQueryInfo.data} />}
        </>
    );
};
