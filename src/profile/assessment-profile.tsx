import * as React from "react";
import { Segment, Header, Divider, Form, Button, ButtonProps, InputOnChangeData, Card, Icon, CardProps } from "semantic-ui-react";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { loadProfiles } from "src/store/assessment-profile.actions";
import { loadCompetencies } from "src/store/competencies.actions";
import { IQuestion } from "src/models/IQuestion";
import CompetencySegment from "./competency-item";

interface IAssessmentProfilePageState {
    assessmentProfiles: IAssessmentProfile[];
    assessmentProfileName: string;
    questions: IQuestion[];
}

class AssessmentProfilePage extends React.Component<any, IAssessmentProfilePageState> {
    constructor(props: any) {
        super(props);

        this.createAssessmentProfileItem = this.createAssessmentProfileItem.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleOnAddButton = this.handleOnAddButton.bind(this);
        this.handleOnSelectProfile = this.handleOnSelectProfile.bind(this);

        this.state = {
            assessmentProfiles: loadProfiles(),
            assessmentProfileName: "",
            questions: []
        };
    }

    public render() {
        const header = "Assessment Profiles";
        const subheader = "Create and manage assessment profiles.";
        const competencies = loadCompetencies();
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
                    {this.state.assessmentProfiles.map(this.createAssessmentProfileItem)}
                </Card.Group>
                <Segment.Group>
                    {competencies.map(competency => (
                    <CompetencySegment competency={competency} />
                    ))}
                </Segment.Group>
            </Segment>
        );
    }

    private createAssessmentProfileItem(profile: IAssessmentProfile) {
        const meta = new Date(Date.now()).toDateString();
        const description = `This is an assessment profile for ${profile.name}.`;
        return (
            <Card onClick={this.handleOnSelectProfile}>
                <Card.Content header={profile.name} meta={meta} description={description} />
                <Card.Content extra>
                    <Icon name="circle" />
                    {`${profile.questions.length} Indicators`}
                </Card.Content>
            </Card>
        );
    }

    private handleOnSelectProfile(event: any, data: CardProps) {
        
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
            questions: this.state.questions
        };
        const assessmentProfiles = this.state.assessmentProfiles.concat(profile);
        this.setState({
            assessmentProfiles,
            assessmentProfileName: "",
            questions: []
        });
    }
}

export default AssessmentProfilePage;