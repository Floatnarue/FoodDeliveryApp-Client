// route after click reset password on email

import ResetPassword from '@/src/shared/Auth/ResetPassword';
import React from 'react'

const page = ({searchParams} : {searchParams : {
    [key : string] : string | string[] | undefined
}}) => {

    const activationToken = searchParams['verify'] ?? "" ;
    
  return (
    
    <ResetPassword/>
  )
}

export default page