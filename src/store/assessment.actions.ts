import { assessments } from "./assessment.mocks";

export function loadUserAssessments(username?: string) {
    return username
        ? assessments.filter(x => x.username.toLowerCase() === username.toLowerCase())
        : assessments;
}

export function loadRespondentAssessments(username?: string) {
    return username
        ? assessments.filter(x => x.respondent.toLowerCase() === username.toLowerCase())
        : assessments;
}

export function findUserAssessment(assessmentId: number) {
    return assessments.find(x => x.assessmentId == assessmentId);
}