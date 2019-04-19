import * as React from "react";
import { Segment, Input, List, Divider, Header } from "semantic-ui-react";

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
        const competencies = [
            {
                name: "Teamwork",
                subcompetencies: [
                    {
                        name: "Performance",
                        indicators: [
                            {
                                description: "Reasons about the team decisions"
                            },
                            {
                                description: "Respective towars each and every member of the team"
                            },
                            {
                                description: "Respects the rules and project goals"
                            }
                        ]
                    }
                ]
            },
            {
                name: "Client-Oriented",
                subcompetencies: [
                    {
                        name: "Matching Expectations",
                        indicators: [
                            {
                                description: "Effectively drives the client expectations"
                            },
                            {
                                description: "Informs upfront about potential risks on the project"
                            },
                            {
                                description: "Sets a high standard of service for each client"
                            }
                        ]
                    }
                ]
            }
        ];

        return (
            <Segment>
                <Header as='h1' c content={header} subheader={subheader} />
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
                    <Input icon='pencil alternate' placeholder='Enter the name of a new competency...' />
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
                    <Input icon='pencil alternate' placeholder='Enter the name of a new competency...' />
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