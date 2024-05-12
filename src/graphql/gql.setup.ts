import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import Cookies from "js-cookie";


const httpLink = createHttpLink ({
    uri :process.env.NEXT_PUBLIC_SERVER_URI,
})

/// SetUp middle ware before access GraphQL to sent token from cookies as well
// => to check auth

const authMiddleware = new ApolloLink((oparetion,forward) => {
    oparetion.setContext({
        headers: {
            accessToken : Cookies.get("access_token"),
            refreshToken : Cookies.get("refresh_token"),
        }
    });

    return forward(oparetion)
})

export const grapqlClient = new ApolloClient (
    {
        link : authMiddleware.concat(httpLink) ,
        cache : new InMemoryCache() ,
    }
)

