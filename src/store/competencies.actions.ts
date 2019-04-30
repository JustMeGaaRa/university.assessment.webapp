import { competencies } from "./competencies.mocks";
import { ICompetency } from "src/models/ICompetency";
import { ISubcompetency } from "src/models/ISubcompetency";
import { IIndicator } from "src/models/IIndicator";

export function loadCompetencies() {
    return competencies;
}

export function transformToQuestions() {
    return competencies
        .map(competency => competency.subcompetencies
            .map(subcompetency => fromSubcompetency(competency, subcompetency)))
        .reduce((x, y) => x.concat(y), [])
        .map(subcompetency => subcompetency.indicators
            .map(indicator => fromIndicator(subcompetency, indicator)))
        .reduce((x, y) => x.concat(y), [])
        .map(toQuestion);
}

function fromSubcompetency({ name: competency }: ICompetency, { subcompetencyId, name, indicators }: ISubcompetency) {
    return {
        competency: competency,
        subcompetencyId: subcompetencyId,
        subcompetency: name,
        indicators: indicators
    };
}

function fromIndicator({ competency, subcompetency }: any, { indicatorId, description }: IIndicator) {
    return {
        competency: competency,
        subcompetency: subcompetency,
        indicatorId: indicatorId,
        indicator: description
    };
}

function toQuestion({ indicatorId, competency, subcompetency, indicator }: any) {
    return {
        id: indicatorId,
        competency: competency,
        subcompetency: subcompetency,
        text: indicator
    };
}