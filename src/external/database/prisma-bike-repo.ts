import { BikeRepo } from "../../ports/bike-repo";
import { Bike } from "../../bike";
import prisma from "./db"

export class PrismaBikeRepo implements BikeRepo {
    update(id: string, bike: Bike): Promise<void> {
        bike.id = id
    }

    async find(name: string): Promise<Bike> {
        return await prisma.bike.findFirst({
            where: { name }
        })
    }

    async add(bike: Bike): Promise<string> {
        const addedUser = await prisma.bike.create({
            data: { ...bike }
        })
        return addedUser.id
    }

    async remove(bike: string): Promise<void> {
        await prisma.bike.delete({
            where: { bike }
        })
    }

    async list(): Promise<Bike[]> {
        return await prisma.bike.findMany({})
    }
}