'use client'
import styles from '@/src/utils/style'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'



import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { RESET_PASSWORD } from '@/src/graphql/actions/reset-password.action'


const formSchema = z.object({

    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),

}).refine((values) => {return values.password === values.confirmPassword ;},
{
    message : "Passwords need to be matched !" ,
    path : ['confirmPassword'],
})


type ResetPasswordSchema = z.infer<typeof formSchema>;





const ResetPassword = ({ activationToken }: { activationToken: string | string[]; }) => {



    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ResetPasswordSchema>(
        {
            resolver: zodResolver(formSchema),
        }
    )
    const  [resetPassword , {loading}] = useMutation(RESET_PASSWORD) ; 
    const onSubmit = async (data: ResetPasswordSchema) => {
        try {
            const response = await resetPassword({
                variables : {
                    password : data.password , 
                    activationToken :activationToken
                } , 
                
            });
            toast.success("Password updated")
        }catch(error : any) {
            toast.error(error.message) 
        }
        
        

    }

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <div className='md:w-[500px] w-full'>
                <br />

                <h1 className={`${styles.title}`}>Reset your password</h1>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className='mt-5 w-full relative mb-1'>

                        <label htmlFor="password" className={`${styles.label}`}>
                            Enter your password
                        </label>
                        <input {...register("password")}
                            className={`${styles.input}`}
                            type={!showPassword ? (
                                'password'
                            ) : ('')}
                            placeholder='at least 8 characters long' >
                        </input>
                        {
                            errors.password && (
                                <span className='text-red-500 block mt-1'>
                                    {`${errors.password.message}`}
                                </span>
                            )
                        }

                        {!showPassword ? (
                            <AiOutlineEyeInvisible
                                className='absolute bottom-3 right-4 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShowPassword(true)}
                            />

                        ) : (
                            <AiOutlineEye
                                className='absolute bottom-3 right-4 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShowPassword(false)}
                            />
                        )}
                    </div>
                    <div className='mt-5 w-full relative mb-1'>

                        <label htmlFor="password" className={`${styles.label}`}>
                            Confirm your password
                        </label>
                        <input {...register("confirmPassword")}
                            className={`${styles.input}`}
                            type={!showConfirmPassword ? (
                                'password'
                            ) : ('')}
                            placeholder='confirm password' >
                        </input>
                        {
                            errors.confirmPassword && (
                                <span className='text-red-500 block mt-1'>
                                    {`${errors.confirmPassword.message}`}
                                </span>
                            )
                        }

                        {!showConfirmPassword ? (
                            <AiOutlineEyeInvisible
                                className='absolute bottom-3 right-4 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShowConfirmPassword(true)}
                            />

                        ) : (
                            <AiOutlineEye
                                className='absolute bottom-3 right-4 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShowConfirmPassword(false)}
                            />
                        )}
                    </div>
                    <div className='w-full mt-5 '>
                        <br/>
                        <input
                            type='submit'
                            value='Submit'
                            disabled={isSubmitting}
                            className={`${styles.button} mt-3`}
                        />

                    </div>
                    <br />
                </form>
            </div>

        </div>




    )
}

export default ResetPassword