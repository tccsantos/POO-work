export class UserStillHaveRent extends Error {
    public readonly name = 'UserStillHaveRent'

    constructor() {
        super('The user still have an open rent')
    }
}