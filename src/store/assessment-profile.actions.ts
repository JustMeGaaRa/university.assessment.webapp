import { IAssessmentProfile } from "src/models";
import { RequestClient } from "./request-client";

export function createProfile(name: string, summary: string) {
    const profile: IAssessmentProfile = {
        name: name,
        creationDate: new Date(Date.now()).toDateString(),
        competencies: []
    };
    return RequestClient.post<IAssessmentProfile[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessment-profiles`, profile);
}

export function loadProfiles() {
    return RequestClient.get<IAssessmentProfile[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessment-profiles`);
}

export function updateProfile(profile: IAssessmentProfile) {
    return RequestClient.put<IAssessmentProfile[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessment-profiles/${profile.id}`, profile);
}

export function deleteProfile(profile: IAssessmentProfile) {
    return RequestClient.delete<IAssessmentProfile[]>(`${process.env.REACT_APP_SERVER_API_URL}/api/assessment-profiles/${profile.id}`);
}