import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";



const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_USER_PASS_URL as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
 emailAndPassword: { 
    enabled: true, 
    
  },
  socialProviders:{
google: {
  clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string
},

github: {
clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRETS as string
},
  },
    database: mongodbAdapter(db, {
    client,
  }),
});