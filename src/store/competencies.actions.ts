import { ICompetency } from "src/models";
import { RequestClient } from "./request-client";

const hostname = "";

export function createCompetency(competency: ICompetency) {
    return RequestClient.post<ICompetency[]>(`${hostname}/api/competencies`, competency);
}

export function deleteCompetency(competency: ICompetency) {
    return RequestClient.delete<ICompetency[]>(`${hostname}/api/competencies/${competency.id}`);
}

export function loadCompetencies() {
    return RequestClient.get<ICompetency[]>(`${hostname}/api/competencies`);
}