import { IAssessment } from "../models/IAssessment";
import { IAssessmentResult } from "../models/IAssessmentResult";

const assessments: IAssessment[] = [
    {
        assessmentId: 1,
        username: 'matthew',
        fullname: 'Matthew',
        avatarUrl: '/images/avatar/matthew.png',
        date: new Date(2019, 4, 19),
        assessmentProfileId: 1,
        description: 'This assessment should be passed due deadline.',
    },
    {
        assessmentId: 2,
        username: 'rachel',
        fullname: 'Rachel',
        avatarUrl: '/images/avatar/rachel.png',
        date: new Date(2019, 4, 19),
        assessmentProfileId: 2,
        description: 'This assessment should be passed due deadline.'
    },
    {
        assessmentId: 3,
        username: 'molly',
        fullname: 'Molly',
        avatarUrl: '/images/avatar/molly.png',
        date: new Date(2019, 4, 19),
        assessmentProfileId: 3,
        description: 'This assessment should be passed due deadline.'
    },
    {
        assessmentId: 4,
        username: 'steve',
        fullname: 'Steve',
        avatarUrl: '/images/avatar/steve.jpg',
        date: new Date(2019, 4, 19),
        assessmentProfileId: 1,
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
                question: '',
                result: 2,
            },
            {
                id: 2,
                question: '',
                result: 5,
            },
            {
                id: 3,
                question: '',
                result: 4
            },
            {
                id: 4,
                question: '',
                result: 4
            },
            {
                id: 5,
                question: '',
                result: 3
            }
        ]
    }
]

export function loadAssessments(username?: string) {
    return username
        ? assessments.filter(x => x.username.indexOf(username) >= 0)
        : assessments;
}

export function findAssessment(assessmentId: number) {
    return assessments.find(x => x.assessmentId == assessmentId);
}

export function loadAssessmentResult() {
    return results;
}