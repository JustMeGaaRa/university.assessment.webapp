import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { indicators } from "./competencies.mocks";
import { IQuestion } from "src/models/IQuestion";
import { IIndicator } from "src/models/IIndicator";
import { loadCompetencies } from "./competencies.actions";

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
]

export const profiles: IAssessmentProfile[] = [
    {
        id: 1,
        name: 'Junior Software Enginner',
        creationDate: new Date(2019, 4, 24),
        competencies: loadCompetencies(),
        questions: filterIndicators(1)
    },
    {
        id: 2,
        name: 'Middle Software Enginner',
        creationDate: new Date(2019, 4, 24),
        competencies: loadCompetencies(),
        questions: filterIndicators(2)
    },
    {
        id: 3,
        name: 'Senior Software Enginner',
        creationDate: new Date(2019, 4, 24),
        competencies: loadCompetencies(),
        questions: filterIndicators(3)
    },
];

function filterIndicators(assessmentProfileId: number) {
    return profileIndicators
        .filter(x => x.assessmentProfileId === assessmentProfileId)
        .map(x => indicators.find(i => i.id === x.indicatorId))
        .filter(notEmpty)
        .map(toQuestion);
}

function notEmpty<TValue>(value: TValue | undefined): value is TValue {
    return value !== null && value !== undefined;
}

function toQuestion(indicator: IIndicator) {
    // TODO: don't set an id here, set it on backend
    const question: IQuestion = {
        id: 0,
        competency: "",
        subcompetency: "",
        text: indicator.description
    };
    return question;
}