import {z} from "zod"
export const loginSchema=z.object({
    email:z
    .string()
    .trim()
    .toLowerCase()
    .email("invalid email address"),
    password:z
    .string()
    .min(4,"must be atleast 4 character")  
})