import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Segment, Rating, Header, List, Progress } from 'semantic-ui-react';

type AssessmentPageProps = RouteComponentProps<{ assessmentId: string }>;

class AssessmentPage extends React.Component<AssessmentPageProps> {
    constructor(props: AssessmentPageProps) {
        super(props);

        this.createQuestionItem = this.createQuestionItem.bind(this);
    }

    public render() {
        const { assessmentId } = this.props.match.params;
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
                <Header as='h1' content={assessmentId} />
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
                <List.Icon name='question circle outline' size='large' />
                <List.Content>
                    <List.Header>
                        <Header as='h3' content={question} />
                    </List.Header>
                    <List.Description>
                        <Rating maxRating={5} icon='star' size='large' />
                    </List.Description>
                </List.Content>
            </List.Item>
        );
    }
}

export default AssessmentPage;