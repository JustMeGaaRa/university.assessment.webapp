import * as React from 'react';
import { Card, Segment, Header, Divider } from 'semantic-ui-react';
import { IAssessment } from 'src/models/IAssessment';
import { loadAssessments } from 'src/store/assessment.actions';
import ProfileCard from './profile-card';

class ProfilePage extends React.Component {
    public render() {
        const header = "Profile";
        const subheader = "Available assessments to pass.";
        // TODO: replace stub username with real identity username
        const assessments = loadAssessments("");

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Card.Group>
                    {assessments.map(this.createAssessmentItem)}
                </Card.Group>
            </Segment>
        );
    }

    private createAssessmentItem(result: IAssessment) {
        const assessmentUrl = `/assessments/${result.assessmentId}`;
        return (
            <ProfileCard 
                key={result.username}
                imageUrl={result.avatarUrl}
                link={assessmentUrl}
                header={result.fullname}
                meta={result.availableFromDate.toDateString()}
                description={result.description}
            />
        );
    }
}

export default ProfilePage;