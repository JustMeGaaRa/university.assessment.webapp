import * as React from "react";
import { Segment, Header, Divider, Form, Button, ButtonProps, InputOnChangeData, Card, Icon, CardProps } from "semantic-ui-react";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { loadProfiles } from "src/store/assessment-profile.actions";
import { loadCompetencies } from "src/store/competencies.actions";
import CompetencySegment from "./competency-segment";

interface IAssessmentProfilePageState {
    assessmentProfiles: IAssessmentProfile[];
    assessmentProfileName: string;
    selectedProfile: IAssessmentProfile[];
}

class AssessmentProfilePage extends React.Component<any, IAssessmentProfilePageState> {
    constructor(props: any) {
        super(props);

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleOnAddButton = this.handleOnAddButton.bind(this);
        this.handleOnSelectProfile = this.handleOnSelectProfile.bind(this);

        this.state = {
            assessmentProfiles: loadProfiles(),
            assessmentProfileName: "",
            selectedProfile: loadProfiles().filter(x => x.id === 1)
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
                    <Card key={profile.id} onClick={this.handleOnSelectProfile.bind(this, profile)}>
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
                            <CompetencySegment key={competency.id} competency={competency} />
                    )))}
                </Segment.Group>
            </Segment>
        );
    }

    private handleOnSelectProfile(profile: IAssessmentProfile, event: any, data: CardProps) {
        this.setState({
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
            id: 1,
            name: this.state.assessmentProfileName,
            creationDate: new Date(Date.now()),
            competencies: [...loadCompetencies()],
            questions: []
        };
        const assessmentProfiles = this.state.assessmentProfiles.concat(profile);
        this.setState({
            assessmentProfiles,
            assessmentProfileName: ""
        });
    }
}

export default AssessmentProfilePage;