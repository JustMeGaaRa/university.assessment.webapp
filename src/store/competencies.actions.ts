import { ICompetency } from "../models/ICompetency";

const competencies: ICompetency[] = [
    {
        id: 1,
        name: "Teamwork",
        subcompetencies: [
            {
                id: 1,
                name: "Performance",
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
        subcompetencies: [
            {
                id: 2,
                name: "Matching Expectations",
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

export function loadCompetencies() {
    return competencies;
}