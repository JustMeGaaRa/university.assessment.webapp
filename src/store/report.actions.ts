import { reports } from "./report.mocks";
import { IAnswer } from "src/models/IAnswer";
import { IAssessment, RespondentType } from "src/models/IAssessment";
import { IReportRecord } from "src/models/IReportRecord";
import { IProfileReport } from "src/models/IProfileReport";
import { findUser } from "./user.actions";
import { loadAssessments } from "./assessment.actions";

export function findReport(username: string) {
    return reports.filter(x => x.username.toLowerCase() === username.toLowerCase());
}

/**
 * Calculates a complete profile report based on all answers left by respondents.
 * @param username A username for whom to load the assessment results.
 * @param date A date used to load only relevant assessments.
 */
export function calculateUserReport(username: string, date: Date) {
    const assessments = loadAssessments(username);
    const user = findUser(username);
    const report: IProfileReport = {
        username: user ? user.username : "",
        fullname: user ? user.fullname : "",
        description: "",
        date: new Date(Date.now()),
        summary: {
            competency: "General",
            description: "",
            general: {
                title: "Summary Overall",
                description: "",
                data: calculateAverageByCompetencyGeneralReport(assessments, username, date)
            },
            groupped: {
                title: "Avarage By Competency",
                description: "",
                data: calculateAverageByCompetencyGrouppedReport(assessments, username, date)
            }
        },
        data: []
    }
    return report;
}

type NamedGroup<T> = {
    [name: string]: T;
}

/**
 * Calculates average answer results for personal and general respondents in every competency.
 * @param assessments A collection of assessments.
 * @param username A username for whom to load the assessment results.
 * @param date A date used to load only relevant assessments.
 */
function calculateAverageByCompetencyGeneralReport(assessments: IAssessment[], username: string, date: Date) {
    const selfAssessments = assessments.filter(x => x.username === username && x.respondent === username);
    const otherAssessments = assessments.filter(x => x.username === username && x.respondent !== username);
    const selfAverageResults = calculateAverageByCompetency(selfAssessments);
    const otherAverageResults = calculateAverageByCompetency(otherAssessments);
    return otherAverageResults
        .map(x => x.name)
        .map(name => {
            const personal = selfAverageResults.find(result => result.name === name);
            const others = otherAverageResults.find(result => result.name === name);
            const record: IReportRecord = {
                name: name,
                personal: personal ? personal.result : 0,
                average: others ? others.result : 0
            };
            return record;
        });
}

/**
 * Calculate average answer results for each respondent type in every competency.
 * @param assessments A collection of assessments.
 * @param username A username for whom to load the assessment results.
 * @param date A date used to load only relevant assessments.
 */
function calculateAverageByCompetencyGrouppedReport(assessments: IAssessment[], username: string, date: Date) {
    const respondentTypes = [
        RespondentType.Self,
        RespondentType.Colleague,
        RespondentType.Supervisor,
        RespondentType.Subordinate,
        RespondentType.Client
    ];
    const competencyAnswers = groupByCompetency(assessments);
    return Object.keys(competencyAnswers)
        .map(name => {
            const record: IReportRecord = { name: name };
            
            respondentTypes.map(type => {
                const respondentAssessments = assessments.filter(x => x.username === username && x.respondentType === type);
                const respondentAverageResults = calculateAverageByCompetency(respondentAssessments);
                const respondent = respondentAverageResults.find(result => result.name === name);
                record[type] = respondent ? respondent.result : 0
            });
            
            return record;
        });
}

/**
 * Calculates an average answer results for a given collection of assessments.
 * @param assessments A collection of assessments used.
 */
function calculateAverageByCompetency(assessments: IAssessment[]) {
    const competencyAnswers = groupByCompetency(assessments);

    return Object.keys(competencyAnswers)
        .map(name => calculateAverageResult(name, competencyAnswers[name]));
}

/**
 * Groups the answers by competency name and forms a dictionary.
 * @param assessments A collection of assessments used to form a group of competencies.
 */
function groupByCompetency(assessments: IAssessment[]) {
    const emptyGroup: NamedGroup<IAnswer[]> = {};
    return assessments
        .map(assessment => assessment.answers)
        .reduce((left, right) => left.concat(right))
        .reduce((group, answer) => {
            group[answer.competency] = group[answer.competency] || [];
            group[answer.competency].push(answer);
            return group;
        }, emptyGroup);
}

/**
 * Calculates the aberage result for a given collection of answers.
 * @param name Name of the group.
 * @param answers A collection of answers.
 */
function calculateAverageResult(name: string, answers: IAnswer[]) {
    const totalPoints = answers.reduce((x, y) => x + y.result, 0);
    const averageResult = Math.round(totalPoints / answers.length);
    return {
        name: name,
        result: averageResult
    };
}