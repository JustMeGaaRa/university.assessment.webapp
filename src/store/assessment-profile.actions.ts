import { profiles } from "./assessment-profile.mocks";

export function loadProfiles() {
    return profiles;
}

export function findProfile(assessmentProfileId: number) {
    return profiles.find(x => x.id === assessmentProfileId);
}

export function loadProfileQuestions(assessmentProfileId: number) {
    const profile = findProfile(assessmentProfileId);
    return profile ? profile.questions : [];
}