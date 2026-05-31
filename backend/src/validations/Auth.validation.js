import {z} from "zod"

export const registerSchema=z.object({
    username:z
    .string()
    .min(4,"username must be atleast four character")
    .max(20,"username cannot be more then 20 character"),

    fullname:z
    .string()
    .min(4,"username must be atleast 4 character")
    .max(25,"username musnt exceed 20 character"),

    email:z
    .string()
    .regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Invalid email address"),
    
    password:z
    .string()
    .min(4,"password must be atleast 4 character")
    

})