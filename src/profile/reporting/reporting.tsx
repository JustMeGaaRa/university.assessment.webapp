import * as React from "react";
import { Segment, Header } from "semantic-ui-react";

class ReportingPage extends React.Component {
    public render() {
        return (
            <Segment>
                <Header as='h1'>
                    <Header.Content>Reporting
                        <Header.Subheader>Available assessments to pass.</Header.Subheader>
                    </Header.Content>
                </Header>
            </Segment>
        );
    }
}

export default ReportingPage;