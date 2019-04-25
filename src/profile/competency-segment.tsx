import * as React from "react";
import { Segment, Header, Label, Form, InputOnChangeData, Button, ButtonProps, LabelProps } from "semantic-ui-react";
import { ICompetency } from "src/models/ICompetency";
import { ISubcompetency } from "src/models/ISubcompetency";
import { IIndicator } from "src/models/IIndicator";

interface ICompetencySegmentProps {
    competency: ICompetency;
}

interface ICompetencySegmentState {
    subcompetency: string;
    competency: ICompetency;
    indicatorNames: { [key: string]: string };
}

class CompetencySegment extends React.Component<ICompetencySegmentProps, ICompetencySegmentState> {
    constructor(props: ICompetencySegmentProps) {
        super(props);

        this.handleOnSubcompetencyInputChange = this.handleOnSubcompetencyInputChange.bind(this);
        this.handleOnIndicatorInputChange = this.handleOnIndicatorInputChange.bind(this);
        this.handleOnAddSubcompetencyButton = this.handleOnAddSubcompetencyButton.bind(this);
        this.handleOnAddIndicatorButton = this.handleOnAddIndicatorButton.bind(this);

        this.state = {
            subcompetency: "",
            competency: props.competency,
            indicatorNames: { }
        };
    }

    public render() {
        const { competency } = this.state;
        const subcompetencyAction = (
            <Button
                content='Add'
                disabled={this.state.subcompetency === ""}
                onClick={this.handleOnAddSubcompetencyButton.bind(this)}
            />
        );
        const inputAction = (subcompetency: ISubcompetency) => (
            <Button
                content='Add'
                disabled={this.state.indicatorNames[subcompetency.name] === ""}
                onClick={this.handleOnAddIndicatorButton.bind(this, subcompetency)}
            />
        );
        
        return (
            <Segment>
                <Header as='h2' content={competency.name} subheader={competency.description} />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            action={subcompetencyAction}
                            icon='edit outline'
                            label='Subcompetency Name'
                            placeholder='Enter subcompetency name...'
                            iconPosition='left'
                            onChange={this.handleOnSubcompetencyInputChange.bind(this)}
                        />
                    </Form.Group>
                </Form>
                {competency.subcompetencies.map(subcompetency => (
                    <React.Fragment>
                        <Header content={subcompetency.name} />
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    action={inputAction(subcompetency)}
                                    icon='edit outline'
                                    label='Indicator Name'
                                    placeholder='Enter indicator name...'
                                    iconPosition='left'
                                    onChange={this.handleOnIndicatorInputChange.bind(this, subcompetency)}
                                />
                            </Form.Group>
                        </Form>
                        <Label.Group>
                            {subcompetency.indicators.map(indicator => (
                                <Label
                                    content={indicator.description}
                                    removeIcon='delete'
                                    onRemove={this.handleOnLabelRemove.bind(this, subcompetency)}
                                />
                            ))}
                        </Label.Group>
                    </React.Fragment>
                ))}
            </Segment>
        );
    }

    private handleOnSubcompetencyInputChange(event: any, data: InputOnChangeData) {
        this.setState({
            subcompetency: data.value as string
        });
    }

    private handleOnIndicatorInputChange(subcompetency: ISubcompetency, event: any, data: InputOnChangeData) {
        this.state.indicatorNames[subcompetency.name] = data.value;
        this.setState({
            indicatorNames: this.state.indicatorNames
        });
    }

    private handleOnAddSubcompetencyButton(event: any, data: ButtonProps) {
        const subcompetency: ISubcompetency = {
            id: 0,
            competencyId: this.state.competency.id,
            name: this.state.subcompetency,
            indicators: []
        };
        const competency: ICompetency = {
            ...this.state.competency,
            subcompetencies: this.state.competency.subcompetencies.concat(subcompetency)
        };
        this.setState({
            competency: competency,
            subcompetency: "",
            indicatorNames: this.state.indicatorNames,
        });
    }
    
    private handleOnAddIndicatorButton(subcompetency: ISubcompetency, event: any, data: ButtonProps) {
        const indicatorName = this.state.indicatorNames[subcompetency.name];
        const indicator: IIndicator = {
            id: 0,
            subcompetencyId: subcompetency.id,
            description: indicatorName,
        };
        subcompetency.indicators = subcompetency.indicators.concat(indicator);
        this.setState({
            indicatorNames: this.state.indicatorNames
        });
    }

    private handleOnLabelRemove(subcompetency: ISubcompetency, event: any, data: LabelProps) {
        subcompetency.indicators = subcompetency.indicators.filter(x => x.description !== data.content);
        this.setState({
            indicatorNames: this.state.indicatorNames
        });
    }
}

export default CompetencySegment;