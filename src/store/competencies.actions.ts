import { ICompetency } from "src/models";
import { RequestClient } from "./request-client";

export function createCompetency(competency: ICompetency) {
    return RequestClient.post<ICompetency[]>("api/competencies", competency);
}

export function deleteCompetency(competency: ICompetency) {
    return RequestClient.delete<ICompetency[]>(`api/competencies/${competency.competencyId}`);
}

export function loadCompetencies() {
    return RequestClient.get<ICompetency[]>("api/competencies");
}