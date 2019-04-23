import { IQuestion } from "../models/IQuestion";
import { IAssessment } from "../models/IAssessment";
import { IAssessmentResult } from "../models/IAssessmentResult";

const questions: IQuestion[] = [
    {
        id: 1,
        text: 'How good is the cadidate in teamwork?',
    },
    {
        id: 2,
        text: 'How good is the candidate in communication?',
    },
    {
        id: 3,
        text: 'How good is the candidate when working with a client?',
    },
    {
        id: 4,
        text: 'How good is the candidate in estimation?',
    },
    {
        id: 5,
        text: 'How good is the candidate with presentation?',
    }
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

const results: IAssessmentResult[] = [
    {
        username: 'matthew',
        fullname: 'Matthew',
        date: new Date(2019, 5, 1),
        answers: [
            {
                id: 1,
                text: '',
                result: 2,
            },
            {
                id: 2,
                text: '',
                result: 5,
            },
            {
                id: 3,
                text: '',
                result: 4
            },
            {
                id: 4,
                text: '',
                result: 4
            },
            {
                id: 5,
                text: '',
                result: 3
            }
        ]
    }
]

export function loadQuestions() {
    return questions;
}

export function loadAssessments(username?: string) {
    return username
        ? assessments.filter(x => x.username.indexOf(username) >= 0)
        : assessments;
}

export function loadAssessmentResult() {
    return results;
}