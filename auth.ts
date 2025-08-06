import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {connectToDb} from '@/db'
import { Db } from "mongodb";
import { nextCookies } from "better-auth/next-js";
 
const {client} = await connectToDb();

export const auth = betterAuth({
    database: mongodbAdapter(client.db as Db),
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    plugins:[nextCookies()]
});