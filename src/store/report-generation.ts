import { IAssessment, RespondentType } from "src/models/IAssessment";
import { IReportRecord } from "src/models/IReportRecord";
import { IReportData } from "src/models/IReportData";
import { IProfileReport } from "src/models/IProfileReport";
import { findUser } from "./user.actions";
import { loadUserAssessments } from "./assessment.actions";

type NamedGroup<T> = {
    [name: string]: T[];
}

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
function calculateReportRecord(name: string, answers: IExtendedAnswer[]) {
    return {
        name: name,
        personal: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Self)),
        supervisor: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Supervisor)),
        colleague: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Colleague)),
        subordinate: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Subordinate)),
        client: calculateAverage(answers.filter(x => x.respondentType === RespondentType.Client)),
        average: calculateAverage(answers.filter(x => x.respondentType !== RespondentType.Self)),
    } as IReportRecord;
}

/**
 * Transforms the structure of the assessment object hierarchy into on groupped by competency.
 * @param assessments A collection of assessments.
 */
function reverseAnswersHierarchy(assessments: IAssessment[]) {
    const emptyGroup: NamedGroup<IExtendedAnswer> = {};
    const group = assessments.map(assessment => (
            assessment.answers.map(answer => ({
                ...answer,
                ...assessment
            } as IExtendedAnswer))))
        .reduce((left, right) => left.concat(right), [])
        .reduce((group, answer) => {
            group[answer.competency] = group[answer.competency] || [];
            group[answer.competency].push(answer);
            return group;
        }, emptyGroup);

    const competencies: ICompetencyResult[] = Object.keys(group)
        .map(competency => {
            const emptySubgroup: NamedGroup<IExtendedAnswer> = {};
            const subgroup = group[competency]
                .reduce((subgroup, answer) => {
                    subgroup[answer.subcompetency] = subgroup[answer.subcompetency] || [];
                    subgroup[answer.subcompetency].push(answer);
                    return subgroup;
                }, emptySubgroup);

            const subcompetencies: ISubcompetencyResult[] = Object.keys(subgroup)
                .map(subcompetency => ({
                        subcompetency: subcompetency,
                        answers: subgroup[subcompetency]
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
export function calculateProfileReport(username: string, date: Date) {
    const assessments = loadUserAssessments(username);
    const competencyAnswers = reverseAnswersHierarchy(assessments);
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
                data: competencyReports.map(report => report.competencyReport)
            },
            groupped: {
                title: "Avarage By Competency",
                description: "",
                data: competencyReports.map(report => report.competencyReport)
            }
        },
        data: competencyReports
            .map(report => ({
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
            } as IReportData))
    }
    return report;
}