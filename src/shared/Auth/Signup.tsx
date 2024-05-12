import styles from '@/src/utils/style'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '@/src/graphql/actions/register.action'
import toast from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(3, 'Username must be acat least 3 characters long'),
    email: z.string().email(),
    address : z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    phone_number: z.number().min(10, 'Phone number must be at least 10 characters')

})


type SignupSchema = z.infer<typeof formSchema>;





const Signup = ({ setActiveState }: { setActiveState: (e: string) => void }) => {
    // recieve data from graphql in REGISTER_USER ACTION
    const [registerUserMutation , {loading,error,data}] = useMutation(REGISTER_USER) ;
    
     //
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SignupSchema>(
        {
            resolver: zodResolver(formSchema),
        }
    )

    const onSubmit = async  (data: SignupSchema) => {
        try {
            
            const response = await registerUserMutation({
                variables : data ,
            });
            
            localStorage.setItem("activation_token" , response.data.register.activation_token) ;

            
            toast.success("Register succesfull! , Please check your email") ;
            setActiveState("verification")
            reset();
        }catch(error : any){
            toast.error(error.message) ;
        }
    }

    const [showPassword, setShowPassword] = useState(false)


    return (
        <div>
            <br />
            <h1 className={`${styles.title}`}>Register</h1>
            <br />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={`${styles.label}`}>
                        username
                    </label>
                    <input {...register("name")}
                        className={`${styles.input}`}
                        type='text'
                        placeholder='eg.floatnarue' >
                    </input>
                    {
                        errors.name && (
                            <span className='text-red-500 block mt-1'>
                                {`${errors.name.message}`}
                            </span>
                        )
                    }
                </div>
                <div className='mt-2'>
                    <label className={`${styles.label}`}>
                        email
                    </label>
                    <input {...register("email")}
                        className={`${styles.input}`}
                        type='email'
                        placeholder='login@gmail.com' >
                    </input>
                    {
                        errors.email && (
                            <span className='text-red-500 block mt-1'>
                                {`${errors.email.message}`}
                            </span>
                        )
                    }
                </div>
                <div className='mt-2'>
                    <label className={`${styles.label}`}>
                        Address
                    </label>
                    <input {...register("address")}
                        className={`${styles.input}`}
                        type='text'
                        placeholder='can be edited later' >
                    </input>
                    {
                        errors.address && (
                            <span className='text-red-500 block mt-1'>
                                {`${errors.address.message}`}
                            </span>
                        )
                    }
                </div>
                <div className='mt-2'>
                    <label className={`${styles.label}`}>
                        phone number
                    </label>
                    <input {...register("phone_number", {valueAsNumber :true })}
                        className={`${styles.input}`}
                        type='number'
                        placeholder='eg.0001112223' >
                    </input>
                    {
                        errors.phone_number && (
                            <span className='text-red-500 block mt-1'>
                                {`${errors.phone_number.message}`}
                            </span>
                        )
                    }
                </div>

                <div className='mt-2 w-full relative mb-1'>

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
                {
                        errors.password && (
                            <span className='text-red-500 mt-1'>
                                {`${errors.password.message}`}
                            </span>
                        )
                    }
                
                <div className='w-full mt-5 '>
                    <input
                        type='submit'
                        value='Signup'
                        disabled={isSubmitting || loading}
                        className={`${styles.button}`}
                        
                    />
                </div>

                <h5 className='text-center pt-4 font-Poppins text-[12px]'>
                    Already have an account ? {" "}
                    <span
                        className='text-[#2190ff] pl-1 cursor-pointer'
                        onClick={() => setActiveState("login")}

                    >Login</span>
                </h5>
            </form>

        </div>




    )
}

export default Signup;