import { IUser } from "../models/IUser";
import { IAssessmentProfile } from "../models/IAssessmentProfile";
import { IAssessment } from "../models/IAssessment";

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

const profiles: IAssessmentProfile[] = [
    {
        name: 'Junior Software Enginner',
        indicators: []
    },
    {
        name: 'Middle Software Enginner',
        indicators: []
    },
    {
        name: 'Senior Software Enginner',
        indicators: []
    },
];

const assessments: IAssessment[] = [
    {
        username: 'matthew',
        fullname: 'Matthew',
        avatarUrl: '/images/avatar/matthew.png',
        date: new Date(2019, 4, 19),
        description: 'This assessment should be passed due deadline.',
    },
    {
        username: 'rachel',
        fullname: 'Rachel',
        avatarUrl: '/images/avatar/rachel.png',
        date: new Date(2019, 4, 19),
        description: 'This assessment should be passed due deadline.'
    },
    {
        username: 'molly',
        fullname: 'Molly',
        avatarUrl: '/images/avatar/molly.png',
        date: new Date(2019, 4, 19),
        description: 'This assessment should be passed due deadline.'
    },
    {
        username: 'steve',
        fullname: 'Steve',
        avatarUrl: '/images/avatar/steve.jpg',
        date: new Date(2019, 4, 19),
        description: 'This assessment should be passed due deadline.'
    }
];

export function loadUsers() {
    return users;
}

export function findUser(username: string) {
    return users.find(x => x.username.toLowerCase() === username.toLowerCase());
}

export function loadProfiles() {
    return profiles;
}

export function findProfile(name: string) {
    return profiles.find(x => x.name.toLowerCase() === name.toLowerCase());
}

export function loadAssessments(username?: string) {
    return username
        ? assessments.filter(x => x.username.indexOf(username) >= 0)
        : assessments;
}