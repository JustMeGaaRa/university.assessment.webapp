import { ICompetency } from "src/models/ICompetency";
import { ISubcompetency } from "src/models/ISubcompetency";
import { IIndicator } from "src/models/IIndicator";

export const indicators: IIndicator[] = [
    {
        indicatorId: 1,
        subcompetencyId: 1,
        description: "Reasons about the team decisions"
    },
    {
        indicatorId: 2,
        subcompetencyId: 1,
        description: "Respective towars each and every member of the team"
    },
    {
        indicatorId: 3,
        subcompetencyId: 1,
        description: "Respects the rules and project goals"
    },
    {
        indicatorId: 4,
        subcompetencyId: 2,
        description: "Effectively drives the client expectations"
    },
    {
        indicatorId: 5,
        subcompetencyId: 2,
        description: "Informs upfront about potential risks on the project"
    },
    {
        indicatorId: 6,
        subcompetencyId: 2,
        description: "Sets a high standard of service for each client"
    }
];

export const subcompetencies: ISubcompetency[] = [
    {
        subcompetencyId: 1,
        competencyId: 1,
        name: "Performance working with team",
        indicators: indicators.filter(x => x.subcompetencyId === 1)
    },
    {
        subcompetencyId: 2,
        competencyId: 1,
        name: "Working with expectations",
        indicators: indicators.filter(x => x.subcompetencyId === 2)
    }
];

export const competencies: ICompetency[] = [
    {
        competencyId: 1,
        name: "Teamwork",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the performance of an employee",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 1)
    },
    {
        competencyId: 2,
        name: "Client-Oriented",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 2)
    },
    {
        competencyId: 3,
        name: "Effective Interaction",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 2)
    },
    {
        competencyId: 4,
        name: "Organizing Work",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 2)
    },
    {
        competencyId: 5,
        name: "Decision Making",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 2)
    },
    {
        competencyId: 6,
        name: "Result-Orientation",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 2)
    },
    {
        competencyId: 7,
        name: "Communication",
        date: new Date(Date.now()),
        description: "This competency is intended to measure the professionalism when working with clients",
        subcompetencies: subcompetencies.filter(x => x.competencyId === 2)
    }
];