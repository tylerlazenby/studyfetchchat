import  {genSaltSync, hashSync, compareSync} from 'bcrypt-ts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const saltAndHashPassword = (password: string | unknown) => {
    if (typeof password !== "string") {
        throw new Error("Password cannot be blank, and must be a string. Received type: " + typeof password)
    }

    const salt = genSaltSync(10)
    return hashSync(password, salt)
}

export const getUserFromDb = async (email: string | unknown, password: string | unknown) => {
    // first get the db
    const user = await prisma.user.findFirst({
        where: {
            email: email as string
        }
    })
    if (!user) {
        return null
    }

    if ( typeof password !== "string") {
        throw new Error("Password cannot be blank, and must be a string. Received type: " + typeof password)
    }

    // now check if the password matches the saved hash
    if (compareSync(password, user.password)) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    } else {
        return null
    }
}