export interface IIndicator {
    indicatorId: number;
    description: string;
    competencyId?: number;
    competencyName?: string;
    subcompetencyId: number;
    subcompetencyName?: string;
}
