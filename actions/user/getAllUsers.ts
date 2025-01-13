'use server'

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const getAllUsers = async () => {
    return prisma.user.findMany();
}

export default getAllUsers