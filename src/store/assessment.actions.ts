import { assessments } from "./assessment.mocks";
import { IAssessment } from "src/models/IAssessment";

export function createAssessment(assessment: IAssessment) {
    return Promise.resolve(assessments.concat(assessment));
}

export function deleteAssessment(assessment: IAssessment) {
    return Promise.resolve(assessments.filter(x => x.assessmentId !== assessment.assessmentId));
}

export function loadUserAssessments(username?: string) {
    const filtered = username
        ? assessments.filter(x => x.username.toLowerCase() === username.toLowerCase())
        : assessments;
    return Promise.resolve(filtered);
}

export function loadRespondentAssessments(username?: string) {
    const filtered = username
        ? assessments.filter(x => x.respondent.toLowerCase() === username.toLowerCase())
        : assessments;
    return Promise.resolve(filtered);
}

export function findUserAssessment(assessmentId: number) {
    return assessments.find(x => x.assessmentId == assessmentId);
}