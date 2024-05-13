import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER } from '../graphql/actions/getUser.action'
const useUser = () => {
    const { loading, data, error } = useQuery(GET_USER)
    console.log(loading, data, error)

    return {
        loading,
        user: data?.getLoginUser?.user,
        error
    }
}

export default useUser