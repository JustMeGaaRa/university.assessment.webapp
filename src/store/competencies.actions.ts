import { competencies } from "./competencies.mocks";
import { ICompetency } from "src/models/ICompetency";

export function createCompetency(competency: ICompetency) {
    return Promise.resolve(competencies.concat(competency));
}

export function deleteCompetency(competency: ICompetency) {
    return Promise.resolve(competencies.filter( x=> x.competencyId !== competency.competencyId));
}

export function loadCompetencies() {
    return Promise.resolve(competencies);
}