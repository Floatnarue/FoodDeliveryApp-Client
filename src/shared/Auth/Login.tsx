import styles from '@/src/utils/style'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@/src/graphql/actions/login.action'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),

})


type LoginSchema = z.infer<typeof formSchema>;





const Login = ({ setActiveState, setOpen }: {
    setActiveState: (e: string) => void;
    setOpen: (e: boolean) => void;
}) => {

    const [LoginUser, { loading }] = useMutation(LOGIN_USER);
    

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginSchema>(
        {
            resolver: zodResolver(formSchema),
        }
    )

    const onSubmit = async (data: LoginSchema) => {
        const loginData = {
            email: data.email,
            password: data.password,
        };
        console.log("🚀 ~ onSubmit ~ loginData:", loginData)
        
        
        const response = await LoginUser({
            variables: loginData,
        });


        console.log(response.data)
        
        if (response.data.Login.user) {

            toast.success("Login successful!")
            // store our token in cookies
            Cookies.set("access_token", response.data.Login.accessToken)
            Cookies.set("refresh_token", response.data.Login.refreshToken)
            setOpen(false);
            reset();
            //window.location.reload();
        }
        else {

            toast.error(response.data.Login.error.message);

        }

    }

    const [showPassword, setShowPassword] = useState(false)


    return (
        <div>
            <br />
            
            <h1 className={`${styles.title}`}>Login</h1>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={`${styles.label}`}>
                        Enter your email
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
                <div className='w-full mt-5 '>
                    <input
                        type='submit'
                        value='Login'
                        disabled={isSubmitting || loading}
                        className={`${styles.button} mt-3`}
                    />
                    <span 
                    className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}
                    onClick={() => setActiveState("forgotPassword")}
                    >Forget your password</span>
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[12px] text-white'>Or join us with</h5>
                <div 
                className='flex items-center justify-center my-3 '
                onClick={() => signIn()}
                >
                    <FcGoogle size={30} className='cursor-pointer mr-2' />

                </div>
                <h5 className='text-center pt-4 font-Poppins text-[12px]'>
                    Not have any account? {" "}
                    <span
                        className='text-[#2190ff] pl-1 cursor-pointer'
                        onClick={() => setActiveState("signup")}

                    >Sign Up</span>
                </h5>
            </form>

        </div>




    )
}

export default Login