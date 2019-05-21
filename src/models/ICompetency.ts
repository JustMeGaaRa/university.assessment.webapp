import { ISubcompetency } from "./ISubcompetency";
import { IIndicator } from "./IIndicator";

export interface ICompetency {
    id?: string;
    name: string;
    date: Date;
    description: string;
    subcompetencies: ISubcompetency[];
}

export function flatMapIndicators(competencies: ICompetency[]) {
    return competencies.map(competency => 
        competency.subcompetencies.map<ISubcompetency>(subcompetency => ({
            ...subcompetency,
            competencyId: competency.id,
            competencyName: competency.name
        }))
    )
    .reduce((left, right) => left.concat(right), [])
    .map(subcompetency => 
        subcompetency.indicators.map<IIndicator>(indicator => ({
            ...indicator,
            competencyId: subcompetency.competencyId,
            competencyName: subcompetency.competencyName,
            subcompetencyId: subcompetency.subcompetencyId,
            subcompetencyName: subcompetency.name
        }))
    )
    .reduce((left, right) => left.concat(right), []);
}