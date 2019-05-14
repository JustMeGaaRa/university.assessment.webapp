import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { indicators } from "./competencies.mocks";
import { IQuestion } from "src/models/IQuestion";
import { IIndicator } from "src/models/IIndicator";

export const profileIndicators = [
    {
        assessmentProfileId: 1,
        indicatorId: 1,
    },
    {
        assessmentProfileId: 1,
        indicatorId: 2,
    },
    {
        assessmentProfileId: 2,
        indicatorId: 3,
    },
    {
        assessmentProfileId: 2,
        indicatorId: 4,
    },
    {
        assessmentProfileId: 3,
        indicatorId: 5,
    },
    {
        assessmentProfileId: 3,
        indicatorId: 6,
    }
];

const competencies = [
    {
        competencyId: 1,
        name: "Teamwork",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the performance of an employee",
        subcompetencies: []
    },
    {
        competencyId: 2,
        name: "Client-Oriented",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: []
    }
];

export const profiles: IAssessmentProfile[] = [
    {
        profileId: 1,
        name: 'Junior Software Enginner',
        creationDate: new Date(2019, 4, 24),
        competencies: competencies,
        questions: filterIndicators(1)
    },
    {
        profileId: 2,
        name: 'Middle Software Enginner',
        creationDate: new Date(2019, 4, 24),
        competencies: competencies,
        questions: filterIndicators(2)
    },
    {
        profileId: 3,
        name: 'Senior Software Enginner',
        creationDate: new Date(2019, 4, 24),
        competencies: competencies,
        questions: filterIndicators(3)
    },
];

function filterIndicators(assessmentProfileId: number) {
    return profileIndicators
        .filter(x => x.assessmentProfileId === assessmentProfileId)
        .map(x => indicators.find(indicator => indicator.indicatorId === x.indicatorId))
        .filter(notEmpty)
        .map(toQuestion);
}

function notEmpty<TValue>(value: TValue | undefined): value is TValue {
    return value !== null && value !== undefined;
}

function toQuestion(indicator: IIndicator) {
    // TODO: don't set an id here, set it on backend
    const question: IQuestion = {
        questionId: 0,
        competency: "",
        subcompetency: "",
        text: indicator.description
    };
    return question;
}