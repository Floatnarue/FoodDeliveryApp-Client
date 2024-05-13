

import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        
        // ...add more providers here
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),

    ],
    secret : process.env.NEXT_AUTH_SECRET , 

}

