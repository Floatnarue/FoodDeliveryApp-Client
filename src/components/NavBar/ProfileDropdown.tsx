'use client'


import useUser from '@/src/hooks/useUser';
import AuthScreen from '@/src/screens/AuthScreen';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useState } from 'react'
import { CgProfile } from "react-icons/cg";

const ProfileDropdown = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [open , setOpen] = useState(false ) ;
    const {user,loading} = useUser();
    console.log(user)
    
    return (
        <div className='flex items-center gap-4'>
            {signedIn ? (
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar as='button' className='transition-transform'
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Profile Actions' variant='flat'>
                        <DropdownItem key='profile' className='h-14 gap-2'>
                            <p className='font-semibold'>
                                Sign in as
                            </p>
                            <p className='font-semibold '>
                                support@floatnarue.com
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
                        <DropdownItem key='setting' className='h-14 gap-2'>
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
                    <AuthScreen setOpen = {setOpen}/>
                )

            }

            
        </div>
    )
}

export default ProfileDropdown