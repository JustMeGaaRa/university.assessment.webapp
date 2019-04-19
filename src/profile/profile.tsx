import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Segment, Header } from 'semantic-ui-react';

class ProfilePage extends React.Component {
    public render() {
        const header = "Profile";
        const subheader = "Available assessments to pass.";
        const assessments = [
            {
                source: '/images/avatar/matthew.png',
                name: 'Matthew',
                date: '19.04.2019',
                description: 'This assessment should be passed due deadline.'
            },
            {
                source: '/images/avatar/rachel.png',
                name: 'Rachel',
                date: '19.04.2019',
                description: 'This assessment should be passed due deadline.'
            },
            {
                source: '/images/avatar/molly.png',
                name: 'Molly',
                date: '19.04.2019',
                description: 'This assessment should be passed due deadline.'
            },
            {
                source: '/images/avatar/steve.jpg',
                name: 'Steve',
                date: '19.04.2019',
                description: 'This assessment should be passed due deadline.'
            }
        ];

        return (
            <Segment>
                <Header as='h1' c content={header} subheader={subheader} />
                <Card.Group>
                    {assessments.map(this.createAssessmentItem)}
                </Card.Group>
            </Segment>
        );
    }

    private createAssessmentItem({ source, name, date, description}: any) {
        return (
            <Card>
                <Image src={source} />
                <Card.Content as={Link} to={`/assessments/${name}`}>
                    <Card.Header content={name} />
                    <Card.Meta content={date}></Card.Meta>
                    <Card.Description content={description} />
                </Card.Content>
            </Card>
        );
    }
}

export default ProfilePage;