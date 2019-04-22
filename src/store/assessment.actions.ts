import { IQuestion } from "../models/IQuestion";

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

export function loadQuestions() {
    return questions;
}