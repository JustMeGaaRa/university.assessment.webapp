import * as React from "react";
import { Segment, List, Divider, Header, Button, Form, ButtonProps, Modal, ModalProps, InputOnChangeData } from "semantic-ui-react";
import { loadCompetencies } from "../store/competencies.actions";
import { ICompetency } from "src/models/ICompetency";

interface ICompetenciesPageState {
    competencies: ICompetency[];
    openModal: boolean;
    competencyName: string;
}

class CompetenciesPage extends React.Component<any, ICompetenciesPageState> {
    constructor(props: any) {
        super(props);

        this.createCompetencyItem = this.createCompetencyItem.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleOnAddButton = this.handleOnAddButton.bind(this);
        this.handleOnModalClose = this.handleOnModalClose.bind(this);
        this.handleOnModalCancel = this.handleOnModalCancel.bind(this);
        this.handleOnModalSave = this.handleOnModalSave.bind(this);
        this.handleOnEditCompetency = this.handleOnEditCompetency.bind(this);
        this.handleOnDeleteCompetency = this.handleOnDeleteCompetency.bind(this);

        this.state = {
            competencies: loadCompetencies(),
            openModal: false,
            competencyName: ""
        };
    }

    public render() {
        const header = "Competencies";
        const subheader = "Create and manage competencies, subcompetencies and indicators.";
        const addButtonDisabled = this.state.competencyName === "";
        const inputAction = <Button content='Add' disabled={addButtonDisabled} onClick={this.handleOnAddButton} />;
        const inputProps = {
            action: inputAction,
            icon: "edit outline",
            label: "Competency Name",
            placeholder: "Enter the competency name..."
        };

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Form>
                    <Form.Input {...inputProps} iconPosition="left" onChange={this.handleOnInputChange} />
                </Form>
                <Divider />
                <List divided verticalAlign='middle'>
                    {this.state.competencies.map(this.createCompetencyItem)}
                </List>

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

    private createCompetencyItem({ name, description }: ICompetency) {
        return (
            <List.Item>
                <List.Content floated='right'>
                    <Button icon='edit outline' content='Edit' onClick={this.handleOnEditCompetency} />
                    <Button icon='trash alternate outline' color='red' content='Delete' onClick={this.handleOnDeleteCompetency} />
                </List.Content>
                <List.Content header={name} description={description} />
            </List.Item>
        );
    }

    private handleOnInputChange(event: any, data: InputOnChangeData) {
        this.setState({
            competencyName: data.value
        });
    }

    private handleOnAddButton(event: any, data: ButtonProps) {
        const competency = {
            id: 1,
            name: this.state.competencyName,
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

    private handleOnEditCompetency(event: any, data: ButtonProps) {
        this.setState({
            openModal: true
        });
    }

    private handleOnDeleteCompetency(event: any, data: ButtonProps) {

    }
}

export default CompetenciesPage;