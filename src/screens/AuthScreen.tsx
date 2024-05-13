import React, { useState } from 'react'
import Login from '../shared/Auth/Login';
import Signup from '../shared/Auth/Signup';
import Verification from '../shared/Auth/Verification';
import ForgotPassword from '../shared/Auth/ForgotPassword';



const AuthScreen = ({ setOpen }: { setOpen: (e: boolean) => void }) => {

    const [activeState, setActiveState] = useState("login");

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.id === 'screen') {
            setOpen(false);
        }
    }
    return (


        <div
            className='w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000027]'
            id='screen'
            onClick={handleClose}
        >
            <div className='w-[50%] h-[700px] bg-slate-900 rounded shadow-sm p-4'>
                {activeState === "login" && (
                    <Login setActiveState={setActiveState}  setOpen={setOpen}/>
                )}
                {activeState === "signup" && (
                    <Signup setActiveState={setActiveState} />
                )}
                {activeState === "verification" && (
                    <Verification setActiveState={setActiveState} />
                )}
                {activeState === "forgotPassword" && (
                    <ForgotPassword setActiveState={setActiveState} />
                )}
            </div>

        </div>


    )
}

export default AuthScreen;