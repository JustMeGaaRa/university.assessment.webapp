import {
    IAssessmentResult,
    IReportRecord,
    IReportData,
    IAssessmentReport, 
    Result} from "src/models";
import { RespondentType } from "../models/Assessments/IAssessmentResult";
import { findUser } from "./user.actions";
import { loadAssessmentResults } from "./assessment.actions";

interface ISubcompetencyResult {
    subcompetency: string;
    answers: IExtendedAnswer[];
}

interface ICompetencyResult {
    competency: string;
    subcompetencies: ISubcompetencyResult[];
}

interface IExtendedAnswer {
    competency: string;
    subcompetency: string;
    question: string;
    result: number;
    username: string
    respondent: string
    respondentType: RespondentType;
}

interface IHierarchialReportRecord {
    competencyReport: IReportRecord;
    subcompetencyReports: IReportRecord[];
}

/**
 * Calculate average number for a collection of answers.
 * @param answers A collection of answers to calculate average for.
 */
function calculateAverage(answers: IExtendedAnswer[]) {
    const totalPoints = answers.length > 0 ? answers.reduce((x, y) => x + y.result, 0) : 0;
    const totalAnswers = answers.length > 0 ? answers.length : 1;
    const average = parseFloat((totalPoints / totalAnswers).toFixed(2));
    return average;
}

/**
 * Calculates the report record based on answers per respondent type.
 * @param name The name of the report record.
 * @param answers A collection of answers to calculate average for.
 */
function calculateReportRecord(name: string, answers: IExtendedAnswer[]): IReportRecord {
    return {
        name: name,
        personal: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Self)),
        supervisor: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Supervisor)),
        colleague: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Colleague)),
        subordinate: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Subordinate)),
        client: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Client)),
        average: calculateAverage(answers.filter(x => x.respondentType !== RespondentType.Self)),
    };
}

/**
 * Transforms the structure of the assessment object hierarchy into on groupped by competency.
 * @param assessments A collection of assessments.
 */
function reverseAnswersHierarchy(assessments: IAssessmentResult[]) {
    const group = assessments.map(assessment => (
            assessment.answers.map<IExtendedAnswer>(answer => ({
                competency: answer.competency ? answer.competency : "",
                subcompetency: answer.subcompetency ? answer.subcompetency : "",
                question: answer.question,
                result: answer.result,
                username: assessment.targetUser.username,
                respondent: assessment.respondent.username,
                respondentType: assessment.respondentType
            }))
        ))
        .reduce((left, right) => left.concat(right), [])
        .reduce((group, answer) => {
            const existing = group.get(answer.competency);
            const answers = existing ? existing.concat(answer) : [answer];
            return group.set(answer.competency, answers);
        }, new Map<string, IExtendedAnswer[]>());
    
    const competencies = Array.from(group.entries())
        .map<ICompetencyResult>(([competency, answers]) => {
            const subgroup = answers
                .reduce((subgroup, answer) => {
                    const existing = subgroup.get(answer.subcompetency);
                    const answers = existing ? existing.concat(answer) : [answer];
                    return subgroup.set(answer.subcompetency, answers);
                }, new Map<string, IExtendedAnswer[]>());

            const subcompetencies = Array.from(subgroup.entries())
                .map<ISubcompetencyResult>(([subcompetency, answers]) => ({
                    subcompetency: subcompetency,
                    answers: answers
                }));

            return {
                competency: competency,
                subcompetencies: subcompetencies
            };
        });
    
    return competencies;
}

/**
 * Calculates a complete profile report based on all answers left by respondents.
 * @param username A username for whom to load the assessment results.
 * @param date A date used to load only relevant assessments.
 */
export async function calculateProfileReport(assessmentId: number, username: string, date: Date) {
    const assessmentResponse = await loadAssessmentResults(assessmentId);
    const assessmentResults = Result.valueOrDefault(assessmentResponse, []);
    const competencyAnswers = reverseAnswersHierarchy(assessmentResults);
    const competencyReports = competencyAnswers
        .map(result => {
            const answers = result.subcompetencies
                .map(subcompetency => subcompetency.answers)
                .reduce((left, right) => left.concat(right), []);
            const competencyReport = calculateReportRecord(result.competency, answers);
            const reportGroup: IHierarchialReportRecord = {
                competencyReport: competencyReport,
                subcompetencyReports: result.subcompetencies
                    .map(subcompetency => calculateReportRecord(
                        subcompetency.subcompetency,
                        subcompetency.answers))
            };

            return reportGroup;
        });
    
    const user = findUser(username);
    const report: IAssessmentReport = {
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
                data: competencyReports.map(report => report.competencyReport)
            },
            groupped: {
                title: "Avarage By Competency",
                description: "",
                data: competencyReports.map(report => report.competencyReport)
            }
        },
        data: competencyReports
            .map<IReportData>(report => ({
                competency: report.competencyReport.name,
                description: "",
                general: {
                    title: "Average By Competency",
                    description: "Overall summary for single competency divided by type of respondent.",
                    data: [report.competencyReport]
                },
                groupped: {
                    title: "Avarage By Subcompetency",
                    description: "Summary for competency divided by subcompetencies.",
                    data: report.subcompetencyReports
                }
            }))
    }
    return report;
}