'use client'


import useUser from '@/src/hooks/useUser';
import AuthScreen from '@/src/screens/AuthScreen';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useSession, signIn, signOut } from 'next-auth/react'
import { registerUser } from '@/src/actions/register-user';
const ProfileDropdown = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const { user, loading } = useUser();
    const { data } = useSession();
    console.log("🚀 ~ ProfileDropdown ~ user:", user)

    useEffect(() => {
        if (!loading) {
            setSignedIn(!!user);
        }
        if (data?.user) {
            setSignedIn(true);
            addUsers(data?.user);
        }

    }, [loading, user, open, data]);


    const LogoutHandler = () => {
        if (data?.user) {
            signOut();
        } else {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            toast.success("Log out successful!");
            window.location.reload();
        }
    };

    const addUsers = async (user: any) => {
        await registerUser(user);
    }

    return (
        <div className='flex items-center gap-4'>
            {signedIn ? (
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar as='button' className='transition-transform'
                            src={data?.user ? data.user.image : user.image} />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Profile Actions' variant='flat'>
                        <DropdownItem key='profile' className='h-14 gap-2'>
                            <p className='font-semibold'>
                                Sign in as
                            </p>
                            <p className='font-semibold '>
                                {data?.user ? data.user.email : user.email}
                            </p>
                        </DropdownItem>
                        <DropdownItem key='setting' className='h-14 gap-2'>
                            My Profile
                        </DropdownItem>
                        <DropdownItem key='setting' className='h-14 gap-2'>
                            All orders
                        </DropdownItem>
                        <DropdownItem key='setting' className='h-14 gap-2'>
                            Apply for seller
                        </DropdownItem>
                        <DropdownItem key='setting' className='h-14 gap-2'>
                            Setting
                        </DropdownItem>
                        <DropdownItem key='setting'
                            className='h-14 gap-2'
                            onClick={() => signOut() || LogoutHandler}
                        >
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <CgProfile
                    className='text-2xl cursor-pointer'
                    onClick={() => setOpen(!open)}
                />
            )}

            {
                open && (
                    <AuthScreen setOpen={setOpen} />
                )

            }


        </div>
    )
}

export default ProfileDropdown