import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Segment, Header, List, Progress, Form, Divider, ButtonProps, Button, CheckboxProps } from 'semantic-ui-react';
import { findAssessment } from "../store/assessment.actions";
import { IIndicator } from "src/models/IIndicator";
import { loadProfileIndicators } from "src/store/competencies.actions";
import { IAssessment } from "src/models/IAssessment";

type AssessmentPageProps = RouteComponentProps<{ assessmentId: string }>;

interface IAssessmentPageState {
    createButtonDisabled: boolean;
}

class AssessmentPage extends React.Component<AssessmentPageProps, IAssessmentPageState> {
    constructor(props: AssessmentPageProps) {
        super(props);

        this.createQuestionItem = this.createQuestionItem.bind(this);
        this.handleOnAnswerChange = this.handleOnAnswerChange.bind(this);

        this.state = {
            createButtonDisabled: false
        };
    }

    public render() {
        const { createButtonDisabled } = this.state;
        const assessmentId = parseInt(this.props.match.params.assessmentId);
        const { assessmentProfileId, fullname } = findAssessment(assessmentId) as IAssessment;
        const questions = loadProfileIndicators(assessmentProfileId);
        const subheader = `An assessment for ${fullname} to fill.`;

        return (
            <Segment>
                <Header as='h1' content={fullname} subheader={subheader} />
                <Divider hidden />
                <Progress percent={75} progress color='blue' />
                <List>
                    {questions.map(this.createQuestionItem)}
                </List>
                <Divider hidden />
                <Button color='blue' content='Submit' disabled={createButtonDisabled} onClick={this.handleOnCreateClick} />
            </Segment>
        );
    }

    private createQuestionItem({ description }: IIndicator) {
        return (
            <List.Item>
                <Header as='h3' content={description} />
                <Divider as='br' hidden fitted />
                <Form>
                    <Form.Group inline>
                        <Form.Radio name='level' type='radio' value='0' label='Never' onChange={this.handleOnAnswerChange} />
                        <Form.Radio name='level' type='radio' value='1' label='Rarely' onChange={this.handleOnAnswerChange} />
                        <Form.Radio name='level' type='radio' value='2' label='Sometimes' onChange={this.handleOnAnswerChange} />
                        <Form.Radio name='level' type='radio' value='3' label='Often' onChange={this.handleOnAnswerChange} />
                        <Form.Radio name='level' type='radio' value='4' label='Always' onChange={this.handleOnAnswerChange} />
                    </Form.Group>
                </Form>
            </List.Item>
        );
    }
    
    private handleOnCreateClick(event: any, data: ButtonProps) {
        
    }

    private handleOnAnswerChange(event: any, data: CheckboxProps) {
        
    }
}

export default AssessmentPage;