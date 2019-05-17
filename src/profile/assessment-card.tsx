import * as React from "react";
import { Link } from "react-router-dom";
import { Image, Card, Dimmer, Label } from "semantic-ui-react";
import { IAssessment } from "src/models/IAssessment";

interface IAssessmentCardProps {
    link: string;
    assessment: IAssessment;
}

interface IAssessmentCardState {
    active: boolean;
}

class AssessmentCard extends React.Component<IAssessmentCardProps, IAssessmentCardState> {
    constructor(props: IAssessmentCardProps) {
        super(props);

        this.state = {
            active: false
        };
    }

    public render() {
        const { avatarUrl, fullname, availableFromDate, description } = this.props.assessment;
        const { active } = this.state;
        const content = (
            <Label as='a' color='red' corner='right' icon='delete' />
        );
        const handleShow = () => this.setState({ active: true });
        const handleHide = () => this.setState({ active: false });

        return (
            <Card>
                <Dimmer.Dimmable
                    as={Image}
                    src={avatarUrl}
                    dimmed={active}
                    dimmer={{ active, content }}
                    onMouseEnter={handleShow}
                    onMouseLeave={handleHide}>
                </Dimmer.Dimmable>
                <Card.Content as={Link} to={this.props.link}>
                    <Card.Header content={fullname} />
                    <Card.Meta content={availableFromDate.toDateString()}></Card.Meta>
                    <Card.Description content={description} />
                </Card.Content>
            </Card>
        );
    }
}

export default AssessmentCard;