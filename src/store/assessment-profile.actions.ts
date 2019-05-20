import { IAssessmentProfile } from "src/models";
import { RequestClient } from "./request-client";

export function createProfile(name: string, summary: string) {
    const profile: IAssessmentProfile = {
        profileId: 1,
        name: name,
        creationDate: new Date(Date.now()),
        competencies: []
    };
    return RequestClient.post<IAssessmentProfile[]>("api/assessment-profiles", profile);
}

export function deleteProfile(profile: IAssessmentProfile) {
    return RequestClient.delete<IAssessmentProfile[]>(`api/assessment-profiles/${profile.profileId}`);
}

export function loadProfiles() {
    return RequestClient.get<IAssessmentProfile[]>("api/assessment-profiles");
}

export function findProfiles(assessmentProfileId: number) {
    return RequestClient.get<IAssessmentProfile>(`api/assessment-profiles/${assessmentProfileId}`);
}