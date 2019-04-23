import { ICompetency } from "../models/ICompetency";
import { IAssessmentProfile } from "../models/IAssessmentProfile";

const competencies: ICompetency[] = [
    {
        id: 1,
        name: "Teamwork",
        description: "This competency is intended to measure the performance of an employee",
        subcompetencies: [
            {
                id: 1,
                name: "Performance working with team",
                indicators: [
                    {
                        id: 1,
                        description: "Reasons about the team decisions"
                    },
                    {
                        id: 2,
                        description: "Respective towars each and every member of the team"
                    },
                    {
                        id: 3,
                        description: "Respects the rules and project goals"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Client-Oriented",
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: [
            {
                id: 2,
                name: "Working with expectations",
                indicators: [
                    {
                        id: 4,
                        description: "Effectively drives the client expectations"
                    },
                    {
                        id: 5,
                        description: "Informs upfront about potential risks on the project"
                    },
                    {
                        id: 6,
                        description: "Sets a high standard of service for each client"
                    }
                ]
            }
        ]
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

export function loadCompetencies() {
    return competencies;
}

export function loadProfiles() {
    return profiles;
}

export function findProfile(name: string) {
    return profiles.find(x => x.name.toLowerCase() === name.toLowerCase());
}