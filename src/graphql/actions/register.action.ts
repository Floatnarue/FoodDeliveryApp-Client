"use client";

import {DocumentNode, gql } from "@apollo/client";



export const REGISTER_USER : DocumentNode= gql`
mutation RegisterUser(
    $name : String!
    $email : String!
    $password : String!
    $phone_number : Float!
    $address : String!
) {
    register(
        registerInput : {
            name : $name ,
            password : $password,
            email : $email ,
            phone_number : $phone_number,
            address : $address
        }
    ) {
        activation_token
    }
}
`;

