import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { loadCompetencies } from "./competencies.actions";

const profiles: IAssessmentProfile[] = [];

export async function createProfile(name: string, summary: string) {
    const competencies = await loadCompetencies();
    const profile: IAssessmentProfile = {
        profileId: 1,
        name: name,
        creationDate: new Date(Date.now()),
        competencies: [...competencies]
    };
    return Promise.resolve(profiles.concat(profile));
}

export function deleteProfile(profile: IAssessmentProfile) {
    return Promise.resolve(profiles.filter(x => x.profileId !== profile.profileId));
}

export function loadProfiles() {
    return Promise.resolve(profiles);
}

export function findProfiles(assessmentProfileId: number) {
    return Promise.resolve(profiles.filter(x => x.profileId === assessmentProfileId));
}