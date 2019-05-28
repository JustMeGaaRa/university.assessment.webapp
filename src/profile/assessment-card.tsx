import * as React from "react";
import { Link } from "react-router-dom";
import { Image, Card, Dimmer, Label, LabelProps } from "semantic-ui-react";

interface IAssessmentCardProps {
    link: string;
    avatarUrl: string;
    fullname: string;
    from: Date;
    to: Date;
    description: string;
    onRemove?: (event: any, data: LabelProps) => void;
}

interface IAssessmentCardState {
    active: boolean;
}

class AssessmentCard extends React.Component<IAssessmentCardProps, IAssessmentCardState> {
    constructor(props: IAssessmentCardProps) {
        super(props);

        this.handleOnRemove = this.handleOnRemove.bind(this);

        this.state = {
            active: false
        };
    }

    public render() {
        const { avatarUrl, fullname, from, to, description } = this.props;
        const { active } = this.state;
        const content = (
            <Label color='red' corner='right' onRemove={this.handleOnRemove} />
        );
        const handleShow = () => this.setState({ active: true });
        const handleHide = () => this.setState({ active: false });
        const image = this.props.onRemove
            ? (
                <Dimmer.Dimmable
                    as={Image}
                    src={avatarUrl}
                    dimmed={active}
                    dimmer={{ active, content }}
                    onMouseEnter={handleShow}
                    onMouseLeave={handleHide}
                />
            ) : (
                <Image
                    src={avatarUrl}
                />
            );

        return (
            <Card>
                {image}
                <Card.Content as={Link} to={this.props.link}>
                    <Card.Header content={fullname} />
                    <Card.Meta content={`${from} - ${to}`}></Card.Meta>
                    <Card.Description content={description} />
                </Card.Content>
            </Card>
        );
    }

    private handleOnRemove(event: any, data: LabelProps) {
        if (this.props.onRemove) {
            this.props.onRemove(event, data);
        }
    }
}

export default AssessmentCard;