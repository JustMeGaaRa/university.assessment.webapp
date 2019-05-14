import * as React from "react";
import { Segment, Header, Divider, Form, Button, ButtonProps, InputOnChangeData, Card, Icon, CardProps } from "semantic-ui-react";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { loadProfiles, createProfile } from "src/store/assessment-profile.actions";
import { loadCompetencies } from "src/store/competencies.actions";
import CompetencySegment from "./competency-segment";
import { ICompetency } from "src/models/ICompetency";

interface IAssessmentProfilePageState {
    competencies: ICompetency[];
    assessmentProfiles: IAssessmentProfile[];
    assessmentProfileName: string;
    selectedProfileId?: number;
    selectedProfile: IAssessmentProfile[];
}

class AssessmentProfilePage extends React.Component<any, IAssessmentProfilePageState> {
    constructor(props: any) {
        super(props);

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleOnAddButton = this.handleOnAddButton.bind(this);
        this.handleOnSelectProfile = this.handleOnSelectProfile.bind(this);

        this.state = {
            competencies: [],
            assessmentProfiles: [],
            assessmentProfileName: "",
            selectedProfile: []
        };
    }

    public render() {
        const header = "Assessment Profiles";
        const subheader = "Create and manage assessment profiles.";
        const addButtonDisabled = this.state.assessmentProfileName === "";
        const inputAction = <Button content='Add' disabled={addButtonDisabled} onClick={this.handleOnAddButton} />;
        const inputProps = {
            action: inputAction,
            icon: "edit outline",
            label: "Profile Name",
            placeholder: "Enter assessment profile name..."
        };

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input {...inputProps} iconPosition="left" onChange={this.handleOnInputChange} />
                    </Form.Group>
                </Form>
                <Divider hidden />
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
                            {`${profile.questions.length} Indicators`}
                        </Card.Content>
                    </Card>
                    ))}
                </Card.Group>
                <Segment.Group>
                    {this.state.selectedProfile.map(profile => 
                        profile.competencies.map(competency => (
                            <CompetencySegment key={competency.competencyId} competency={competency} />
                    )))}
                </Segment.Group>
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

    private handleOnInputChange(event: any, data: InputOnChangeData) {
        this.setState({
            assessmentProfileName: data.value
        });
    }

    private handleOnAddButton(event: any, data: ButtonProps) {
        const profile: IAssessmentProfile = {
            profileId: 1,
            name: this.state.assessmentProfileName,
            creationDate: new Date(Date.now()),
            competencies: [...this.state.competencies],
            questions: []
        };
        createProfile(profile)
            .then(values => {
                this.setState({
                    assessmentProfiles: values,
                    assessmentProfileName: ""
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