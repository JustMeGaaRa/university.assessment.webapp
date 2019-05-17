import * as React from 'react';
import { Card, Segment, Header, Divider } from 'semantic-ui-react';
import { IAssessment } from 'src/models/IAssessment';
import { loadRespondentAssessments } from 'src/store/assessment.actions';
import AssessmentCard from './assessment-card';
import SegmentPlaceholder from './segment-placeholder';

interface IProfilePageState {
    assessments: IAssessment[];
}

class ProfilePage extends React.Component<{}, IProfilePageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            assessments: []
        };
    }

    public render() {
        const header = "Profile";
        const subheader = "Below you can choose any of the available assessments to pass.";
        // TODO: replace stub username with real identity username
        const assessments = this.state.assessments;
        const placeholder = assessments.length === 0;
        const placeholderMessage = "No assigned assessments were found. Try another time.";

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                {placeholder && (
                    <SegmentPlaceholder message={placeholderMessage} />
                )}
                {!placeholder && (
                    <Card.Group content={assessments.map(this.createAssessmentSection)} />
                )}
            </Segment>
        );
    }

    public componentDidMount() {
        loadRespondentAssessments("matthew")
            .then(values => {
                this.setState({
                    assessments: values
                });
            });
    }

    private createAssessmentSection(assessment: IAssessment) {
        const assessmentUrl = `/assessments/${assessment.assessmentId}`;
        return (
            <AssessmentCard
                key={assessment.assessmentId}
                link={assessmentUrl}
                assessment={assessment}
            />
        );
    }
}

export default ProfilePage;