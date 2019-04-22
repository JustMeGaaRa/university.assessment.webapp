import * as React from "react";
import { Segment, Header, Form, ButtonProps, DropdownProps, Divider, List, Image, Card, InputOnChangeData } from "semantic-ui-react";
import { loadProfiles, loadUsers, findUser, loadAssessments } from "../store/questionnaire.actions";
import { IAssessment } from "src/models/IAssessment";
import ProfileCard from "./profile-card";

interface IQuestionnairePageState {
    assessments: IAssessment[];
    username: string;
    profile: string;
    createButtonDisabled: boolean;
}

class QuestionnairePage extends React.Component<any, IQuestionnairePageState> {
    constructor(props: any) {
        super(props);

        this.createQuestionnaireItem = this.createQuestionnaireItem.bind(this);
        this.handleOnTargetUserChanged = this.handleOnTargetUserChanged.bind(this);
        this.handleOnTargetProfileChanged = this.handleOnTargetProfileChanged.bind(this);
        this.handleOnDateRangeChanged = this.handleOnDateRangeChanged.bind(this);
        this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
        this.handleOnClearClick = this.handleOnClearClick.bind(this);

        this.state = {
            assessments: [],
            username: "",
            profile: "",
            createButtonDisabled: false
        };
    }

    public render() {
        const header = "Questionnaire";
        const subheader = "Available assessments to pass.";
        const createButtonDisabled = this.checkIfCreateButtonIsDisabled();
        const assessments = loadAssessments();
        const users = loadUsers().map(user => {
            return {
                key: user.username,
                text: user.fullname,
                value: user.fullname
            };
        });
        const profiles = loadProfiles().map(profile => {
            return {
                key: profile.name,
                text: profile.name,
                value: profile.name
            };
        });
        const targetUserProps = {
            selection: true,
            fluid: true,
            options: users,
            label: 'Target User',
            placeholder: 'Select a target user for questionnaire'
        };
        const accessUsers = {
            selection: true,
            fluid: true,
            options: users,
            multiple: true,
            search: true,
            label: 'Users with Access',
            placeholder: 'Select users with access to a questionnaire'
        };
        const targetProfileProps = {
            selection: true,
            fluid: true,
            options: profiles,
            label: 'Target Profile',
            placeholder: 'Select a target profile for questionnaire'
        };
        const assessmentDateProps = {
            fluid: true,
            label: 'Date Range',
            type: 'date'
        };

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Dropdown {...targetUserProps} onChange={this.handleOnTargetUserChanged} />
                        <Form.Dropdown {...accessUsers} />
                        <Form.Dropdown {...targetProfileProps} onChange={this.handleOnTargetProfileChanged} />
                        <Form.Input {...assessmentDateProps} onChange={this.handleOnDateRangeChanged} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Button color='blue' content='Create' disabled={createButtonDisabled} onClick={this.handleOnCreateClick} />
                        <Form.Button color='grey' content='Clear' onClick={this.handleOnClearClick} />
                    </Form.Group>
                </Form>
                <Divider />
                <Card.Group>
                    {assessments.map(this.createAssessmentItem)}
                </Card.Group>
            </Segment>
        );
    }

    private createQuestionnaireItem(questionnaire: IAssessment) {
        const description = `Created at ${questionnaire.date.toDateString()}`;
        return (
            <List.Item>
                <Image avatar src='/images/avatar/johny.png' />
                <List.Content>
                    <List.Header as='a' content={questionnaire.fullname} />
                    <List.Description content={description} />
                </List.Content>
            </List.Item>
        );
    }

    private createAssessmentItem(result: IAssessment) {
        const assessmentUrl = `/assessments/${result.username}`;
        const profileCardProps = {
            imageUrl: result.avatarUrl,
            link: assessmentUrl,
            header: result.fullname,
            meta: result.date.toDateString(),
            description: result.description
        };
        return (
            <ProfileCard {...profileCardProps} />
        );
    }

    private handleOnTargetUserChanged(event: any, data: DropdownProps) {
        this.setState({
            username: data.text ? data.text : ""
        });
    }

    private handleOnTargetProfileChanged(event: any, data: DropdownProps) {
        this.setState({
            profile: data.text ? data.text : ""
        });
    }

    private handleOnDateRangeChanged(event: any, data: InputOnChangeData) {
        
    }

    private handleOnCreateClick(event: any, data: ButtonProps) {
        if (!this.checkIfCreateButtonIsDisabled()) {
            const user = findUser(this.state.username);
            const assessment: IAssessment = {
                username: user ? user.username : "",
                fullname: user ? user.fullname : "",
                avatarUrl: "",
                date: new Date(Date.now()),
                description: ""
            };
            const assessments = this.state.assessments.concat([assessment]);

            this.setState({
                assessments: assessments,
                createButtonDisabled: false
            });
        }
    }

    private handleOnClearClick(event: any, data: ButtonProps) {
        this.setState({
            username: "",
            profile: "",
            createButtonDisabled: false
        });
    }

    private checkIfCreateButtonIsDisabled() {
        return this.state.username === ""
            || this.state.profile === "";
    }
}

export default QuestionnairePage;