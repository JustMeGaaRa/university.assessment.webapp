import * as React from "react";
import { Segment, Header, Form } from "semantic-ui-react";

class QuestionnairePage extends React.Component {
    public render() {
        const header = "Questionnaire";
        const subheader = "Available assessments to pass.";
        const options = [
            {
                key: 'matthew',
                text: 'Matthew',
                value: 'Matthew'
            },
            {
                key: 'rachel',
                text: 'Rachel',
                value: 'Rachel'
            },
            {
                key: 'molly',
                text: 'Molly',
                value: 'Molly'
            },
            {
                key: 'steve',
                text: 'Steve',
                value: 'Steve'
            }
        ];
        
        return (
            <Segment>
                <Header as='h1' c content={header} subheader={subheader} />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Select label='Target User' fluid options={options} />
                        <Form.Dropdown label='Users with Access' fluid multiple search selection options={options} placeholder='Users with access' />
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
}

export default QuestionnairePage;