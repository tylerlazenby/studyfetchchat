import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter }  from "@auth/mongodb-adapter";
import client from '@/lib/db'
// Your own logic for dealing with plaintext password strings; be careful!
import { getUserFromDb } from "@/utils/password"


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null


                // logic to verify if the user exists
                user = await getUserFromDb(credentials.email , credentials.password)

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        }),
    ],
})