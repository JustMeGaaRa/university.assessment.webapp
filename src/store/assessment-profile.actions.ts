import { profiles } from "./assessment-profile.mocks";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";

export function createProfile(profile: IAssessmentProfile) {
    return Promise.resolve(profiles.concat(profile));
}

export function deleteProfile(profile: IAssessmentProfile) {
    return Promise.resolve(profiles.filter(x => x.profileId !== profile.profileId));
}

export function loadProfiles() {
    return Promise.resolve(profiles);
}

export function findProfiles(assessmentProfileId: number) {
    return profiles.filter(x => x.profileId === assessmentProfileId);
}