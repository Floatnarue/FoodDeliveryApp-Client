"use client";

import { gql, DocumentNode } from "@apollo/client";

export const GET_USER: DocumentNode = gql`
  query {
    getLoginUser {
      user {
        id
        name
        email
        phone_number
        address
        password
        role
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`;