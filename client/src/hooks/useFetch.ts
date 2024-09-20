import { useState, useEffect } from 'react';
import { fetchParameterType, TApiResponse } from '@/utils/types';
import { getRequest } from '@/utils/getRequest';

export const useFetch = <T>({ url, responseType = 'json' }: fetchParameterType): TApiResponse<T> => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<T>();
    const [header, setHeader] = useState<any>()
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const getAPIData = async () => {
        setLoading(true);
        try {
            const res = await getRequest({ url, responseType });
            setStatus(res.status);
            setStatusText(res.statusText);
            setData(res.data);
            setHeader(res.headers)
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAPIData();
    }, []);

    return { status, statusText, data, header, error, loading };
};
