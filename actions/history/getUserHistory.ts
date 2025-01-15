'use server'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getUserHistory = async (email: string) => {
    return prisma.history.findMany({where: {
        userId: email,
        NOT: {
            type: 'system'
        }
    }})
}

export default getUserHistory