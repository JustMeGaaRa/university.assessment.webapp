import * as React from "react";
import {
    Segment,
    Header,
    Form,
    ButtonProps,
    DropdownProps,
    Divider,
    Card,
    InputOnChangeData,
    LabelProps,
    DropdownItemProps
} from "semantic-ui-react";
import { IUser, IAssessment, IAssessmentProfile, Result } from "src/models";
import { loadUsers } from "src/store/user.actions";
import { loadUserAssessments, createAssessment, deleteAssessment } from "src/store/assessment.actions";
import { loadProfiles } from "src/store/assessment-profile.actions";
import AssessmentCard from "./assessment-card";
import SegmentPlaceholder from "./segment-placeholder";

interface IQuestionnairePageState {
    assessments: IAssessment[];
    filteredAssessements: IAssessment[];
    assessmentProfiles: IAssessmentProfile[];
    selectedProfile: string;
    users: IUser[];
    selectedTargetUser: string;
    selectedAccessUsers: string[];
    date: string;
}

class AssessmentPage extends React.Component<any, IQuestionnairePageState> {
    constructor(props: any) {
        super(props);

        this.createAssessmentSection = this.createAssessmentSection.bind(this);
        this.handleOnAccessUsersChanged = this.handleOnAccessUsersChanged.bind(this);
        this.handleOnTargetUserChanged = this.handleOnTargetUserChanged.bind(this);
        this.handleOnTargetProfileChanged = this.handleOnTargetProfileChanged.bind(this);
        this.handleOnDateRangeChanged = this.handleOnDateRangeChanged.bind(this);
        this.handleOnUserSearchChanged = this.handleOnUserSearchChanged.bind(this);
        this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
        this.handleOnClearClick = this.handleOnClearClick.bind(this);

        this.state = {
            assessments: [],
            filteredAssessements: [],
            assessmentProfiles: [],
            selectedProfile: "",
            users: [],
            selectedTargetUser: "",
            selectedAccessUsers: [],
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
        const users = this.state.users.map<DropdownItemProps>(user => ({
            key: user.username,
            text: user.fullname,
            value: user.username
        }));
        const profiles = this.state.assessmentProfiles.map<DropdownItemProps>(profile => ({
            key: profile.id,
            text: profile.name,
            value: profile.name
        }));

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            selection
                            fluid
                            search
                            options={users}
                            label='Target User'
                            placeholder='Select a target user'
                            onChange={this.handleOnTargetUserChanged}
                        />
                        <Form.Dropdown
                            selection
                            fluid
                            multiple
                            search
                            options={users}
                            label='Users with Access'
                            placeholder='Select users with access'
                            onChange={this.handleOnAccessUsersChanged}
                        />
                        <Form.Dropdown
                            selection
                            fluid
                            search
                            options={profiles}
                            label='Target Profile'
                            placeholder='Select a target profile'
                            onChange={this.handleOnTargetProfileChanged}
                        />
                        <Form.Input
                            fluid
                            label='Date Range'
                            type='date'
                            onChange={this.handleOnDateRangeChanged}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Button content='Create' primary disabled={createButtonDisabled} onClick={this.handleOnCreateClick} />
                        <Form.Button content='Clear' onClick={this.handleOnClearClick} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            type='search'
                            icon='search'
                            label='User Search'
                            placeholder='Enter username to filter'
                            onChange={this.handleOnUserSearchChanged}
                        />
                    </Form.Group>
                </Form>
                <Divider hidden />
                {placeholder && (
                    <SegmentPlaceholder message={placeholderMessage} />
                )}
                {!placeholder && (
                    <Card.Group content={assessments.map(this.createAssessmentSection)} />
                )}
            </Segment>
        );
    }

    public componentDidMount() {
        loadProfiles()
            .then(result => {
                Result.match(
                    result,
                    values => this.setAssessmentProfiles(values),
                    error => console.log(error)
                );
            });
            
        loadUserAssessments()
            .then(result => {
                Result.match(
                    result,
                    values => this.setState({
                        assessments: values,
                        filteredAssessements: values
                    }),
                    error => console.log(error)
                );
            });

        loadUsers()
            .then(values => {
                this.setState({
                    users: values
                });
            });
    }

    private createAssessmentSection(assessment: IAssessment) {
        return (
            <AssessmentCard
                key={assessment.id}
                avatarUrl={assessment.targetUser.avatarUrl}
                fullname={assessment.targetUser.fullname}
                from={assessment.availableFromDate}
                to={assessment.availableToDate}
                description={""}
                onRemove={this.handleOnRemove.bind(this, assessment)}
            />
        );
    }

    private handleOnRemove(assessment: IAssessment, event: any, data: LabelProps) {
        deleteAssessment(assessment)
            .then(result => {
                Result.match(
                    result,
                    values => this.setState({ assessments: values }),
                    error => console.log(error)
                );
            });
    }

    private handleOnAccessUsersChanged(event: any, data: DropdownProps) {
        this.setState({

        });
    }

    private handleOnTargetUserChanged(event: any, data: DropdownProps) {
        this.setState({
            selectedTargetUser: data.value as string
        });
    }

    private handleOnTargetProfileChanged(event: any, data: DropdownProps) {
        this.setState({
            selectedProfile: data.value as string
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
            .filter(x => x.targetUser.fullname.indexOf(searchPattern) >= 0);
        
        this.setState({ assessments });
    }

    private handleOnCreateClick(event: any, data: ButtonProps) {
        if (!this.checkIfAssessmentIsInvalid()) {

            const { users, selectedAccessUsers, selectedTargetUser } = this.state;
            const accessUsers = users
                .filter(user => selectedAccessUsers.find(name => user.username === name));
            const targetUser = users
                .filter(user => user.username === selectedTargetUser);

            const assessment: IAssessment = {
                id: 0,
                targetUser: targetUser[0],
                accessUsers: accessUsers,
                availableFromDate: new Date(this.state.date),
                availableToDate: new Date(this.state.date),
                assessmentProfile: this.state.selectedProfile,
                results: []
            }
            
            createAssessment(assessment)
                .then(result => {
                    Result.match(
                        result,
                        values => this.setState({ assessments: values }),
                        error => console.log(error)
                    );
                });
        }
    }

    private handleOnClearClick(event: any, data: ButtonProps) {
        this.setState({
            selectedTargetUser: "",
            selectedProfile: ""
        });
    }

    private setAssessmentProfiles(profiles: IAssessmentProfile[]) {
        this.setState({
            assessmentProfiles: profiles,
            selectedProfile: ""
        });
    }

    private checkIfAssessmentIsInvalid() {
        return this.state.selectedTargetUser === ""
            || this.state.selectedProfile === "";
    }
}

export default AssessmentPage;