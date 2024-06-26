"use client";

import { DocumentNode, gql } from "@apollo/client";



export const LOGIN_USER: DocumentNode = gql`
mutation LoginUser(
    $email : String!,
    $password : String!
) {
    Login(
        email : $email
        password : $password 
    ) {
        user {
            id
            name 
            email
            password
            phone_number
            address
            
        }
        accessToken
        refreshToken
        error {
            message
        }
    }
}
`;

