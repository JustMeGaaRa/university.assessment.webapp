import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Segment, Header, List, Progress, Form, Divider } from 'semantic-ui-react';

type AssessmentPageProps = RouteComponentProps<{ assessmentId: string }>;

class AssessmentPage extends React.Component<AssessmentPageProps> {
    constructor(props: AssessmentPageProps) {
        super(props);

        this.createQuestionItem = this.createQuestionItem.bind(this);
    }

    public render() {
        const { assessmentId } = this.props.match.params;
        const subheader = `An assessment for ${assessmentId} to fill.`;
        const questions = [
            {
                number: 1,
                question: 'How good is the cadidate in teamwork?',
            },
            {
                number: 2,
                question: 'How good is the candidate in communication?',
            },
            {
                number: 3,
                question: 'How good is the candidate when working with a client?',
            },
            {
                number: 4,
                question: 'How good is the candidate in estimation?',
            },
            {
                number: 5,
                question: 'How good is the candidate with presentation?',
            }
        ];

        return (
            <Segment>
                <Header as='h1' c content={assessmentId} subheader={subheader} />
                <Progress percent={75} progress color='blue' />
                <List>
                    {questions.map(this.createQuestionItem)}
                </List>
            </Segment>
        );
    }

    private createQuestionItem({ number, question }: any) {
        return (
            <List.Item>
                <Header as='h3' content={question} />
                <Divider as='br' hidden fitted />
                <Form>
                    <Form.Group inline>
                        <Form.Radio name='level' type='radio' value='0' label='Not Applicable' />
                        <Form.Radio name='level' type='radio' value='1' label='Basic' />
                        <Form.Radio name='level' type='radio' value='2' label='Good' />
                        <Form.Radio name='level' type='radio' value='3' label='Advanced' />
                        <Form.Radio name='level' type='radio' value='4' label='Expert' />
                    </Form.Group>
                </Form>
            </List.Item>
        );
    }
}

export default AssessmentPage;