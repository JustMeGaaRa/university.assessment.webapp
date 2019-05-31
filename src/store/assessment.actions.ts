import { IAssessment } from "src/models";
import { RequestClient } from "./request-client";

export function createAssessment(assessment: IAssessment) {
    return RequestClient.post<IAssessment[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessments`, assessment);
}

export function deleteAssessment(assessment: IAssessment) {
    return RequestClient.delete<IAssessment[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessments/${assessment.id}`);
}

export function loadUserAssessments(username?: string) {
    return RequestClient.get<IAssessment[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessments?username=${username}`);
}

export function loadRespondentAssessments(username?: string) {
    return RequestClient.get<IAssessment[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessments?respondent=${username}`);
}

export function findUserAssessment(assessmentId: number) {
    return RequestClient.get<IAssessment>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessments/${assessmentId}`);
}