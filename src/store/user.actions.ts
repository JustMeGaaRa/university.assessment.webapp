import { IUser } from "../models/IUser";

const users: IUser[] = [
    {
        username: 'matthew',
        fullname: 'Matthew'
    },
    {
        username: 'rachel',
        fullname: 'Rachel'
    },
    {
        username: 'molly',
        fullname: 'Molly'
    },
    {
        username: 'steve',
        fullname: 'Steve'
    }
];

export function loadUsers() {
    return Promise.resolve(users);
}

export function findUser(username: string) {
    return users.find(x => x.username.toLowerCase() === username.toLowerCase());
}