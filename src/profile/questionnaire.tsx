import * as React from "react";
import { Segment, Header, Form, ButtonProps, DropdownProps, Divider, List, Image, Card, InputOnChangeData } from "semantic-ui-react";
import { IAssessment } from "src/models/IAssessment";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { IUser } from "src/models/IUser";
import { loadUsers, findUser } from "../store/user.actions";
import { loadAssessments } from "src/store/assessment.actions";
import { loadProfiles } from "src/store/competencies.actions";
import ProfileCard from "./profile-card";

interface IQuestionnairePageState {
    assessments: IAssessment[];
    users: IUser[];
    profiles: IAssessmentProfile[];
    username: string;
    profile: string;
    date: string;
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
            assessments: loadAssessments(),
            users: loadUsers(),
            profiles: loadProfiles(),
            username: "",
            profile: "",
            date: ""
        };
    }

    public render() {
        const header = "Questionnaire";
        const subheader = "Available assessments to pass.";
        const createButtonDisabled = this.checkIfAssessmentIsInvalid();
        const users = this.state.users.map(user => {
            return {
                key: user.username,
                text: user.fullname,
                value: user.fullname
            };
        });
        const profiles = this.state.profiles.map(profile => {
            return {
                key: profile.name,
                text: profile.name,
                value: profile.name
            };
        });
        const targetUserProps = {
            selection: true,
            fluid: true,
            search: true,
            options: users,
            label: 'Target User',
            placeholder: 'Select a target user'
        };
        const accessUsers = {
            selection: true,
            fluid: true,
            multiple: true,
            search: true,
            options: users,
            label: 'Users with Access',
            placeholder: 'Select users with access'
        };
        const targetProfileProps = {
            selection: true,
            fluid: true,
            search: true,
            options: profiles,
            label: 'Target Profile',
            placeholder: 'Select a target profile'
        };
        const assessmentDateProps = {
            fluid: true,
            label: 'Date Range',
            type: 'date'
        };

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
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
                    {this.state.assessments.map(this.createAssessmentItem)}
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
        return (
            <ProfileCard
                key={result.username}
                imageUrl={result.avatarUrl}
                link={assessmentUrl}
                header={result.fullname}
                meta={result.date.toDateString()}
                description={result.description}
            />
        );
    }

    private handleOnTargetUserChanged(event: any, data: DropdownProps) {
        this.setState({
            username: data.value as string
        });
    }

    private handleOnTargetProfileChanged(event: any, data: DropdownProps) {
        this.setState({
            profile: data.value as string
        });
    }

    private handleOnDateRangeChanged(event: any, data: InputOnChangeData) {
        this.setState({
            date: data.value as string
        });
    }

    private handleOnCreateClick(event: any, data: ButtonProps) {
        if (!this.checkIfAssessmentIsInvalid()) {
            const user = findUser(this.state.username);
            const assessment: IAssessment = {
                username: user ? user.username : "",
                fullname: user ? user.fullname : "",
                avatarUrl: "/images/avatar/matthew.png",
                date: new Date(this.state.date),
                description: ""
            };
            const assessments = this.state.assessments.concat([assessment]);

            this.setState({
                assessments: assessments
            });
        }
    }

    private handleOnClearClick(event: any, data: ButtonProps) {
        this.setState({
            username: "",
            profile: ""
        });
    }

    private checkIfAssessmentIsInvalid() {
        return this.state.username === ""
            || this.state.profile === "";
    }
}

export default QuestionnairePage;