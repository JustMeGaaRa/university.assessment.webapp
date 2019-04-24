import { assessments } from "./assessment.mocks";

export function loadAssessments(username?: string) {
    return username
        ? assessments.filter(x => x.username.indexOf(username) >= 0)
        : assessments;
}

export function findAssessment(assessmentId: number) {
    return assessments.find(x => x.assessmentId == assessmentId);
}