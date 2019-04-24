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

function fromSubcompetency({ name: competency }: ICompetency, { id, name, indicators }: ISubcompetency) {
    return {
        competency: competency,
        subcompetencyId: id,
        subcompetency: name,
        indicators: indicators
    };
}

function fromIndicator({ competency, subcompetency }: any, { id, description }: IIndicator) {
    return {
        competency: competency,
        subcompetency: subcompetency,
        indicatorId: id,
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