import { IAssessmentResult } from "../models/IAssessmentResult";

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

export function loadAssessmentResult() {
    return results;
}