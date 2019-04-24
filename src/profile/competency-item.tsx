import * as React from "react";
import { Segment, Header, Label, Icon } from "semantic-ui-react";
import { ICompetency } from "src/models/ICompetency";

interface ICompetencySegmentProps {
    competency: ICompetency;
}

class CompetencySegment extends React.Component<ICompetencySegmentProps> {
    constructor(props: ICompetencySegmentProps) {
        super(props);
    }

    public render() {
        const { competency } = this.props;
        
        return (
            <Segment>
                <Header as='h2' content={competency.name} subheader={competency.description} />
                {competency.subcompetencies.map(subcompetency => (
                <React.Fragment>
                    <Header content={subcompetency.name} />
                    {subcompetency.indicators.map(indicator => (
                    <Label as='a'>
                        {indicator.description}
                        <Icon name='delete' />
                    </Label>
                    ))}
                </React.Fragment>
                ))}
            </Segment>
        );
    }
}

export default CompetencySegment;