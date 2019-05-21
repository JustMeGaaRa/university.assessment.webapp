import { IAssessmentProfile } from "src/models";
import { RequestClient } from "./request-client";

const hostname = "";

export function createProfile(name: string, summary: string) {
    const profile: IAssessmentProfile = {
        name: name,
        creationDate: new Date(Date.now()),
        competencies: []
    };
    return RequestClient.post<IAssessmentProfile[]>(`${hostname}/api/assessment-profiles`, profile);
}

export function deleteProfile(profile: IAssessmentProfile) {
    return RequestClient.delete<IAssessmentProfile[]>(`${hostname}/api/assessment-profiles/${profile.id}`);
}

export function loadProfiles() {
    return RequestClient.get<IAssessmentProfile[]>(`${hostname}/api/assessment-profiles`);
}

export function findProfiles(assessmentProfileId: number) {
    return RequestClient.get<IAssessmentProfile>(`${hostname}/api/assessment-profiles/${assessmentProfileId}`);
}