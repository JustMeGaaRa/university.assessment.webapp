import * as React from 'react';
import { Card, Segment, Header } from 'semantic-ui-react';
import { IAssessment } from 'src/models/IAssessment';
import { loadAssessments } from 'src/store/questionnaire.actions';
import ProfileCard from './profile-card';

class ProfilePage extends React.Component {
    public render() {
        const header = "Profile";
        const subheader = "Available assessments to pass.";
        // TODO: replace stub username with real identity username
        const assessments = loadAssessments("");

        return (
            <Segment>
                <Header as='h1' c content={header} subheader={subheader} />
                <Card.Group>
                    {assessments.map(this.createAssessmentItem)}
                </Card.Group>
            </Segment>
        );
    }

    private createAssessmentItem(result: IAssessment) {
        const assessmentUrl = `/assessments/${result.username}`;
        const profileCardProps = {
            imageUrl: result.avatarUrl,
            link: assessmentUrl,
            header: result.fullname,
            meta: result.date.toDateString(),
            description: result.description
        };
        return (
            <ProfileCard {...profileCardProps} />
        );
    }
}

export default ProfilePage;