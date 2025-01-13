'use server'

import {PrismaClient} from "@prisma/client";
import {saltAndHashPassword} from "@/utils/password";

const prisma = new PrismaClient()

const createUser = async ({email, password, name}: {email: string, password: string, name: string}) => {
    return prisma.user.create({
        data: {
            email,
            password: saltAndHashPassword(password),
            name
        }
    })
}

export { createUser }