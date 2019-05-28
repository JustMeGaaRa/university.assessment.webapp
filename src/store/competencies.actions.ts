import { ICompetency } from "src/models";
import { RequestClient } from "./request-client";

const hostname = "https://university-assessments-api.azurewebsites.net";

export function createCompetency(competency: ICompetency) {
    return RequestClient.post<ICompetency[]>(`${hostname}/api/competencies`, competency);
}

export function loadCompetencies() {
    return RequestClient.get<ICompetency[]>(`${hostname}/api/competencies`);
}

export function updateCompetency(competency: ICompetency) {
    return RequestClient.put<ICompetency[]>(`${hostname}/api/competencies/${competency.id}`)
}

export function deleteCompetency(competency: ICompetency) {
    return RequestClient.delete<ICompetency[]>(`${hostname}/api/competencies/${competency.id}`);
}