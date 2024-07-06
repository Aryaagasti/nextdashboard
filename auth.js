import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToDB } from "@/app/lib/db"
import { Users } from "@/app/lib/model"
import bcrypt from "bcrypt"

const login = async(credentials)  => {
  try{
    connectToDB();
    const user = await Users.findOne({username:credentials.username});

    if(!user || !user.isAdmin) throw new Error("Wrong Credentials");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if(!isPasswordCorrect) throw new Error ("Wrong Credentials");

    return user;
  }catch(err){
    console.log(err);
    throw new Error("Failed to login!")
  }
}



export const {signIn,signOut,auth} = NextAuth({
  ...authConfig,
  providers:[
    CredentialsProvider({
      async authorize(credentials){
        try{
          const user = await login(credentials);
          return user;
        }catch(err){
          return null
        }
      }
    })
  ]
})