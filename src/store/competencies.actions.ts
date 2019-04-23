import { ICompetency } from "../models/ICompetency";
import { IAssessmentProfile } from "../models/IAssessmentProfile";
import { IIndicator } from "src/models/IIndicator";
import { ISubcompetency } from "src/models/ISubcompetency";

const indicators: IIndicator[] = [
    {
        id: 1,
        subcompetencyId: 1,
        description: "Reasons about the team decisions"
    },
    {
        id: 2,
        subcompetencyId: 1,
        description: "Respective towars each and every member of the team"
    },
    {
        id: 3,
        subcompetencyId: 1,
        description: "Respects the rules and project goals"
    },
    {
        id: 4,
        subcompetencyId: 1,
        description: "Effectively drives the client expectations"
    },
    {
        id: 5,
        subcompetencyId: 1,
        description: "Informs upfront about potential risks on the project"
    },
    {
        id: 6,
        subcompetencyId: 1,
        description: "Sets a high standard of service for each client"
    }
];

const subcompetencies: ISubcompetency[] = [
    {
        id: 1,
        competencyId: 1,
        name: "Performance working with team",
        indicators: indicators.filter(x => x.subcompetencyId === 1)
    },
    {
        id: 2,
        competencyId: 1,
        name: "Working with expectations",
        indicators: indicators.filter(x => x.subcompetencyId === 2)
    }
];

const competencies: ICompetency[] = [
    {
        id: 1,
        name: "Teamwork",
        description: "This competency is intended to measure the performance of an employee",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 1)
    },
    {
        id: 2,
        name: "Client-Oriented",
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 2)
    }
];

const profileIndicators = [
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

const profiles: IAssessmentProfile[] = [
    {
        id: 1,
        name: 'Junior Software Enginner',
        indicators: profileIndicators
            .filter(x => x.assessmentProfileId === 1)
            .map(x => indicators.find(i => i.id === x.indicatorId))
            .filter(notEmpty)
    },
    {
        id: 2,
        name: 'Middle Software Enginner',
        indicators: profileIndicators
            .filter(x => x.assessmentProfileId === 2)
            .map(x => indicators.find(i => i.id === x.indicatorId))
            .filter(notEmpty)
    },
    {
        id: 3,
        name: 'Senior Software Enginner',
        indicators: profileIndicators
            .filter(x => x.assessmentProfileId === 3)
            .map(x => indicators.find(i => i.id === x.indicatorId))
            .filter(notEmpty)
    },
];

function notEmpty<TValue>(value: TValue | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function loadCompetencies() {
    return competencies;
}

export function loadProfiles() {
    return profiles;
}

export function findProfile(assessmentProfileId: number) {
    return profiles.find(x => x.id === assessmentProfileId);
}

export function loadProfileIndicators(assessmentProfileId: number) {
    const profile = findProfile(assessmentProfileId);
    return profile ? profile.indicators : [];
}