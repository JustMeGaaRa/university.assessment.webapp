import { IAnswer } from "src/models/IAnswer";
import { IAssessment, RespondentType } from "src/models/IAssessment";

export const answers: IAnswer[] = [
    {
        answerId: 1,
        competency: "Teamwork",
        subcompetency: "Performance working with team",
        question: "Reasons about the team decisions",
        result: -1
    },
    {
        answerId: 2,
        competency: "Teamwork",
        subcompetency: "Performance working with team",
        question: "Respective towars each and every member of the team",
        result: -1
    },
    {
        answerId: 3,
        competency: "Teamwork",
        subcompetency: "Performance working with team",
        question: "Respects the rules and project goals",
        result: -1
    },
];

export const assessments: IAssessment[] = [
    {
        assessmentId: 1,
        username: "matthew",
        fullname: "Matthew",
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "johny",
        respondentType: RespondentType.Colleague,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        description: "This assessment should be passed due deadline.",
        assessmentProfile: "Senior Software Enginner",
        answers: answers
    },
    {
        assessmentId: 2,
        username: "rachel",
        fullname: "Rachel",
        avatarUrl: "/images/avatar/rachel.png",
        respondent: "johny",
        respondentType: RespondentType.Colleague,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: "Senior Software Enginner",
        description: "This assessment should be passed due deadline.",
        answers: answers
    },
    {
        assessmentId: 3,
        username: "molly",
        fullname: "Molly",
        avatarUrl: "/images/avatar/molly.png",
        respondent: "johny",
        respondentType: RespondentType.Colleague,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: "Senior Software Enginner",
        description: "This assessment should be passed due deadline.",
        answers: answers
    },
    {
        assessmentId: 4,
        username: "steve",
        fullname: "Steve",
        avatarUrl: "/images/avatar/steve.jpg",
        respondent: "johny",
        respondentType: RespondentType.Colleague,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: "Senior Software Enginner",
        description: "This assessment should be passed due deadline.",
        answers: answers
    }
];