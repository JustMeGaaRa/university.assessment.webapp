import * as React from "react";
import { Segment, Header, Form, ButtonProps, DropdownProps, Divider, Card, InputOnChangeData } from "semantic-ui-react";
import { IUser } from "src/models/IUser";
import { IAssessment, RespondentType } from "src/models/IAssessment";
import { IAssessmentProfile } from "src/models/IAssessmentProfile";
import { loadUsers, findUser } from "src/store/user.actions";
import { loadUserAssessments } from "src/store/assessment.actions";
import { loadProfiles, findProfiles } from "src/store/assessment-profile.actions";
import AssessmentCard from "./assessment-card";
import SegmentPlaceholder from "./segment-placeholder";

interface IQuestionnairePageState {
    assessments: IAssessment[];
    filteredAssessements: IAssessment[];
    assessmentProfiles: IAssessmentProfile[];
    selectedProfiles: IAssessmentProfile[];
    users: IUser[];
    selectedUser: IUser | undefined;
    date: string;
}

class QuestionnairePage extends React.Component<any, IQuestionnairePageState> {
    constructor(props: any) {
        super(props);

        this.handleOnTargetUserChanged = this.handleOnTargetUserChanged.bind(this);
        this.handleOnTargetProfileChanged = this.handleOnTargetProfileChanged.bind(this);
        this.handleOnDateRangeChanged = this.handleOnDateRangeChanged.bind(this);
        this.handleOnUserSearchChanged = this.handleOnUserSearchChanged.bind(this);
        this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
        this.handleOnClearClick = this.handleOnClearClick.bind(this);

        this.state = {
            assessments: loadUserAssessments(),
            filteredAssessements: loadUserAssessments(),
            assessmentProfiles: loadProfiles(),
            selectedProfiles: [],
            users: loadUsers(),
            selectedUser: undefined,
            date: ""
        };
    }

    public render() {
        const header = "Assessments";
        const subheader = "Here you can create new assessments and assign employees to it.";
        const { assessments, filteredAssessements } = this.state;
        const placeholder = filteredAssessements.length === 0;
        const placeholderMessage = "No new assessments were created. Try creating one.";
        const createButtonDisabled = this.checkIfAssessmentIsInvalid();
        const users = this.state.users.map(user => ({
            key: user.username,
            text: user.fullname,
            value: user.fullname
        }));
        const profiles = this.state.assessmentProfiles.map(profile => ({
            key: profile.profileId,
            text: profile.name,
            value: profile.profileId
        }));
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
                {placeholder && <SegmentPlaceholder message={placeholderMessage} />}
                {!placeholder && <Card.Group content={assessments.map(this.createAssessmentSection)} />}
            </Segment>
        );
    }

    private createAssessmentSection(assessment: IAssessment) {
        const assessmentUrl = `/assessments/${assessment.assessmentId}`;
        return (
            <AssessmentCard key={assessment.assessmentId} link={assessmentUrl} assessment={assessment} />
        );
    }

    private handleOnTargetUserChanged(event: any, data: DropdownProps) {
        this.setState({
            selectedUser: findUser(data.value as string)
        });
    }

    private handleOnTargetProfileChanged(event: any, data: DropdownProps) {
        this.setState({
            selectedProfiles: findProfiles(data.value as number)
        });
    }

    private handleOnDateRangeChanged(event: any, data: InputOnChangeData) {
        this.setState({
            date: data.value as string
        });
    }

    private handleOnUserSearchChanged(event: any, data: InputOnChangeData) {
        const searchPattern = (data.value as string).toLowerCase();
        const assessments = this.state.filteredAssessements
            .filter(x => x.fullname.toLowerCase().indexOf(searchPattern) >= 0);
        
        this.setState({
            assessments
        });
    }

    private handleOnCreateClick(event: any, data: ButtonProps) {
        if (!this.checkIfAssessmentIsInvalid()) {
            const user = this.state.selectedUser as IUser;

            // TODO: don't pass an id and avatar url when posting to server
            const assessments = this.state.selectedProfiles.map(profile => {
                const answers = profile.questions.map((x , index) => {
                    return {
                        answerId: index,
                        competency: x.competency,
                        subcompetency: x.subcompetency,
                        question: x.text,
                        result: -1
                    };
                });
                return {
                    assessmentId: 0,
                    username: user.username,
                    fullname: user.fullname,
                    avatarUrl: "/images/avatar/matthew.png",
                    respondent: "",
                    respondentType: RespondentType.Self,
                    availableFromDate: new Date(this.state.date),
                    availableToDate: new Date(this.state.date),
                    assessmentProfile: profile.name,
                    description: "",
                    answers: answers
                };
            });

            this.setState({
                assessments: this.state.assessments.concat(assessments)
            });
        }
    }

    private handleOnClearClick(event: any, data: ButtonProps) {
        this.setState({
            selectedUser: undefined,
            selectedProfiles: []
        });
    }

    private checkIfAssessmentIsInvalid() {
        return this.state.selectedUser === undefined
            || this.state.selectedProfiles === [];
    }
}

export default QuestionnairePage;