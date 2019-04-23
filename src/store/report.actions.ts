import { reports } from "./report.mocks";

export function findReport(username: string) {
    return reports.find(x => x.username.toLowerCase() === username.toLowerCase());
}