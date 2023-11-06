import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismaUserRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('adds a user in the database', async () => {
        const userToBePersisted = new Bike(
            'test bike',
            'dirt',
            12,
            2,
            5,
            'test description',
            5,
            ['aaa']
        )
        const repo = new PrismaBikeRepo()
        const userId = await repo.add(userToBePersisted)
        expect(userId).toBeDefined()
        const persistedUser = await repo.find(userToBePersisted.name)
        expect(persistedUser.name).toEqual(
            userToBePersisted.name
        )
    })

    it('removes a user from the database', async () => {
        const userToBePersisted = new Bike(
            'test bike',
            'dirt',
            12,
            2,
            5,
            'test description',
            5,
            ['aaa']
        )
        const repo = new PrismaBikeRepo()
        await repo.add(userToBePersisted)
        await repo.remove('test bike')
        const removedUser = await repo.find('test bike')
        expect(removedUser).toBeNull()
    })

    it('lists users in the database', async () => {
        const user1 = new Bike(
            'test bike',
            'dirt',
            12,
            2,
            5,
            'test description',
            5,
            ['aaa']
        )
        const user2 = new Bike(
            'test bike2',
            'dirt',
            12,
            2,
            5,
            'test description',
            5,
            ['aaa']
        )
        const repo = new PrismaBikeRepo()
        await repo.add(user1)
        await repo.add(user2)
        const userList = await repo.list()
        expect(userList.length).toEqual(2)
    })
})