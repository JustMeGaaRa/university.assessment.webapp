import { reports } from "./report.mocks";

export function findReport(username: string) {
    return reports.filter(x => x.username.toLowerCase() === username.toLowerCase());
}