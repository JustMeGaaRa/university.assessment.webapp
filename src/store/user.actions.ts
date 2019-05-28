import { IUser } from "../models/IUser";

const users: IUser[] = [
    {
        username: 'matthew',
        fullname: 'Matthew',
        avatarUrl: ''
    },
    {
        username: 'rachel',
        fullname: 'Rachel',
        avatarUrl: ''
    },
    {
        username: 'molly',
        fullname: 'Molly',
        avatarUrl: ''
    },
    {
        username: 'steve',
        fullname: 'Steve',
        avatarUrl: ''
    }
];

export function loadUsers() {
    return Promise.resolve(users);
}

export function findUser(username: string) {
    return users.find(x => x.username.toLowerCase() === username.toLowerCase());
}