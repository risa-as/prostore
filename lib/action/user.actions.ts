"use server"
import { signInFormSchema, signUpFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import {prisma} from "@/db/prisma"
import { hashSync } from "bcrypt-ts-edge"
import { formatError } from "../utils"
// Sign In The User with credentials 
export async function signInWithCredentials(prevState: unknown,
    formData:FormData) {
        try {   
            const user = signInFormSchema.parse({
                email: formData.get("email"),
                password: formData.get("password")
            })
            await signIn("credentials", {
                email: user.email,
                password: user.password,
                redirect:true,
                  callbackUrl: "/"

                // redirectTo: "/"
            })

            // return {success: true, message: "Signed in successfully"}
        } catch(error) {
            if(isRedirectError(error)) throw error
            return {success: false, message: "Invalid email or password"}
        }
}

// Sign User Out
export async function signOutUser() {
    await signOut();
}

// Sign Up User
export async function signUpWithCredentials(prevState: unknown,
    formData: FormData
) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        })

        const hashPassword = hashSync(user.password);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashPassword,
            },
        });

        await signIn('credentials', {
            email: user.email,
            password: user.password,
        });
        return {success: true, fieldErrors: {}, formError: ""}
// ... داخل الدالة
    } catch(error) {
        if (isRedirectError(error)) throw error;
        // Use Function From Utils To Handle Error
        const errorMessage = formatError(error)
        return errorMessage;
    }
}