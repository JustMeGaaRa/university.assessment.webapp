import { profiles } from "./assessment-profile.mocks";

export function loadProfiles() {
    return profiles;
}

export function findProfiles(assessmentProfileId: number) {
    return profiles.filter(x => x.id === assessmentProfileId);
}