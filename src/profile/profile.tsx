import * as React from 'react';
import { Card, Segment, Header, Divider } from 'semantic-ui-react';
import { Result, IAssessmentResult } from 'src/models';
import { loadAssessmentResults } from 'src/store/assessment-result.actions';
import AssessmentCard from './assessment-card';
import SegmentPlaceholder from './segment-placeholder';

interface IProfilePageState {
    assessments: IAssessmentResult[];
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
        loadAssessmentResults("matthew")
            .then(result => {
                Result.match(
                    result,
                    values => this.setState({ assessments: values }),
                    error => console.log(error)
                );
            });
    }

    private createAssessmentSection(assessment: IAssessmentResult) {
        const assessmentUrl = `/assessments/${assessment.id}`;
        return (
            <AssessmentCard
                key={assessment.id}
                link={assessmentUrl}
                avatarUrl={assessment.avatarUrl}
                fullname={assessment.fullname}
                from={assessment.availableFromDate}
                to={assessment.availableToDate}
                description={assessment.description}
            />
        );
    }
}

export default ProfilePage;