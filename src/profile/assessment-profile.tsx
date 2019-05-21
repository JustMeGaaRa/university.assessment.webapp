import * as React from "react";
import { 
    Segment,
    Header,
    Divider,
    Form,
    Button,
    ButtonProps,
    InputOnChangeData,
    Card,
    Icon,
    CardProps
} from "semantic-ui-react";
import { Result, ICompetency, IAssessmentProfile } from "src/models";
import { loadProfiles, createProfile } from "src/store/assessment-profile.actions";
import { loadCompetencies } from "src/store/competencies.actions";
import CompetencySegment from "./competency-segment";
import SegmentPlaceholder from "./segment-placeholder";

interface IAssessmentProfilePageState {
    competencies: ICompetency[];
    assessmentProfiles: IAssessmentProfile[];
    assessmentProfileName: string;
    assessmentProfileSummary: string;
    selectedProfileId?: number;
    selectedProfile: IAssessmentProfile[];
}

class AssessmentProfilePage extends React.Component<any, IAssessmentProfilePageState> {
    constructor(props: any) {
        super(props);

        this.handleOnNameChange = this.handleOnNameChange.bind(this);
        this.handleOnSummaryChange = this.handleOnSummaryChange.bind(this);
        this.handleOnAddButton = this.handleOnAddButton.bind(this);
        this.handleOnSelectProfile = this.handleOnSelectProfile.bind(this);

        this.state = {
            competencies: [],
            assessmentProfiles: [],
            assessmentProfileName: "",
            assessmentProfileSummary: "",
            selectedProfile: []
        };
    }

    public render() {
        const header = "Assessment Profiles";
        const subheader = "Create and manage assessment profiles.";
        const { assessmentProfiles, assessmentProfileName, assessmentProfileSummary } = this.state;
        const placeholder = assessmentProfiles.length === 0;
        const placeholderMessage = "No assessment profiles were found. Try creating one.";
        const addButtonDisabled = assessmentProfileName === "" || assessmentProfileSummary === "";
        const inputAction = <Button content='Add' disabled={addButtonDisabled} onClick={this.handleOnAddButton} />;

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            icon="edit outline"
                            iconPosition="left"
                            label="Profile Name"
                            placeholder="Enter assessment profile name..."
                            onChange={this.handleOnNameChange}
                        />
                        <Form.Input
                            action={inputAction}
                            icon="edit outline"
                            iconPosition="left"
                            label="Profile Summary"
                            placeholder="Enter assessment profile description..."
                            onChange={this.handleOnSummaryChange}
                        />
                    </Form.Group>
                </Form>
                <Divider hidden />
                {placeholder && (
                    <SegmentPlaceholder message={placeholderMessage} />
                )}
                {!placeholder && (
                    <Card.Group>
                        {this.state.assessmentProfiles.map(profile => (
                            <Card
                                key={profile.id}
                                color={this.getSelectedColor(profile.id)}
                                onClick={this.handleOnSelectProfile.bind(this, profile)}>
                                <Card.Content
                                    header={profile.name}
                                    meta={profile.creationDate.toDateString()}
                                    description={`This is an assessment profile for ${profile.name}.`}
                                />
                                <Card.Content extra>
                                    <Icon name="circle" />
                                    {`${profile.competencies.length} Competencies`}
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                )}
                {!placeholder && (
                    <Segment.Group>
                        {this.state.selectedProfile.map(profile => 
                            profile.competencies.map(competency => (
                                <CompetencySegment key={competency.id} competency={competency} />
                        )))}
                    </Segment.Group>
                )}
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

        loadProfiles()
            .then(result => {
                Result.match(
                    result,
                    value => this.setAssessmentProfiles(value),
                    error => console.log(error)
                );
            });
    }

    private handleOnSelectProfile(profile: IAssessmentProfile, event: any, data: CardProps) {
        this.setState({
            selectedProfileId: profile.id,
            selectedProfile: [profile]
        });
    }

    private handleOnNameChange(event: any, data: InputOnChangeData) {
        this.setState({
            assessmentProfileName: data.value
        });
    }

    private handleOnSummaryChange(event: any, data: InputOnChangeData) {
        this.setState({
            assessmentProfileSummary: data.value
        });
    }

    private handleOnAddButton(event: any, data: ButtonProps) {
        const { assessmentProfileName, assessmentProfileSummary } = this.state;
        createProfile(assessmentProfileName, assessmentProfileSummary)
            .then(result => {
                Result.match(
                    result,
                    values => this.setAssessmentProfiles(values),
                    error => console.log(error)
                );
            });
    }

    private setCompetencies(competencies: ICompetency[]) {
        this.setState({
            competencies: competencies
        });
    }

    private setAssessmentProfiles(profiles: IAssessmentProfile[]) {
        this.setState({
            assessmentProfiles: profiles,
            selectedProfile: profiles.length > 0 ? [profiles[0]] : [],
            assessmentProfileName: "",
            assessmentProfileSummary: ""
        });
    }

    private getSelectedColor(profileId?: number) {
        const { selectedProfileId } = this.state;
        return profileId === selectedProfileId ? "blue" : undefined;
    }
}

export default AssessmentProfilePage;