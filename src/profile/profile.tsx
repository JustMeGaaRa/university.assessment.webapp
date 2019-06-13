import * as React from 'react';
import { Card, Segment, Header, Divider, Modal, Progress, Button, ButtonProps, Form, CheckboxProps, CardProps } from 'semantic-ui-react';
import { Result, IAnswer, IAssessment } from 'src/models';
import { loadRespondentAssessments } from 'src/store/assessment.actions';
import AssessmentCard from './assessment-card';
import SegmentPlaceholder from './segment-placeholder';

interface IProfilePageState {
    isModalOpened: boolean;
    assessments: IAssessment[];
    isPreviousEnabled: boolean,
    isSubmitVisible: boolean;
    assessmentProgress: number;
    fullname: string;
    answers: IAnswer[];
    currentAnswer?: IAnswer;
}

class ProfilePage extends React.Component<{}, IProfilePageState> {
    constructor(props: any) {
        super(props);

        this.createAssessmentSection = this.createAssessmentSection.bind(this);
        this.handleOnModalOpen = this.handleOnModalOpen.bind(this);
        this.handleOnModalClose = this.handleOnModalClose.bind(this);
        this.handleOnResultsSubmit = this.handleOnResultsSubmit.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.handleOnNextClick = this.handleOnNextClick.bind(this);

        this.state = {
            isModalOpened: false,
            assessments: [],
            isPreviousEnabled: true,
            isSubmitVisible: false,
            assessmentProgress: 0,
            fullname: "",
            answers: [],
            currentAnswer: undefined
        };
    }

    public render() {
        const header = "Profile";
        const subheader = "Below you can choose any of the available assessments to pass.";
        const {
            isPreviousEnabled,
            isSubmitVisible,
            assessmentProgress,
            currentAnswer,
            fullname,
            assessments
        } = this.state;
        const placeholder = assessments.length === 0;
        const placeholderMessage = "No assigned assessments were found. Try another time.";
        const handleOnChange = this.handleOnAnswerChange.bind(this, currentAnswer);

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                {placeholder && (
                    <SegmentPlaceholder message={placeholderMessage} />
                )}
                {!placeholder && (
                    <Card.Group content={assessments.map(this.createAssessmentSection)} />
                )}
                <Modal
                    size='small'
                    closeOnEscape={false}
                    closeOnDimmerClick={false}
                    open={this.state.isModalOpened}
                >
                    <Modal.Header content={`Assessment for ${fullname}`} />
                    <Modal.Content>
                        {currentAnswer && (
                            <React.Fragment>
                                <Progress percent={assessmentProgress} progress color='blue' />
                                <Divider as='br' hidden fitted />
                                <Header as='h3' content={currentAnswer.question} />
                                <Divider as='br' hidden fitted />
                                <Form>
                                    <Form.Group inline>
                                        <Form.Radio name='level' type='radio' value={0} label='Never' onChange={handleOnChange} />
                                        <Form.Radio name='level' type='radio' value={1} label='Rarely' onChange={handleOnChange} />
                                        <Form.Radio name='level' type='radio' value={2} label='Sometimes' onChange={handleOnChange} />
                                        <Form.Radio name='level' type='radio' value={3} label='Often' onChange={handleOnChange} />
                                        <Form.Radio name='level' type='radio' value={4} label='Always' onChange={handleOnChange} />
                                    </Form.Group>
                                </Form>
                            </React.Fragment>
                        )}
                    </Modal.Content>
                    <Modal.Actions>
                        {isPreviousEnabled && <Button content="Previous" onClick={this.handlePreviousClick} />}
                        {!isSubmitVisible && <Button content="Next" onClick={this.handleOnNextClick} />}
                        {isSubmitVisible && <Button content="Submit" color="blue"  disabled={true} onClick={this.handleOnResultsSubmit} />}
                        <Button negative content="Close" onClick={this.handleOnModalClose} />
                    </Modal.Actions>
                </Modal>
            </Segment>
        );
    }

    public componentDidMount() {
        loadRespondentAssessments("matthew")
            .then(result => {
                Result.match(
                    result,
                    values => this.setState({ assessments: values }),
                    error => console.log(error)
                );
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
                description={`This is an assessment for ${assessment.targetUser.fullname}`}
                onClick={this.handleOnModalOpen}
            />
        );
    }

    private handleOnModalOpen(event: any, data: CardProps) {
        this.setState({
            isModalOpened: true
        });
    }
    
    private handleOnResultsSubmit(event: any, data: ButtonProps) {
        this.setState({
            isModalOpened: false
        });
    }

    private handleOnModalClose(event: any, data: ButtonProps) {
        this.setState({
            isModalOpened: false
        });
    }

    private handlePreviousClick(event: any, data: ButtonProps) {

    }

    private handleOnNextClick(event: any, data: ButtonProps) {

    }

    private handleOnAnswerChange(original: IAnswer, event: any, data: CheckboxProps) {
        const answerValue = data.value as number;
        const answers = this.state.answers.map(current => this.updateAnswer(original, current, answerValue));
        const answeredQuestions = answers.filter(answer => answer.result >= 0);
        const assessmentProgress = Math.ceil(answeredQuestions.length * 100 / answers.length);
        const createButtonDisabled = !answers.every(answer => answer.result >= 0);

        this.setState({
            isSubmitVisible: createButtonDisabled,
            answers,
            assessmentProgress
        });
    }

    private updateAnswer(original: IAnswer, current: IAnswer, value: number) {
        const targetValue = original.answerId === current.answerId ? value : current.result;
        return { ...current, result: targetValue };
    }
}

export default ProfilePage;