import { ICompetency } from "src/models";
import { RequestClient } from "./request-client";

export function createCompetency(competency: ICompetency) {
    return RequestClient.post<ICompetency[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/competencies`, competency);
}

export function loadCompetencies() {
    return RequestClient.get<ICompetency[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/competencies`);
}

export function updateCompetency(competency: ICompetency) {
    return RequestClient.put<ICompetency[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/competencies/${competency.id}`, competency);
}

export function deleteCompetency(competency: ICompetency) {
    return RequestClient.delete<ICompetency[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/competencies/${competency.id}`);
}