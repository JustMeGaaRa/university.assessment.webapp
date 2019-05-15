import * as React from "react";
import { Segment, Header, Divider, Form, Button, ButtonProps, InputOnChangeData, Card, Icon, CardProps } from "semantic-ui-react";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { ICompetency } from "src/models/ICompetency";
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
                                key={profile.profileId}
                                color={this.getSelectedColor(profile.profileId)}
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
                                <CompetencySegment key={competency.competencyId} competency={competency} />
                        )))}
                    </Segment.Group>
                )}
            </Segment>
        );
    }

    public componentDidMount() {
        loadCompetencies()
            .then(values => {
                this.setState({
                    competencies: values
                });
            });

        loadProfiles()
            .then(values => {
                this.setState({
                    assessmentProfiles: values,
                    selectedProfile: values.filter(x => x.profileId === 1)
                });
            });
    }

    private handleOnSelectProfile(profile: IAssessmentProfile, event: any, data: CardProps) {
        this.setState({
            selectedProfileId: profile.profileId,
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
            .then(values => {
                this.setState({
                    assessmentProfiles: values,
                    assessmentProfileName: "",
                    assessmentProfileSummary: ""
                });
            });
    }

    private getSelectedColor(profileId: number) {
        return profileId === this.state.selectedProfileId
            ? "blue"
            : undefined;
    }
}

export default AssessmentProfilePage;