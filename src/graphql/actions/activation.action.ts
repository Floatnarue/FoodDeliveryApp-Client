"use client";

import {DocumentNode, gql } from "@apollo/client";



export const ACTIVATE_USER : DocumentNode= gql`
mutation ActivationUser(
    $activationToken : String!
    $activationCode : String!
) {
    activateUser(
        activationInput : {
            activationToken : $activationToken,
            activationCode : $activationCode,
        }
    ) {
        user {
            name 
            email
            phone_number
            createdAt
        }
    }
}
`;

