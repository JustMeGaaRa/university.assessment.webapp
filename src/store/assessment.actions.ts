import { IAssessment } from "src/models";
import { RequestClient } from "./request-client";

const hostname = "https://university-assessments-api.azurewebsites.net";

export function createAssessment(assessment: IAssessment) {
    return RequestClient.post<IAssessment[]>(`${hostname}/api/assessments`, assessment);
}

export function deleteAssessment(assessment: IAssessment) {
    return RequestClient.delete<IAssessment[]>(`${hostname}/api/assessments/${assessment.id}`);
}

export function loadUserAssessments(username?: string) {
    return RequestClient.get<IAssessment[]>(`${hostname}/api/assessments?username=${username}`);
}

export function loadRespondentAssessments(username?: string) {
    return RequestClient.get<IAssessment[]>(`${hostname}/api/assessments?username=${username}`);
}

export function findUserAssessment(assessmentId: number) {
    return RequestClient.get<IAssessment>(`${hostname}/api/assessments/${assessmentId}`);
}