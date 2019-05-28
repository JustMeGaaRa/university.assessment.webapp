import { IAssessmentResult } from "src/models/Assessments/IAssessmentResult";
import { RequestClient } from "./request-client";

const hostname = "https://university-assessments-api.azurewebsites.net";

export function loadAssessmentResults(username: string) {
    return RequestClient.get<IAssessmentResult[]>(`${hostname}/api/assessment-results?username=${username}`);
}

export function findAssessmentResult(assessmentId: number) {
    return RequestClient.get<IAssessmentResult>(`${hostname}/api/assessment-results/${assessmentId}`);
}

export function updateAssessmentResult(assessment: IAssessmentResult) {
    return RequestClient.get<IAssessmentResult[]>(`${hostname}/api/assessment-results/${assessment.id}`);
}