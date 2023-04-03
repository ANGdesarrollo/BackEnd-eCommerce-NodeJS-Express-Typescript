import React, { useState } from 'react';
import { axiosApi } from "./axiosApi";

export const useAxiosGet = (url) => {
    const [ stateGet, setStateGet ] = useState({
        data: null,
        isLoading: false,
        hasError: null,
    });

    const chatApiGet = async() => {
        try {
            setStateGet( {
                ...stateGet,
                isLoading: true
            } );
            const { data } = await axiosApi.get( url );
            setStateGet( {
                isLoading: false,
                data,
                hasError: null
            } );
        } catch ( err ) {
            setStateGet( {
                data: null,
                isLoading: false,
                hasError: err
            } )
        }
    }

    return {
        chatApiGet,
        stateGet
    }
};


