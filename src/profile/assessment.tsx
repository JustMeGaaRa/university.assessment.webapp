import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Segment, Header, List, Progress, Form, Divider, ButtonProps, Button, CheckboxProps } from 'semantic-ui-react';
import { IAnswer } from "src/models/IAnswer";
import { findUserAssessment } from "../store/assessment.actions";

type AssessmentPageProps = RouteComponentProps<{ assessmentId: string }>;

interface IAssessmentPageState {
    createButtonDisabled: boolean;
    assessmentProgress: number;
    fullname: string;
    answers: IAnswer[];
}

class AssessmentPage extends React.Component<AssessmentPageProps, IAssessmentPageState> {
    constructor(props: AssessmentPageProps) {
        super(props);

        this.createQuestionItem = this.createQuestionItem.bind(this);

        this.state = {
            createButtonDisabled: true,
            assessmentProgress: 0,
            fullname: "",
            answers: []
        };
    }

    public render() {
        const { createButtonDisabled, assessmentProgress, answers, fullname } = this.state;
        const subheader = `An assessment for ${fullname} to fill.`;

        return (
            <Segment>
                <Header as='h1' content={fullname} subheader={subheader} />
                <Divider hidden />
                <Progress percent={assessmentProgress} progress color='blue' />
                <List>
                    {answers.map(this.createQuestionItem)}
                </List>
                <Divider hidden />
                <Button color='blue' content='Submit' disabled={createButtonDisabled} onClick={this.handleOnCreateClick} />
            </Segment>
        );
    }

    public componentDidMount() {
        const assessmentId = parseInt(this.props.match.params.assessmentId);
        findUserAssessment(assessmentId)
            .then(value => {
                if (value) {
                    this.setState({
                        fullname: value.fullname,
                        answers: value.answers
                    });
                }
            });
    }

    private createQuestionItem(answer: IAnswer) {
        const handleOnChange = this.handleOnAnswerChange.bind(this, answer);
        return (
            <List.Item key={answer.answerId}>
                <Header as='h3' content={answer.question} />
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
            </List.Item>
        );
    }
    
    private handleOnCreateClick(event: any, data: ButtonProps) {
        
    }

    private handleOnAnswerChange(original: IAnswer, event: any, data: CheckboxProps) {
        const answerValue = data.value as number;
        const answers = this.state.answers.map(current => this.updateAnswer(original, current, answerValue));
        const answeredQuestions = answers.filter(answer => answer.result >= 0);
        const assessmentProgress = Math.ceil(answeredQuestions.length * 100 / answers.length);
        const createButtonDisabled = !answers.every(answer => answer.result >= 0);

        this.setState({
            createButtonDisabled,
            answers,
            assessmentProgress
        });
    }

    private updateAnswer(original: IAnswer, current: IAnswer, value: number) {
        const targetValue = original.answerId === current.answerId ? value : current.result;
        return { ...current, result: targetValue };
    }
}

export default AssessmentPage;