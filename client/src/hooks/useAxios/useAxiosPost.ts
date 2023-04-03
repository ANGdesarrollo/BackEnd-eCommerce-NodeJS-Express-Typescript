import React, { useState, useEffect } from 'react';
import { axiosApi } from "./axiosApi";

export const useAxiosPost = ( url ) => {
    const [ statePost, setStatePost ] = useState( {
        data: null,
        isLoading: false,
        hasError: null,
    } );

    const chatApiPost = ( data ) => {
        setStatePost( {
            ...statePost,
            isLoading: true
        } )
        axiosApi.post( url, data = { ...data }
            , { withCredentials: true } )
            .then( ( { data } ) => {
                setStatePost( {
                    hasError: null,
                    isLoading: false,
                    data,
                } );
            } )
            .catch( ( error ) => {
                setStatePost( {
                    data: null,
                    isLoading: false,
                    hasError: error
                } );
            } )
    }
    return {
        chatApiPost,
        statePost
    }
}
