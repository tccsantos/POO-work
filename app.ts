import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email})
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    registerBike(bike: Bike): void {
        for (const rbike of this.bikes) {
            if (rbike.id === bike.id) {
                throw new Error('Duplicate bike.')
            }
        }
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    removeUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                const i = this.users.indexOf(rUser)
                this.users.splice(i)
                return
            }
        }
        throw new Error('User not found')
    }

    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): void {
        const rent = Rent.create(this.rents, bike, user, startDate, endDate)
        if (rent) this.rents.push(rent)
        else console.log(rent)
    }

    returnBike(aDate: Date, endDate: Date, bike: Bike) {
        for (const rent of this.rents) {
            if(rent.bike === bike && rent.dateTo === endDate){
                rent.dateReturned = aDate
                return
            }
        }
        throw new Error('Rent not found')
    }
}