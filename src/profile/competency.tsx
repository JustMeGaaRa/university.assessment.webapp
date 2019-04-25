import * as React from "react";
import { Segment, Divider, Header, Button, Form, ButtonProps, Modal, ModalProps, InputOnChangeData, Card, CardProps } from "semantic-ui-react";
import { loadCompetencies } from "src/store/competencies.actions";
import { ICompetency } from "src/models/ICompetency";
import CompetencySegment from "./competency-item";

interface ICompetenciesPageState {
    competencies: ICompetency[];
    openModal: boolean;
    competencyName: string;
    selectedCompetency: ICompetency[];
}

class CompetencyPage extends React.Component<any, ICompetenciesPageState> {
    constructor(props: any) {
        super(props);

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleOnAddButton = this.handleOnAddButton.bind(this);
        this.handleOnModalClose = this.handleOnModalClose.bind(this);
        this.handleOnModalCancel = this.handleOnModalCancel.bind(this);
        this.handleOnModalSave = this.handleOnModalSave.bind(this);

        this.state = {
            competencies: loadCompetencies(),
            openModal: false,
            competencyName: "",
            selectedCompetency: loadCompetencies().filter(x => x.id === 1)
        };
    }

    public render() {
        const header = "Competencies";
        const subheader = "Create and manage competencies, subcompetencies and indicators.";
        const { competencies, selectedCompetency } = this.state;
        const addButtonDisabled = this.state.competencyName === "";
        const inputAction = <Button content='Add' disabled={addButtonDisabled} onClick={this.handleOnAddButton} />;
        const inputProps = {
            action: inputAction,
            icon: "edit outline",
            label: "Competency Name",
            placeholder: "Enter competency name..."
        };

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Form>
                    <Form.Input {...inputProps} iconPosition="left" onChange={this.handleOnInputChange} />
                </Form>
                <Divider hidden />
                <Card.Group>
                    {competencies.map(competency => (
                    <Card 
                        header={competency.name} 
                        meta={competency.date.toDateString()} 
                        description={competency.description}
                        onClick={this.handleOnSelectCompetency.bind(this, competency)}
                    />))}
                </Card.Group>
                <Divider hidden />

                {selectedCompetency.map(competency => <CompetencySegment competency={competency} />)}

                <Modal dimmer open={this.state.openModal} onClose={this.handleOnModalClose}>
                    <Modal.Header>Edit Competency</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p>We've found the following gravatar image associated with your e-mail address.</p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive content="Save" onClick={this.handleOnModalSave} />
                        <Button content="Cancel" onClick={this.handleOnModalCancel} />
                    </Modal.Actions>
                </Modal>
            </Segment>
        );
    }

    private handleOnInputChange(event: any, data: InputOnChangeData) {
        this.setState({
            competencyName: data.value
        });
    }

    private handleOnSelectCompetency(competency: ICompetency ,event: any, data: CardProps) {
        this.setState({
            selectedCompetency: [competency]
        });
    }

    private handleOnAddButton(event: any, data: ButtonProps) {
        const competency = {
            id: 1,
            name: this.state.competencyName,
            date: new Date(Date.now()),
            description: "",
            subcompetencies: []
        };
        const competencies = this.state.competencies.concat(competency);
        this.setState({
            competencies: competencies
        });
    }

    private handleOnModalClose(event: any, data: ModalProps) {
        this.setState({
            openModal: false
        });
    }

    private handleOnModalCancel(event: any, data: ButtonProps) {
        this.setState({
            openModal: false
        });
    }

    private handleOnModalSave(event: any, data: ButtonProps) {
        this.setState({
            openModal: false
        });
    }
}

export default CompetencyPage;