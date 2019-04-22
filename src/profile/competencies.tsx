import * as React from "react";
import { Segment, Input, List, Divider, Header } from "semantic-ui-react";
import { loadCompetencies } from "../store/competencies.actions";

class CompetenciesPage extends React.Component<any> {
    constructor(props: any) {
        super(props);

        this.createCompetencyItem = this.createCompetencyItem.bind(this);
        this.createSubcompetencyItem = this.createSubcompetencyItem.bind(this);
        this.createIndicatorItem = this.createIndicatorItem.bind(this);
    }

    public render() {
        const header = "Competencies";
        const subheader = "Create and manage competencies, subcompetencies and indicators.";
        const competencies = loadCompetencies();

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Input icon='pencil alternate' placeholder='Enter the name of a new competency...' />
                <Divider hidden />
                <List>
                    {competencies.map(this.createCompetencyItem)}
                </List>
            </Segment>
        );
    }

    private createCompetencyItem({ name, subcompetencies }: any) {
        return (
            <List.Item>
                <List.Icon name='folder' />
                <List.Content>
                    <List.Header>{name}</List.Header>
                    <Input icon='pencil alternate' placeholder='Enter the name of a new subcompetency...' />
                    <List.List>
                        {subcompetencies.map(this.createSubcompetencyItem)}
                    </List.List>
                </List.Content>
            </List.Item>
        );
    }

    private createSubcompetencyItem({ name, indicators }: any) {
        return (
            <List.Item>
                <List.Icon name='folder' />
                <List.Content>
                    <List.Header>{name}</List.Header>
                    <Input icon='pencil alternate' placeholder='Enter the name of a new indicator...' />
                    <List.List>
                        {indicators.map(this.createIndicatorItem)}
                    </List.List>
                </List.Content>
            </List.Item>
        );
    }

    private createIndicatorItem({ description }: any) {
        return (
            <List.Item>
                <List.Icon name='file' />
                <List.Content>{description}</List.Content>
            </List.Item>
        );
    }
}

export default CompetenciesPage;