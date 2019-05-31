import { IAssessmentResult } from "src/models/Assessments/IAssessmentResult";
import { RequestClient } from "./request-client";

export function loadAssessmentResults(username: string) {
    return RequestClient.get<IAssessmentResult[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessment-results?username=${username}`);
}

export function findAssessmentResult(assessmentId: number) {
    return RequestClient.get<IAssessmentResult>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessment-results/${assessmentId}`);
}

export function updateAssessmentResult(assessment: IAssessmentResult) {
    return RequestClient.put<IAssessmentResult[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessment-results/${assessment.id}`, assessment);
}