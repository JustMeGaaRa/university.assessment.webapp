import * as React from "react";
import { Segment, Header, Form } from "semantic-ui-react";
import { loadUsers } from "../store/questionnaire.actions";

class ReportingPage extends React.Component {
    public render() {
        const header = "Reporting";
        const subheader = "Reports per user filtered by date.";
        const users = loadUsers().map(user => {
            return {
                key: user.username,
                text: user.fullname,
                value: user.fullname
            };
        });

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Target User' options={users} />
                        <Form.Input fluid label='Target Date' type='date' options={[]} />
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
}

export default ReportingPage;