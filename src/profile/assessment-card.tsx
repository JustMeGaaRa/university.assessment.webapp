import * as React from "react";
import { Link } from "react-router-dom";
import { Image, Card } from "semantic-ui-react";
import { IAssessment } from "src/models/IAssessment";

interface IAssessmentCardProps {
    link: string;
    assessment: IAssessment;
}

class AssessmentCard extends React.Component<IAssessmentCardProps> {
    public render() {
        const { avatarUrl, fullname, availableFromDate, description } = this.props.assessment;

        return (
            <Card as={Link} to={this.props.link}>
                <Image src={avatarUrl} />
                <Card.Content>
                    <Card.Header content={fullname} />
                    <Card.Meta content={availableFromDate.toDateString()}></Card.Meta>
                    <Card.Description content={description} />
                </Card.Content>
            </Card>
        );
    }
}

export default AssessmentCard;