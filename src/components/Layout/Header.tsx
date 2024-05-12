import React from 'react'
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import { Button } from '@nextui-org/react';
import styles from '@/src/utils/style';
import NavItems from '../NavBar/NavItems';
import ProfileDropdown from '../NavBar/ProfileDropdown';
const Header = () => {
  return (
    <header className='w-full h-[70px] bg-[#0F1524]'>
        <div className=" w-[90%] m-auto flex items-center justify-between ">
            <h1 className={`${styles.logo}`}>
                Floatnarue
            </h1>
            <NavItems/>
            <ProfileDropdown/>
            
        </div>
        
    </header>
  )
}

export default Header