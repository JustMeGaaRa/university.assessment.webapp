import { assessments } from "./assessment.mocks";
import { IAssessment, RespondentType } from "src/models/IAssessment";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { IUser } from "src/models/IUser";
import { flatMapIndicators } from "src/models/ICompetency";
import { IAnswer } from "src/models/IAnswer";

export function createAssessment(user: IUser, dateFrom: Date, dateTo: Date, profile: IAssessmentProfile) {
    const answers = flatMapIndicators(profile.competencies)
        .map<IAnswer>((indicator , index) => ({
            answerId: index,
            competency: indicator.competencyName,
            subcompetency: indicator.subcompetencyName,
            question: indicator.description,
            result: -1
        }));
    const assessment = {
        assessmentId: 0,
        username: user.username,
        fullname: user.fullname,
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "",
        respondentType: RespondentType.Self,
        availableFromDate: dateFrom,
        availableToDate: dateTo,
        assessmentProfile: profile.name,
        description: "",
        answers: answers
    };
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
    return Promise.resolve(assessments.find(x => x.assessmentId == assessmentId));
}