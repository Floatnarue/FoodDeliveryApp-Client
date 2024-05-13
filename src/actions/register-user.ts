"use server";
import prisma from "../lib/prismaDb";
import * as bcrpyt from 'bcrypt';

const generateRandomPassword = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+";
    const charactersLength = 8;

    const uniqueCharacters = [...Array.from(new Set(characters))];

    let password = "";

    for (let i = 0; i < charactersLength; i++) {
        const randomIndex = Math.floor(Math.random() * uniqueCharacters.length);
        password += uniqueCharacters[randomIndex];
    }

    return password;
};

export const registerUser = async (userData: any) => {
    console.log(userData)
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    //if user existed

    if (isUserExist) {
        return isUserExist;
    }


    // if user not existed 
    const password = generateRandomPassword();



    const hashedPassword = await bcrpyt.hash(password, 10);

    const user = await prisma.user.create({
        data : {
            name : userData.name,
            email : userData.email ,
            password : hashedPassword ,
            role : "User",
            
        }
    })
    return user;
};