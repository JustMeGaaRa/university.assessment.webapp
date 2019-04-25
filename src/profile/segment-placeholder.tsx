import * as React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

interface ISegmentPlaceholderProps {
    message: string;
}

class SegmentPlaceholder extends React.PureComponent<ISegmentPlaceholderProps> {
    public render() {
        return (
            <Segment placeholder textAlign='center' secondary>
                <Header icon>
                    <Icon name='search' />
                    {this.props.message}
                </Header>
            </Segment>
        );
    }
}

export default SegmentPlaceholder;