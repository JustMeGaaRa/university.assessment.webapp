import * as React from "react";
import { Link } from "react-router-dom";
import { Image, Card } from "semantic-ui-react";

interface IProfileCardProps {
    imageUrl: string;
    link: string;
    header: string;
    meta: string;
    description: string;
}

class ProfileCard extends React.Component<IProfileCardProps> {
    constructor(props: IProfileCardProps) {
        super(props);
    }

    public render() {
        return (
            <Card as={Link} to={this.props.link}>
                <Image src={this.props.imageUrl} />
                <Card.Content>
                    <Card.Header content={this.props.header} />
                    <Card.Meta content={this.props.meta}></Card.Meta>
                    <Card.Description content={this.props.description} />
                </Card.Content>
            </Card>
        );
    }
}

export default ProfileCard;