import * as React from "react";
import { 
    Segment,
    Divider,
    Header,
    Button,
    Form,
    ButtonProps,
    InputOnChangeData,
    Card,
    CardProps
} from "semantic-ui-react";
import { Result, ICompetency } from "src/models";
import { loadCompetencies, createCompetency } from "src/store/competencies.actions";
import CompetencySegment from "./competency-segment";
import SegmentPlaceholder from "./segment-placeholder";

interface ICompetenciesPageState {
    competencies: ICompetency[];
    competencyName: string;
    selectedCompetencyId?: string;
    selectedCompetencies: ICompetency[];
}

class CompetencyPage extends React.Component<any, ICompetenciesPageState> {
    constructor(props: any) {
        super(props);

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleOnAddButton = this.handleOnAddButton.bind(this);

        this.state = {
            competencies: [],
            competencyName: "",
            selectedCompetencies: []
        };
    }

    public render() {
        const header = "Competencies";
        const subheader = "Create and manage competencies, subcompetencies and indicators.";
        const { competencies, selectedCompetencies: selectedCompetencies } = this.state;
        const placeholder = selectedCompetencies.length === 0;
        const placeholderMessage = "No assessment profiles were found. Try creating one.";
        const addButtonDisabled = this.state.competencyName === "";
        const inputAction = (
            <Button content='Add' disabled={addButtonDisabled} onClick={this.handleOnAddButton} />
        );

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Form>
                    <Form.Input
                        action={inputAction}
                        label="Competency Name"
                        placeholder="Enter competency name..."
                        icon="edit outline"
                        iconPosition="left"
                        onChange={this.handleOnInputChange}
                    />
                </Form>
                <Divider hidden />
                <Card.Group>
                    {competencies.map(competency => (
                        <Card
                            key={competency.id}
                            color={this.getSelectedColor(competency.id)}
                            header={competency.name}
                            meta={competency.date}
                            description={competency.description}
                            onClick={this.handleOnSelectCompetency.bind(this, competency)}
                        />
                    ))}
                </Card.Group>
                <Divider hidden />
                {placeholder && (
                    <SegmentPlaceholder message={placeholderMessage} />
                )}
                {selectedCompetencies.map(competency => (
                    <CompetencySegment key={competency.id} competency={competency} />
                ))}
            </Segment>
        );
    }

    public componentDidMount() {
        loadCompetencies()
            .then(result => {
                Result.match(
                    result,
                    values => this.setCompetencies(values),
                    error => console.log(error)
                );
            });
    }

    private handleOnInputChange(event: any, data: InputOnChangeData) {
        this.setState({
            competencyName: data.value
        });
    }

    private handleOnSelectCompetency(competency: ICompetency ,event: any, data: CardProps) {
        this.setState({
            selectedCompetencyId: competency.id,
            selectedCompetencies: [competency]
        });
    }

    private handleOnAddButton(event: any, data: ButtonProps) {
        const competency: ICompetency = {
            name: this.state.competencyName,
            date: new Date(Date.now()),
            description: "",
            subcompetencies: []
        };
        createCompetency(competency)
            .then(result => {
                Result.match(
                    result,
                    values => this.setCompetencies(values),
                    error => console.log(error)
                );
            });
    }

    private setCompetencies(competencies: ICompetency[]) {
        this.setState({
            competencies: competencies,
            selectedCompetencies: competencies.length > 0 ? [competencies[0]] : []
        })
    }

    private getSelectedColor(competencyId?: string) {
        const { selectedCompetencyId } = this.state;
        return competencyId === selectedCompetencyId ? "blue" : undefined;
    }
}

export default CompetencyPage;