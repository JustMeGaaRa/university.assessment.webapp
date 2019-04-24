import * as React from "react";
import { Segment, Header, Form, ButtonProps, DropdownProps, Divider, List, Image, Card, InputOnChangeData } from "semantic-ui-react";
import { IUser } from "src/models/IUser";
import { IAssessment } from "src/models/IAssessment";
import { IAnswer } from "src/models/IAnswer";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { loadUsers, findUser } from "src/store/user.actions";
import { loadAssessments } from "src/store/assessment.actions";
import { loadProfiles, findProfile } from "src/store/assessment-profile.actions";
import ProfileCard from "./profile-card";

interface IQuestionnairePageState {
    assessments: IAssessment[];
    users: IUser[];
    profiles: IAssessmentProfile[];
    user: IUser | undefined;
    date: string;
    assessmentProfile: IAssessmentProfile | undefined;
}

class QuestionnairePage extends React.Component<any, IQuestionnairePageState> {
    constructor(props: any) {
        super(props);

        this.createQuestionnaireItem = this.createQuestionnaireItem.bind(this);
        this.handleOnTargetUserChanged = this.handleOnTargetUserChanged.bind(this);
        this.handleOnTargetProfileChanged = this.handleOnTargetProfileChanged.bind(this);
        this.handleOnDateRangeChanged = this.handleOnDateRangeChanged.bind(this);
        this.handleOnUserSearchChanged = this.handleOnUserSearchChanged.bind(this);
        this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
        this.handleOnClearClick = this.handleOnClearClick.bind(this);

        this.state = {
            assessments: loadAssessments(),
            users: loadUsers(),
            profiles: loadProfiles(),
            user: undefined,
            assessmentProfile: undefined,
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
                key: profile.id,
                text: profile.name,
                value: profile.id
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
        const searchInputprops = {
            type: 'search',
            label: 'User Search',
            placeholder: 'Enter username to filter',
            icon: 'search'
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
                        <Form.Button content='Create' primary disabled={createButtonDisabled} onClick={this.handleOnCreateClick} />
                        <Form.Button content='Clear' onClick={this.handleOnClearClick} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input {...searchInputprops} onChange={this.handleOnUserSearchChanged} />
                    </Form.Group>
                </Form>
                <Divider hidden />
                <Card.Group>
                    {this.state.assessments.map(this.createAssessmentItem)}
                </Card.Group>
            </Segment>
        );
    }

    private createQuestionnaireItem(questionnaire: IAssessment) {
        const description = `Created at ${questionnaire.availableFromDate.toDateString()}`;
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
        const assessmentUrl = `/assessments/${result.assessmentId}`;
        return (
            <ProfileCard
                key={result.username}
                imageUrl={result.avatarUrl}
                link={assessmentUrl}
                header={result.fullname}
                meta={result.availableFromDate.toDateString()}
                description={result.description}
            />
        );
    }

    private handleOnTargetUserChanged(event: any, data: DropdownProps) {
        this.setState({
            user: findUser(data.value as string)
        });
    }

    private handleOnTargetProfileChanged(event: any, data: DropdownProps) {
        this.setState({
            assessmentProfile: findProfile(data.value as number)
        });
    }

    private handleOnDateRangeChanged(event: any, data: InputOnChangeData) {
        this.setState({
            date: data.value as string
        });
    }

    private handleOnUserSearchChanged(event: any, data: InputOnChangeData) {
        const searchPattern = (data.value as string).toLowerCase();
        const assessments = loadAssessments()
            .filter(x => x.fullname.toLowerCase().indexOf(searchPattern) >= 0);
        
        this.setState({
            assessments
        });
    }

    private handleOnCreateClick(event: any, data: ButtonProps) {
        if (!this.checkIfAssessmentIsInvalid()) {
            const user = this.state.user as IUser;
            const assessmentProfile = this.state.assessmentProfile as IAssessmentProfile;

            // TODO: copy competency and subcompetency names
            const answers: IAnswer[] = assessmentProfile.questions.map((x , index) => {
                return {
                    id: index,
                    competency: x.competency,
                    subcompetency: x.subcompetency,
                    question: x.text,
                    result: -1
                };
            });

            // TODO: don't pass an id and avatar url when posting to server
            const assessment: IAssessment = {
                assessmentId: 10,
                username: user.username,
                fullname: user.fullname,
                avatarUrl: "/images/avatar/matthew.png",
                availableFromDate: new Date(this.state.date),
                availableToDate: new Date(this.state.date),
                assessmentProfile: assessmentProfile.name,
                description: "",
                answers: answers
            };
            const assessments = this.state.assessments.concat([assessment]);

            this.setState({
                assessments: assessments
            });
        }
    }

    private handleOnClearClick(event: any, data: ButtonProps) {
        this.setState({
            user: undefined,
            assessmentProfile: undefined
        });
    }

    private checkIfAssessmentIsInvalid() {
        return this.state.user === undefined
            || this.state.assessmentProfile === undefined;
    }
}

export default QuestionnairePage;