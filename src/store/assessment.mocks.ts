import { IAnswer } from "src/models/IAnswer";
import { IAssessment, RespondentType } from "src/models/IAssessment";

const teamworkCompetency = "Teamwork";
const communicationCompetency = "Communication";
const claritySubcompetency = "Clearity in commuication";
const performanceSubcompetency = "Performance working with team";
const assessmentDescription = "This assessment should be passed due deadline.";
const assessmentProfileName = "Senior Software Enginner";

export const answers1: IAnswer[] = [
    {
        answerId: 1,
        competency: teamworkCompetency,
        subcompetency: performanceSubcompetency,
        question: "Reasons about the team decisions",
        result: 5
    },
    {
        answerId: 2,
        competency: teamworkCompetency,
        subcompetency: performanceSubcompetency,
        question: "Respective towars each and every member of the team",
        result: 5
    },
    {
        answerId: 3,
        competency: teamworkCompetency,
        subcompetency: performanceSubcompetency,
        question: "Respects the rules and project goals",
        result: 5
    },
    {
        answerId: 4,
        competency: communicationCompetency,
        subcompetency: claritySubcompetency,
        question: "Checks the corectness of the arguments",
        result: 5
    },
    {
        answerId: 5,
        competency: communicationCompetency,
        subcompetency: claritySubcompetency,
        question: "Is not influenced by the emotions of the opponent",
        result: 5
    },
    {
        answerId: 6,
        competency: communicationCompetency,
        subcompetency: claritySubcompetency,
        question: "Provides arguments in discusion",
        result: 5
    }
];

export const answers2: IAnswer[] = [
    {
        answerId: 1,
        competency: teamworkCompetency,
        subcompetency: performanceSubcompetency,
        question: "Reasons about the team decisions",
        result: 4
    },
    {
        answerId: 2,
        competency: teamworkCompetency,
        subcompetency: performanceSubcompetency,
        question: "Respective towars each and every member of the team",
        result: 4
    },
    {
        answerId: 3,
        competency: teamworkCompetency,
        subcompetency: performanceSubcompetency,
        question: "Respects the rules and project goals",
        result: 4
    },
    {
        answerId: 4,
        competency: communicationCompetency,
        subcompetency: claritySubcompetency,
        question: "Checks the corectness of the arguments",
        result: 4
    },
    {
        answerId: 5,
        competency: communicationCompetency,
        subcompetency: claritySubcompetency,
        question: "Is not influenced by the emotions of the opponent",
        result: 4
    },
    {
        answerId: 6,
        competency: communicationCompetency,
        subcompetency: claritySubcompetency,
        question: "Provides arguments in discusion",
        result: 4
    }
];

export const assessments: IAssessment[] = [
    {
        assessmentId: 1,
        username: "matthew",
        fullname: "Matthew",
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "matthew",
        respondentType: RespondentType.Self,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        description: assessmentDescription,
        assessmentProfile: assessmentProfileName,
        answers: answers1
    },
    {
        assessmentId: 2,
        username: "matthew",
        fullname: "Matthew",
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "molly",
        respondentType: RespondentType.Colleague,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: assessmentProfileName,
        description: assessmentDescription,
        answers: answers1
    },
    {
        assessmentId: 3,
        username: "matthew",
        fullname: "Matthew",
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "rachel",
        respondentType: RespondentType.Colleague,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: assessmentProfileName,
        description: assessmentDescription,
        answers: answers2
    },
    {
        assessmentId: 4,
        username: "matthew",
        fullname: "Matthew",
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "steve",
        respondentType: RespondentType.Supervisor,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: assessmentProfileName,
        description: assessmentDescription,
        answers: answers1
    },
    {
        assessmentId: 4,
        username: "matthew",
        fullname: "Matthew",
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "john",
        respondentType: RespondentType.Subordinate,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: assessmentProfileName,
        description: assessmentDescription,
        answers: answers1
    },
    {
        assessmentId: 4,
        username: "matthew",
        fullname: "Matthew",
        avatarUrl: "/images/avatar/matthew.png",
        respondent: "steve",
        respondentType: RespondentType.Client,
        availableFromDate: new Date(2019, 4, 1),
        availableToDate: new Date(2019, 5, 1),
        assessmentProfile: assessmentProfileName,
        description: assessmentDescription,
        answers: answers1
    }
];